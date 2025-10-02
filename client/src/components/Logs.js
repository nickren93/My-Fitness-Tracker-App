import { useEffect, useState } from "react";
import { useParams, useOutletContext, useNavigate } from "react-router-dom";
import Log from "./Log";


function Logs() {

  const [logs, setLogs] = useState([])
  // const { refreshWorkouts  } = useOutletContext();

  const navigate = useNavigate()

  const { user_id, workout_id } = useParams();
  const { setMyWorkouts } = useOutletContext();

  useEffect(() => {
    fetch(`/logs/${user_id}/${workout_id}`)
      .then((r) => r.json())
      .then((data)=> setLogs(data));
  }, []);

  // function handleDeleteLog(id) {
  //   setLogs((prevLogs) => prevLogs.filter((log) => log.id !== id));
  //   refreshWorkouts();
  //   if(logs.length == 0){
  //     navigate("/")
  //   }
  // }

  // function handleDeleteLog(id) {
  //   setLogs((prevLogs) => {
  //     const updatedLogs = prevLogs.filter((log) => log.id !== id);
  //     if (updatedLogs.length === 0) {
  //       refreshWorkouts(); 
  //       navigate("/"); 
  //     }
  //     return updatedLogs;
  //   });
  // }

  function handleDeleteLog(id) {
    const updatedLogs = logs.filter((log) => log.id !== id);
    setLogs(updatedLogs);
    if (updatedLogs.length === 0) {
          setMyWorkouts(prev => prev.filter(w => w.id !== parseInt(workout_id)));
          navigate("/");
    }
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
