import { NavLink } from "react-router-dom"
import "./Navbar.css"
import { useSelector } from "react-redux"
import { useDispatch } from "react-redux";
import { authActions } from "../ReduxStore/AuthSlice";


const Navbar = () => {

const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
const dispatch = useDispatch();

const logoutHandler = () => {
  dispatch(authActions.removeCredentials());
}

    return (
        <header className="header">
            <nav>
                <ul className="list">
                    <li>
                        <NavLink
                          to="/welcome"
                          className={({ isActive }) => isActive ? "active" : ""}
                          >WELCOME</NavLink>
                    </li>
                     <li>
                        <NavLink 
                           to="/bookings"
                           className={({ isActive }) => isActive ? "active" : ""} 
                           >BOOKINGS</NavLink>
                    </li>
                    <li>
                        <NavLink 
                        to="/hotels-listing"
                        className={({ isActive }) => isActive ? "active" : ""}
                        >Hotels</NavLink>
                    </li>
                </ul>
            </nav>
            <button className="logout-btn" onClick={logoutHandler}>
                Logout
            </button>
        </header>
    )
}

export default Navbar;