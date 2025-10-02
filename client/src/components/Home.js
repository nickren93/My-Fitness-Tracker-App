import { useState } from "react";
import { useOutletContext, Link } from "react-router-dom";
import '../styles/Home.css';
import MyWorkout from "./MyWorkout";

function Home(){
    const { user, myWorkouts } = useOutletContext();
    // const [workouts, setWorkouts] = useState(myWorkouts); 

    if (!user) {
        return <h2>Please Login for more!</h2>;  // or redirect, or show nothing
    }

    // const userWorkouts = user.logs.map((element) => element.workout)
    // const userWorkouts = user.workouts

    const workoutsWithLogs = myWorkouts.filter((workout) => workout.logs && workout.logs.length > 0);


    if (myWorkouts.length == 0){
        return(
            <div>
                <h2>You don't have any upcoming workout.</h2>
                <Link to={`/newlog`} className="view-profile">Create workout plan</Link>
            </div>
        )
    }

    return(
        <div className="workout-list">
            <h2>Your upcoming workout:</h2>
                { myWorkouts.map((workout) => (<MyWorkout key={workout.id} user_id={user.id} name={workout.name} 
                workout_id={workout.id}  difficulty={workout.difficulty} description={workout.description} />
            ))}
        </div>
    )           
}

export default Home;