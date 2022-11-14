import facade from "../utils/apiFacade.js";
import {useEffect, useState} from "react";

export default function Home(props) {
    const [message, setMessage] = useState("");

    useEffect(() => {
    if (facade.getUserName()){
        if(facade.getUserRoles()==="user") {
            facade.fetchData().then(res => res.msg).then(res => setMessage(res))
        }else if(facade.getUserRoles()==="admin") {
            facade.fetchDataAdmin().then(res => res.msg).then(res => setMessage(res))
        }
    } else {
        setMessage("")
    }
},[props.loggedIn])

    return (
        <>
            <a>{message}</a>
        </>
    );
}