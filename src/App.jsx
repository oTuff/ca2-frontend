import React, {useState,useEffect} from 'react';
import {Route, Routes} from "react-router-dom";
import Home from "./components/Home.jsx";
import Header from "./components/Header.jsx";
import facade from "./utils/apiFacade.js";
import 'bootstrap/dist/css/bootstrap.min.css';
import About from "./components/About.jsx";
import Jokes from "./components/Jokes.jsx";

function App(props) {

    const [loggedIn, setLoggedIn] = useState(false)
    const [errorMessage, setErrorMessage] = useState('All is good ... so far');

    useEffect(() => {
        if(facade.getToken()) {
            setLoggedIn(true);
        }}, []);

    return (
        <>
            <Header setLoggedIn={setLoggedIn} loggedIn={loggedIn} facade={facade}/>
            <Routes>
                <Route path="/" element={<Home  loggedIn={loggedIn}/*facade={facade}*//>}/>
                {/*<Route path="/createUser" element={<CreateUser/>}/>*/}
                <Route path="about" element={<About/>}/>
                <Route path="jokes" element={<Jokes/>}/>
                <Route path="*" element={<h1>Page Not Found !!!!</h1>}/>
            </Routes>
        </>
    );
}

export default App;