import '../styles/Workout.css';

function Workout({ name, difficulty, description }) {
    
    return (
        <div className="workout-card"> 
            <h2>{name}</h2>
            <h3> Difficulty: {difficulty} </h3>
            <h3> Description: {description} </h3>
        </div>
    )
}

export default Workout;