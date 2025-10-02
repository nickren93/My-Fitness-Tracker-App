import { useState, useEffect } from "react";
import { useOutletContext, useNavigate } from "react-router-dom"

function NewLog() {

  const [workouts, setWorkouts] = useState([]);
  const [selected, setSelected] = useState("");
  const { user, handleSubmit } = useOutletContext()
  // const [newLog, setNewLog] = useState(log);
  const [newLog, setNewLog] = useState({
      note: "",
      date: "",
      user_id: "",  
      workout_id: ""   
    });


  useEffect(() => {
    fetch("/workouts")
      .then((r) => r.json())
      .then(setWorkouts);
  }, []);

  const handleChange = (e) => {
    setSelected(e.target.value);
    setNewLog({...newLog, user_id: user.id, workout_id: e.target.value});
  };
  
  const onHandleSubmit = (e) => {
    e.preventDefault(); 
    handleSubmit(newLog)
    setSelected("")
    setNewLog({
      note: "",
      date: "",
      user_id: user.id,  // keep current user
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
