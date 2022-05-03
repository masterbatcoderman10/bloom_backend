import React from "react";
import axios from "axios";
import {useState, useEffect} from "react";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import StartupCard from "./StartupCard";

export default function StartupPage() {

    const params = useParams();
    const startupID = params.startupID
    const [loading, setLoading] = useState(true);
    //console.log(startupID)

    const [startup, setStartup] = useState([]);
    const [dashboardId, setDashboardID] = useState(0);
    const url = `https://bloom-rest.herokuapp.com/startups/${startupID}/details`
    const dashboard_url = `https://bloom-rest.herokuapp.com/dashboard/${startupID}/exists`

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
            setLoading(false);
        })
        .catch((error) => console.log(error));

        //Call to get dashboard id or create a dashboard if it doesn't exist.
        axios
        .get(dashboard_url, {
            headers: {
            Authorization: `Token ${token}`,
            },
        })
        .then((response) => {

            setDashboardID(response.data.id)

        })
        .catch((error) => console.log(error));



    }, [setStartup])

    

    return (
        <div className="container">
            <div className="row">
                
                <hr className="simple"></hr>
                    <StartupCard key={startup.id} details={startup} isLoading={loading} d_ID={dashboardId} />
            </div>
        </div>
    )


}
