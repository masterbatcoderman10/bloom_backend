import React from "react"
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import {Button} from "../Button"
import './BusinessContainer.css'

import BusinessHolder from "./BusinessHolder"

export default function BusinessContainer({forDash, vendorID}) {

    const navigate = useNavigate();

    const [startups, setStartups] = useState([]);
    const [isLoading, setLoading] = useState(true);
    const url = "https://bloom-rest.herokuapp.com/startups/businesses/"

    useEffect(() => {



        const token = JSON.parse(localStorage.getItem("token"));
        axios
        .get(url, {
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

    

    return (
        <div className="container">
            <div className="row">
                <div className="col-lg-12 top-nav">
                    <h1 className="heading">{forDash ? "Link Vendor" : "Your Business"}</h1>
                    <Button  buttonStyle={forDash ? "d-none" : ''} onClick={() => navigate("/addStartup")}>Add a Business</Button>
                </div>
                <hr className="simple"></hr>
                {/* <div className="col-lg-12 busi-container">
                    {renderItems()}
                </div> */
                    <BusinessHolder isLoading={isLoading} startups={startups} isDash={forDash} vendorID={vendorID}/>
                
                }
            </div>
        </div>
    )

}