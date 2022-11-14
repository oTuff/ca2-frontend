import { Link, NavLink } from "react-router-dom";
import Login from "./Login.jsx";
import LoggedIn from "./LoggedIn.jsx";
import facade from "../utils/apiFacade.js";
import "../styles/header.css";

export default function Header({setErrorMsg, loggedIn, setLoggedIn}) {
    const getClass = ({ isActive }) => (isActive ? "nav-active" : null);

    return (
        <header className="topnav">
            <nav>
                <NavLink to="/" className={getClass}>
                   Home
                </NavLink>
                <NavLink to="/about" className={getClass}>
                    About
                </NavLink>
                <NavLink to="/jokes" className={getClass}>
                    Jokes
                </NavLink>
                {!loggedIn ? (<Login setLoggedIn={setLoggedIn} setErrorMsg={setErrorMsg}/>) :
                    (<div>
                        <LoggedIn setLoggedIn={setLoggedIn} />
                    </div>)}
            </nav>
        </header>
    );
}