import { useEffect, useState } from "react";
import { Link, useOutletContext } from "react-router-dom";
import Workout from "./Workout";


function Workouts() {
  const [workouts, setWorkouts] = useState([]);
  const [newWorkOut, setNewWorkOut] = useState(
    {
        name: "",
        difficulty: "",
        description: ""
    }
  )

  const { user } = useOutletContext();

  useEffect(() => {
    fetch("/workouts")
      .then((r) => r.json())
      .then(setWorkouts);
  }, []);


  const onHandleSubmitNewWorkout = (e) => {
    e.preventDefault(); 
    fetch("/workouts", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(newWorkOut)
    })
    .then(resp => resp.json())
    .then(newWorkOut =>{
        // setUser({
        //   ...user,
        //   logs: [...user.logs, newlog]
        // });
        setWorkouts([
          ...workouts,
          newWorkOut
        ])
        console.log(workouts)
        setNewWorkOut(
          {
            name: "",
            difficulty: "",
            description: ""
          }
        )
        // navigate("/workouts")
    })
  };

  return (
    <div className="Workouts Page">
      <p>Don't have a workout? </p>
      <form className="New Workout" onSubmit={onHandleSubmitNewWorkout}>
        <input
          type="text" name="name" placeholder="Name for this workout"
          value={newWorkOut.name}
          onChange={(e) => setNewWorkOut({...newWorkOut, name: e.target.value})}
        />

        <input
          type="text" name="difficulty" placeholder="Please enter the difficulty level (easy, medium or hard)"
          value={newWorkOut.difficulty}
          onChange={(e) => setNewWorkOut({...newWorkOut, difficulty: e.target.value})}
        />

        <input
          type="text" name="description" placeholder="Please describe your workout here"
          value={newWorkOut.description}
          onChange={(e) => setNewWorkOut({...newWorkOut, description: e.target.value})}
        />

        <button type="submit">Create workout</button>
      </form>


      {workouts &&
        workouts.map((workout) => (
          <Workout key={workout.id} user_id={user.id} workout_id={workout.id} name={workout.name} difficulty={workout.difficulty}
          description={workout.description} />
        ))
      }
      
      {/* <>
        <h2>No Workouts Found</h2>
        <button as={Link} to="/newlog" className="log">
          Make new workout log
        </button>
      </> */}
    </div>
  );
}

export default Workouts;
