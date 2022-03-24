import React from "react"
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import {Button} from "../Button"
import './BusinessContainer.css'
import BusinessCard from "./BusinessCard";
import {Loader} from "../Loader";

export default function BusinessHolder({startups, isLoading}) {

    function renderItems() {
        return startups.map(startup => <BusinessCard key={startup.id} details={startup} />)
    }

    return isLoading ? (<Loader />) :(

        <div className="col-lg-12 busi-container">
                    {renderItems()}
        </div>
        
    )

}