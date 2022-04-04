import React from "react";
import axios from "axios";
import {useState, useEffect} from "react";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import StartupCard from "./StartupCard";

export default function StartupPage() {

    const params = useParams();
    const startupID = params.startupID
    
    //console.log(startupID)

    const [startup, setStartup] = useState([]);
    const url = `https://bloom-rest.herokuapp.com/startups/${startupID}`

    useEffect(() => {
        const token = JSON.parse(localStorage.getItem("token"));
        axios
        .get(url, {
            headers: {
            Authorization: `Token ${token}`,
            },
        })
        .then((response) => {
            setStartup(response.data);
        })
        .catch((error) => console.log(error));

    }, [setStartup])

    

    return (
        <div className="container">
            <div className="row">
                
                <hr className="simple"></hr>
                    <StartupCard key={startup.id} details={startup} />
            </div>
        </div>
    )


}
