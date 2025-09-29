import React, { useEffect, useState } from "react";
import { Switch, Route } from "react-router-dom";
import Footer from "./Footer";
import Home from "./Home"
import { Outlet } from 'react-router-dom';
import logo from './Logo_image.png';
import Login from './Login';
import { useOutletContext, Navigate, useNavigate } from "react-router-dom";
import NavBar from './NavBar';
import '../styles/App.css';

function App() {

  const [user, setUser] = useState(null);
  const [workouts, setWorkouts] = useState([]);
  const [log, setLog] = useState(
      {
          note: "",
          date: "",
          user_id: undefined,
          workout_id: undefined
      }
  )
  

  const navigate = useNavigate()

  useEffect(() => {
    // auto-login
    fetch("/check_session").then((r) => {
      if (r.ok) {
          r.json().then((user) => setUser(user));
      }
    });
  }, []);



  function handleSubmit(log){
    fetch(`/newlog`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(log)
    })
    .then(resp => resp.json())
    .then(newlog =>{
        setUser({
          ...user,
          logs: [...user.logs, newlog]
        });
        console.log(newlog.user)
    })
  }

  function logout(){
      fetch(`/logout`, {
          method: "DELETE",
          headers: {
              "Content-Type": "application/json"
          },
      })
      // .then(resp => resp.json())
      // .then(data =>{
      //     setUser(null)
      //     console.log(data)
      //     navigate("/login");
      // })
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

  const contextData = { user, setUser, workouts, setWorkouts, log, setLog, handleSubmit, logout }

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
      {user ? <NavBar logout={logout} /> : <Login login={setUser} />}
      <Outlet context={contextData} />
      <Footer />
    </main>
  )
}

export default App;
