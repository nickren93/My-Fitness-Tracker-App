import { useState, useEffect } from "react";
import { useOutletContext, useNavigate } from "react-router-dom"

function NewLog() {

  const [workouts, setWorkouts] = useState([]);
  const [selected, setSelected] = useState("");
  const { handleSubmit } = useOutletContext()
  // const [newLog, setNewLog] = useState(log);
  const [newLog, setNewLog] = useState({
      note: "",
      date: "",
      // user_id: "",  // no need
      workout_id: ""  
    });


  useEffect(() => {
    fetch("/workouts")
      .then((r) => r.json())
      .then(setWorkouts);
  }, []);

  const handleChange = (e) => {
    setSelected(e.target.value);
    setNewLog({...newLog, workout_id: e.target.value});
  };
  
  const onHandleSubmit = (e) => {
    e.preventDefault(); 
    const selectedWorkout = workouts.find(workout => workout.id == parseInt(selected))
    const workoutToSubmit = { ...selectedWorkout, logs: [] };
    handleSubmit(newLog, workoutToSubmit)
    setSelected("")
    setNewLog({
      note: "",
      date: "",
      workout_id: ""     // reset workout selection
    });
  };

  return ( 
    <form onSubmit={onHandleSubmit}>
      <h2>Select your option:</h2>
      <select value={selected} onChange={handleChange}>
        <option value="">-- Choose a workout --</option>
        {workouts.map((workout) => (<option key={workout.id} value={workout.id}> {workout.name} </option>))}
      </select>

      <input
        type="text" name="note" placeholder="Notes for this workout"
        value={newLog.note}
        onChange={(e) => setNewLog({...newLog, note: e.target.value})}
      />

      <input
        type="text" name="date" placeholder="xx/xx/xxxx"
        value={newLog.date}
        onChange={(e) => setNewLog({...newLog, date: e.target.value})}
      />

      <button type="submit">Submit</button>
    </form>
  );
}


export default NewLog;
