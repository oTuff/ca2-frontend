import {BrowserRouter, Route, Routes} from "react-router-dom";
import React, {useState} from 'react'
import ReactDOM from 'react-dom/client'
import './styles/main.css'
import App from "./App.jsx";

ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <BrowserRouter basename="/ca2-frontend">
            <App/>
        </BrowserRouter>
    </React.StrictMode>
)