import { useEffect, useState } from "react";
import { Link, useOutletContext } from "react-router-dom";
import { useFormik } from "formik";
import * as yup from "yup";
import Workout from "./Workout";


function Workouts() {
  const [workouts, setWorkouts] = useState([]);
  // const [newWorkOut, setNewWorkOut] = useState(
  //   {
  //       name: "",
  //       difficulty: "",
  //       description: ""
  //   }
  // )

  useEffect(() => {
    fetch("/workouts")
      .then((r) => {
        if(!r.ok){
          return r.json().then((err) => {
            throw new Error(err.error); // err = { error: "Please Log in first!" }
          });
        }
        return r.json()
      })
      .then(setWorkouts);
  }, []);


  // const onHandleSubmitNewWorkout = (e) => {
  //   e.preventDefault(); 
  //   fetch("/workouts", {
  //       method: "POST",
  //       headers: {
  //           "Content-Type": "application/json"
  //       },
  //       body: JSON.stringify(newWorkOut)
  //   })
  //   .then(resp => resp.json())
  //   .then(newWorkOut =>{
  //       setWorkouts([
  //         ...workouts,
  //         newWorkOut
  //       ])
  //       console.log(workouts)
  //       setNewWorkOut(
  //         {
  //           name: "",
  //           difficulty: "",
  //           description: ""
  //         }
  //       )
  //   })
  // };

  //--------------------------------------------------------------------------------
    const formSchema = yup.object().shape({
      name: yup.string().required("Must enter a name."),
      difficulty: yup.string().required("Must enter a difficulty level (easy, medium or hard)."),
      description: yup.string().required("Must enter a description for this workout."),
    });

    const formik = useFormik({
      initialValues: {
        name: "",
        difficulty: "",
        description: "",
      },
      validationSchema: formSchema,
      onSubmit: (newWorkOut) => {
        fetch("/workouts", {
          method: "POST",
          headers: {
              "Content-Type": "application/json"
          },
          body: JSON.stringify(newWorkOut)
        })
        .then(resp => resp.json())
        .then(newWorkOut =>{
          setWorkouts([
            ...workouts,
            newWorkOut
          ])
          console.log(workouts)
          formik.resetForm();
        })
      },
    });

  return (

    <div className="Workouts Page">
      <p>Don't have a workout? </p>
      <form onSubmit={formik.handleSubmit}>
        <label htmlFor="name">Name</label>
        <br />
        <input
          id="name"
          name="name"
          onChange={formik.handleChange}
          value={formik.values.name}
        />
        <p style={{ color: "red" }}> {formik.errors.name}</p>

        <label htmlFor="difficulty">Difficulty Level</label>
        <br />
        <input
          id="difficulty"
          name="difficulty"
          onChange={formik.handleChange}
          value={formik.values.difficulty}
        />
        <p style={{ color: "red" }}> {formik.errors.difficulty}</p>

        <label htmlFor="description">Description</label>
        <br />
        <input
          id="description"
          name="description"
          type="description"
          onChange={formik.handleChange}
          value={formik.values.description}
        />
        <p style={{ color: "red" }}> {formik.errors.description}</p>

        <button type="submit">Create Workout</button>
      </form>

      {workouts &&
        workouts.map((workout) => (
          <Workout key={workout.id} workout_id={workout.id} name={workout.name} difficulty={workout.difficulty}
          description={workout.description} />
        ))
      }
      
    </div>
  );
}

export default Workouts;




// DO NOT WORRY ABOUT THE CODE BELOW, FOR MY OWN LEARNING AND RECORD PURPOSES!!!!!!

// function Workouts() {
//   const [workouts, setWorkouts] = useState([]);
//   const [newWorkOut, setNewWorkOut] = useState(
//     {
//         name: "",
//         difficulty: "",
//         description: ""
//     }
//   )

//   useEffect(() => {
//     fetch("/workouts")
//       .then((r) => {
//         if(!r.ok){
//           return r.json().then((err) => {
//             throw new Error(err.error); // err = { error: "Please Log in first!" }
//           });
//         }
//         return r.json()
//       })
//       .then(setWorkouts);
//   }, []);


//   const onHandleSubmitNewWorkout = (e) => {
//     e.preventDefault(); 
//     fetch("/workouts", {
//         method: "POST",
//         headers: {
//             "Content-Type": "application/json"
//         },
//         body: JSON.stringify(newWorkOut)
//     })
//     .then(resp => resp.json())
//     .then(newWorkOut =>{
//         setWorkouts([
//           ...workouts,
//           newWorkOut
//         ])
//         console.log(workouts)
//         setNewWorkOut(
//           {
//             name: "",
//             difficulty: "",
//             description: ""
//           }
//         )
//     })
//   };

//   return (
//     <div className="Workouts Page">
//       <p>Don't have a workout? </p>
//       <form className="New Workout" onSubmit={onHandleSubmitNewWorkout}>
//         <input
//           type="text" name="name" placeholder="Name for this workout"
//           value={newWorkOut.name}
//           onChange={(e) => setNewWorkOut({...newWorkOut, name: e.target.value})}
//         />

//         <input
//           type="text" name="difficulty" placeholder="Please enter the difficulty level (easy, medium or hard)"
//           value={newWorkOut.difficulty}
//           onChange={(e) => setNewWorkOut({...newWorkOut, difficulty: e.target.value})}
//         />

//         <input
//           type="text" name="description" placeholder="Please describe your workout here"
//           value={newWorkOut.description}
//           onChange={(e) => setNewWorkOut({...newWorkOut, description: e.target.value})}
//         />

//         <button type="submit">Create workout</button>
//       </form>


//       {workouts &&
//         workouts.map((workout) => (
//           <Workout key={workout.id} workout_id={workout.id} name={workout.name} difficulty={workout.difficulty}
//           description={workout.description} />
//         ))
//       }
      
//       {/* <>
//         <h2>No Workouts Found</h2>
//         <button as={Link} to="/newlog" className="log">
//           Make new workout log
//         </button>
//       </> */}
//     </div>
//   );
// }

// export default Workouts;
