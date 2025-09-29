import Workout from './Workout';
import { useOutletContext } from "react-router-dom";
import '../styles/Home.css';

function Home(){
    const { user } = useOutletContext();

    if (!user) {
        return <h2>Please Login for more!</h2>;  // or redirect, or show nothing
    }

    const userWorkouts = user.logs.map((element) => element.workout)

    return(
        <div className="page-content">
            
            <h2>Hi, {user.username} </h2>
            {/* <Outlet context={contextData} /> */}

            <div className="workout-list">
                <h2>Your upcoming workout:</h2>
                {userWorkouts.map((workout) => (<Workout key={workout.id} name={workout.name} 
                    difficulty={workout.difficulty} description={workout.description} />
                ))}
            </div>
        </div>
    )  
}

export default Home;