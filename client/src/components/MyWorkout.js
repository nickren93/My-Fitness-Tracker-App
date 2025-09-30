import '../styles/Workout.css';
import { Link } from "react-router-dom";

function MyWorkout({ user_id, workout_id, name, difficulty, description }) {
    
    return (
        <div className="workout-card"> 
            <h2>{name}</h2>
            <h3> Difficulty: {difficulty} </h3>
            <h3> Description: {description} </h3>
            <Link to={`/logs/${user_id}/${workout_id}`} className="view-profile">See Log for this workout</Link>
        </div>
    )
}

export default MyWorkout;