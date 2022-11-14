import { useState, useEffect } from "react";

export default function Jokes() {
    const [dadJoke, setDadJoke] = useState("");
    const [chuckJoke, setChuckJoke] = useState("");
    const URL = "https://tuff.systems/tomcat/BackEnd_CA2/api/jokes";

    const options = {
        method: "GET",
        headers: {
            Accept: "application/json",
        },
    };

    const getJokes = async () => {
        const response = await fetch(URL, options);
        const result = await response.json();
        setChuckJoke(result.joke1)
        setDadJoke(result.joke2);
    };

    return (
        <div>
            <button onClick={getJokes}>Jokes</button>
            <br/>
            {dadJoke}
            <br/>
            {chuckJoke}
        </div>
    );
}