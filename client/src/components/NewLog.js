import { useState, useEffect } from "react";
import { useOutletContext, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as yup from "yup";


function NewLog() {

  const [workouts, setWorkouts] = useState([]);
  const { handleNewLog } = useOutletContext()

  useEffect(() => {
    fetch("/workouts")
      .then((r) => r.json())
      .then(setWorkouts);
  }, []);

  const formSchema = yup.object().shape({
    note: yup.string().required("Must enter a note about this workout"),
    date: yup.date().required("Must enter a date"),
    workout_id: yup.string().required("Please select a workout"),
  });

  const formik = useFormik({
    initialValues: {
      note: "",
      date: "",
      workout_id: "",
    },
    validationSchema: formSchema,
    onSubmit: (values) => {

      fetch(`/logs`, {
          method: "POST",
          headers: {
              "Content-Type": "application/json"
          },
          body: JSON.stringify(values)
      })
      .then(resp => resp.json())
      .then((data) =>{
        const selectedWorkout = workouts.find(workout => workout.id == parseInt(data.workout_id))
        const workoutToSubmit = { ...selectedWorkout, logs: [] };
        handleNewLog(data, workoutToSubmit)
        formik.resetForm();
      })
    },
  });

  return ( 
    <form onSubmit={formik.handleSubmit}>

      <label htmlFor="workout_id">Workout Options</label>
        <br />
        <select
          id="workout_id"
          name="workout_id"
          onChange={formik.handleChange}
          value={formik.values.workout_id}
        >
          <option value="">-- Choose a workout --</option>
          {workouts.map((workout) => (<option key={workout.id} value={workout.id}> {workout.name} </option>))}
        </select>
        <p style={{ color: "red" }}>{formik.errors.workout_id}</p>

      <label htmlFor="note">Note</label>
      <br />
      <input
        id="note"
        name="note"
        onChange={formik.handleChange}
        value={formik.values.note}
      />
      <p style={{ color: "red" }}> {formik.errors.note}</p>

      <label htmlFor="date">Date</label>
      <br />
      <input
        id="date"
        name="date"
        type="date"
        pattern="\d{4}-\d{2}-\d{2}"
        onChange={formik.handleChange}
        value={formik.values.date}
      />
      <p style={{ color: "red" }}> {formik.errors.date}</p>

      <button type="submit">Submit</button>
    </form>
  );
}

export default NewLog;




// DO NOT WORRY ABOUT THE CODE BELOW, FOR MY OWN LEARNING AND RECORD PURPOSES!!!!!!

// function NewLog() {

//   const [workouts, setWorkouts] = useState([]);
//   const [selected, setSelected] = useState("");
//   const { handleSubmit } = useOutletContext()
//   // const [newLog, setNewLog] = useState(log);
//   const [newLog, setNewLog] = useState({
//       note: "",
//       date: "",
//       // user_id: "",  // no need
//       workout_id: ""  
//     });


//   useEffect(() => {
//     fetch("/workouts")
//       .then((r) => r.json())
//       .then(setWorkouts);
//   }, []);

//   const handleChange = (e) => {
//     setSelected(e.target.value);
//     setNewLog({...newLog, workout_id: e.target.value});
//   };
  
//   const onHandleSubmit = (e) => {
//     e.preventDefault(); 
//     const selectedWorkout = workouts.find(workout => workout.id == parseInt(selected))
//     const workoutToSubmit = { ...selectedWorkout, logs: [] };
//     handleSubmit(newLog, workoutToSubmit)
//     setSelected("")
//     setNewLog({
//       note: "",
//       date: "",
//       workout_id: ""     // reset workout selection
//     });
//   };

//   return ( 
//     <form onSubmit={onHandleSubmit}>
//       <h2>Select your option:</h2>
//       <select value={selected} onChange={handleChange}>
//         <option value="">-- Choose a workout --</option>
//         {workouts.map((workout) => (<option key={workout.id} value={workout.id}> {workout.name} </option>))}
//       </select>

//       <input
//         type="text" name="note" placeholder="Notes for this workout"
//         value={newLog.note}
//         onChange={(e) => setNewLog({...newLog, note: e.target.value})}
//       />

//       <input
//         type="text" name="date" placeholder="xx/xx/xxxx"
//         value={newLog.date}
//         onChange={(e) => setNewLog({...newLog, date: e.target.value})}
//       />

//       <button type="submit">Submit</button>
//     </form>
//   );
// }
