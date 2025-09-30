import { useState } from "react";
import LoginForm from "./LoginForm";
import SignUpForm from "./SignUpForm";
import '../styles/Login.css';

function Login( { login, setWorkouts } ) {
  const [showLogin, setShowLogin] = useState(true);
  // const { login } = useOutletContext();

  return (
    <div>
      {showLogin ? (
        <>
          <LoginForm onLogin={login} setWorkouts={setWorkouts}/>
          <p>
            Don't have an account? &nbsp;
            <button color="secondary" onClick={() => setShowLogin(false)}>
              Sign Up
            </button>
          </p>
        </>
      ) : (
        <>
          <SignUpForm onLogin={login} />

          <p>
            Already have an account? &nbsp;
            <button color="secondary" onClick={() => setShowLogin(true)}>
              Log In
            </button>
          </p>
        </>
      )}
    </div>
  );
}

export default Login;
