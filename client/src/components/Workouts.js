import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Workout from "./Workout";


function Workouts() {
  const [workouts, setWorkouts] = useState([]);

  useEffect(() => {
    fetch("/workouts")
      .then((r) => r.json())
      .then(setWorkouts);
  }, []);

  return (
    <div>
      {workouts.length > 0 ? (
        workouts.map((workout) => (
          <Workout key={workout.id} name={workout.name} difficulty={workout.difficulty}
          description={workout.description} />
        ))
      ) : (
        <>
          <h2>No Workouts Found</h2>
          <button as={Link} to="/newlog" className="log">
            Make new workout log
          </button>
        </>
      )}
    </div>
  );
}

export default Workouts;
