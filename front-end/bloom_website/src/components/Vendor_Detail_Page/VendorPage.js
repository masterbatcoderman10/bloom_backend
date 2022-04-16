import React from "react";
import axios from "axios";
import {useState, useEffect} from "react";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import VendorCardSimple from "./VendorCardSimple";

export default function VendorPage() {

    const params = useParams();
    const vendorID = params.vendorID
    const [isLoading, setLoading] = useState(true);
    console.log(vendorID)

    const [vendor, setVendor] = useState([]);
    const url = `https://bloom-rest.herokuapp.com/marketplace/${vendorID}/details`

    useEffect(() => {
        const token = JSON.parse(localStorage.getItem("token"));
        axios
        .get(url, {
            headers: {
            Authorization: `Token ${token}`,
            },
        })
        .then((response) => {
            setLoading(false);
            setVendor(response.data);
        })
        .catch((error) => console.log(error));

    }, [setVendor])

    

    return (
        <div className="container">
            <div className="row parent">
                
                <VendorCardSimple key={vendor.id} details={vendor} isLoading={isLoading} />
            </div>
        </div>
    )


}
