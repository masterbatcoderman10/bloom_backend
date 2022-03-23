import React from "react"
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import {Button} from "../Button"
import './BusinessContainer.css'
export default function BusinessContainer() {

    const [startups, setStartups] = useState([]);
    const loading = true;
    const url = "https://bloom-rest.herokuapp.com/startups/"

    useEffect(() => {

        

    }, [setStartups])



    return (
        <div className="container">
            <div className="row">
                <div className="col-lg-12 top-nav">
                    <h1 className="heading">Your Businesses</h1>
                    <Button>Add a Business</Button>
                </div>
                <hr className="simple"></hr>
            </div>
        </div>
    )

}