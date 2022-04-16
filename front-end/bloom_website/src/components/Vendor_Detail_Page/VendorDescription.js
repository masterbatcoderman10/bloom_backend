import React from "react";
import "./VendorCardSimple.css";
import './VendorDescription.css'
import { useNavigate } from "react-router-dom";

export default function VendorDescription({details}) {


    return (
        <div className="col-12 info-holder">
            <div className="row">
                <div className="col-md-8 col-12 desc-holder">
                    <h2>Description</h2>
                    <p className="desc">{details.description}</p>
                </div>
                <hr className="divider d-md-none text-muted"></hr>
                <div className="col-md-4 col-12 price-holder">
                    <h2 className="text-center"> Pricing</h2>
                    <p className="text-center text-muted"> Starting From</p>
                    <h1 className="card-title pricing-card-title">
                        {details.pricing}      
                        <small className="text-muted fw-light">/mo</small>     
                    </h1>
                </div>
            </div>
        </div>
    )
}