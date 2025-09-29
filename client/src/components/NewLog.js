import { useState, useEffect } from "react";
import { useOutletContext, useNavigate } from "react-router-dom"

function NewLog() {

  const [workouts, setWorkouts] = useState([]);
  const [selected, setSelected] = useState("");
  const { user, log, setLog, handleSubmit } = useOutletContext()

  const navigate = useNavigate()

  useEffect(() => {
    fetch("/workouts")
      .then((r) => r.json())
      .then(setWorkouts);
  }, []);

  const handleChange = (e) => {
    setSelected(e.target.value);
    setLog({...log, user_id: user.id, workout_id: e.target.value});
  };
  
  const onHandleSubmit = (e) => {
    e.preventDefault(); // prevent page reload
    handleSubmit(log)
    navigate("/")
  };

  return ( 
    <form onSubmit={onHandleSubmit}>
      <h2>Select your option:</h2>
      <select value={selected} onChange={handleChange}>
        <option value="">-- Choose a workout --</option>
        {workouts.length > 0 ? (
          workouts.map((workout) => (<option key={workout.id} value={workout.id}> {workout.name} </option>))
        ) : (
          <option value="">""</option>
        )}
      </select>

      <input
        type="text" name="note" placeholder="Notes for this workout"
        value={log.note}
        onChange={(e) => setLog({...log, note: e.target.value})}
      />

      <input
        type="text" name="date" placeholder="xx/xx/xxxx"
        value={log.date}
        onChange={(e) => setLog({...log, date: e.target.value})}
      />

      <button type="submit">Submit</button>
    </form>
  );
}


export default NewLog;
