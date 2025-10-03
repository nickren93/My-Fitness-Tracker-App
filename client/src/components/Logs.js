import { useEffect, useState } from "react";
import { useParams, useOutletContext, useNavigate } from "react-router-dom";
import Log from "./Log";


function Logs() {

  const navigate = useNavigate()

  // const { user_id, workout_id } = useParams();
  const {  workout_id } = useParams(); //
  const { user, myWorkouts, setMyWorkouts,  } = useOutletContext();
  const [logs, setLogs] = useState([])
  // const { refreshWorkouts  } = useOutletContext();

  // useEffect(() => { //use the data
  //   fetch(`/logs/${user_id}/${workout_id}`)
  //     .then((r) => r.json())
  //     .then((data)=> setLogs(data));
  // }, []);

  const currentWorkout = myWorkouts.find(workout => workout.id == parseInt(workout_id))
  // const currentWorkoutLogs = currentWorkout.logs
  
  useEffect(() => {
    if (currentWorkout) {
      setLogs(currentWorkout.logs);
    }
  }, []);


  function handleDeleteLog(id) {
    const updatedLogs = logs.filter((log) => log.id !== id);
    setLogs(updatedLogs);
    if (updatedLogs.length === 0) {
          setMyWorkouts(prev => prev.filter(w => w.id !== parseInt(workout_id)));
          navigate("/");
    }
  }

  if (!currentWorkout) {
    return <h3>Loading workout logs...</h3>;
  }

  return (
    <div className="logs">
      {logs.map((log) => (
        <Log key={log.id} log={log} onDeleteLog={handleDeleteLog} />
      ))}
    </div>
  );
 
}

export default Logs;
