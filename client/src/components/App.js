import React, { useEffect, useState } from "react";
import Footer from "./Footer";
import { Outlet } from 'react-router-dom';
import logo from './Logo_image.png';
import Login from './Login';
import { useNavigate } from "react-router-dom";
import NavBar from './NavBar';
import '../styles/App.css';

function App() {

  const [user, setUser] = useState(null);
  const [myWorkouts, setMyWorkouts] = useState([]);
  // const [logs, setLogs] = useState([])
  const [newLog, setNewLog] = useState({
      note: "",
      date: "",
      user_id: undefined,
      workout_id: undefined  
  })

  const navigate = useNavigate()

  useEffect(() => {
    // auto-login
    fetch("/check_session").then((r) => {
      if (r.ok) {
          r.json().then((user) => {
            setUser(user)
            setMyWorkouts(user.workouts)
            // setLogs(user.workouts.logs)
          });
      }
    });
  }, []);


  function handleSubmit(newLog, selectedWorkout){
    fetch(`/logs`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(newLog)
    })
    .then(resp => resp.json())
    .then(newLog =>{
        setNewLog(newLog)
        // setMyWorkouts(user.workouts)
        // setMyWorkouts()  //!!!!!!!!!!!!!!!!!!!!!!!!!!!!!

        //----------------------------------------------------------------------
        const workoutToUpdate = myWorkouts.find(workout => workout.id == parseInt(selectedWorkout.id))
        if (workoutToUpdate){
          // workoutToUpdate.logs.append(newLog)
          const updatedWorkout = {
            ...workoutToUpdate,
            logs: [...workoutToUpdate.logs, newLog]
          };
          const newMyWorkouts = myWorkouts.map((workout) => (workout.id=== workoutToUpdate.id ? updatedWorkout : workout));
          setMyWorkouts(newMyWorkouts)
        }else{
          // selectedWorkout.logs.append(newLog)
          const newWorkout = {
            ...selectedWorkout,
            logs: [newLog]
          };
          // const newMyWorkouts = myWorkouts.append(selectedWorkout)
          // setMyWorkouts(newMyWorkouts)
          setMyWorkouts([...myWorkouts, newWorkout]);
        }
        //----------------------------------------------------------------------
    })
  }

  function logout(){
      fetch(`/logout`, {
          method: "DELETE",
          headers: {
              "Content-Type": "application/json"
          },
      })
      .then((resp) => {
        if (resp.ok) {
            setUser(null);
            setMyWorkouts([])
            // navigate("/login");
            navigate("/");
        } else {
            console.error("Logout failed");
        }
      });
  }


  const contextData = { user, setUser, myWorkouts, setMyWorkouts, handleSubmit, logout }

  return (
    <main className="App">
      <img id = "logo" src={logo} alt="Logo"/>
      <h1 id="mainTitle">My Fitness Tracker</h1>
      <h2>Track your workouts. Stay motivated. Reach your goals!</h2>
      <p>
          Welcome to My Fitness Tracker!
          This app allows you to track and plan their workouts to your daily routine!
      </p>
      {/* {user ? <NavBar logout={logout} /> : <Navigate to="/login" />} */}
      {user ?  
      <div className="page-content">
        <NavBar logout={logout} />
        <Outlet context={contextData} />
      </div>
      : <Login login={setUser} setWorkouts={setMyWorkouts}/>}
      <Footer />
    </main>
  )
}

export default App;
