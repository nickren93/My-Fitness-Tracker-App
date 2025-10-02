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

  const [refreshFlag, setRefreshFlag] = useState(false);

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



  function handleSubmit(newLog){
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
        setMyWorkouts(newLog.user.workouts)
    })
  }

  // function refreshWorkouts() {
  //   fetch("/check_session")
  //     .then(r => r.json())
  //     .then(user => {
  //       setUser(user);
  //       setMyWorkouts(user.workouts);
  //       // if()
  //       // navigate('/')
  //     });
  // }

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
      {user ? <NavBar logout={logout} /> : <Login login={setUser} setWorkouts={setMyWorkouts}/>}
      <div className="page-content">
        <Outlet context={contextData} />
        <Footer />
      </div>
    </main>
  )
}

export default App;
