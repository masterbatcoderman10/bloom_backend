import React from "react"
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import {Button} from "../Button"
import './BusinessContainer.css'
import BusinessCard from "./BusinessCard";
import BusinessHolder from "./BusinessHolder"

export default function BusinessContainer() {

    const navigate = useNavigate();

    const [startups, setStartups] = useState([]);
    const [isLoading, setLoading] = useState(true);
    const url = "https://bloom-rest.herokuapp.com/startups/"

    useEffect(() => {



        const token = JSON.parse(localStorage.getItem("token"));
        axios
        .get("https://bloom-rest.herokuapp.com/startups/", {
            headers: {
            Authorization: `Token ${token}`,
            },
        })
        .then((response) => {
            
            setStartups(response.data);
            setLoading(false);
        })
        .catch((error) => console.log(error));

    }, [setStartups])

    function renderItems() {
        return startups.map(startup => <BusinessCard key={startup.id} details={startup} />)
    }

    return (
        <div className="container">
            <div className="row">
                <div className="col-lg-12 top-nav">
                    <h1 className="heading">Your Businesses</h1>
                    <Button onClick={() => navigate("/addStartup")}>Add a Business</Button>
                </div>
                <hr className="simple"></hr>
                {/* <div className="col-lg-12 busi-container">
                    {renderItems()}
                </div> */
                    <BusinessHolder isLoading={isLoading} startups={startups}/>
                
                }
            </div>
        </div>
    )

}