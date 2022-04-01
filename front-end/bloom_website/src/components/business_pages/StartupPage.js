import React from "react";
import axios from "axios";
import {useState, useEffect} from "react";
import { useParams } from "react-router-dom";

export default function StartupPage() {

    const params = useParams();
    const stID = params.startupID;
    console.log(stID)
    
    return (
        <h1>Detail Page</h1>
    )

}
