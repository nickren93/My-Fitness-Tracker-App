import { NavLink } from "react-router-dom";
import '../styles/NavBar.css';

function NavBar( { logout } ) {
    return(
        <nav>
            <NavLink to="/" className="nav-link">
                Home
            </NavLink>

            <NavLink to="/workouts" className="nav-link">
                All Workouts
            </NavLink>

            <NavLink to="/newlog" className="nav-link">
                New Log
            </NavLink>

            <button onClick={logout}>Logout</button>
        </nav> 
    )
}

export default NavBar;