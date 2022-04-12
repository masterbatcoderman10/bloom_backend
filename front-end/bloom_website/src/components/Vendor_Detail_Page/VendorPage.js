import React from "react";
import axios from "axios";
import {useState, useEffect} from "react";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import VendorCardSimple from "./VendorCardSimple";

export default function VendorPage() {

    const params = useParams();
    const vendorID = params.vendorID
    
    console.log(vendorID)

    const [vendor, setVendor] = useState([]);
    const url = `https://bloom-rest.herokuapp.com/marketplace/${vendorID}`

    useEffect(() => {
        const token = JSON.parse(localStorage.getItem("token"));
        axios
        .get(url, {
            headers: {
            Authorization: `Token ${token}`,
            },
        })
        .then((response) => {
            setVendor(response.data);
        })
        .catch((error) => console.log(error));

    }, [setVendor])

    

    return (
        <div className="container">
            <div className="row">
                
                <hr className="simple"></hr>
                    <VendorCardSimple key={vendor.id} details={vendor} />
            </div>
        </div>
    )


}
