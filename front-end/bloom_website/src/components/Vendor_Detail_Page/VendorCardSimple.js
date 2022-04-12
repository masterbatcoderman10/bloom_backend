import React from "react";
import "./VendorCardSimple.css"
import { useNavigate } from "react-router-dom";
import { Button } from "../Button";

export default function VendorCardSimple({details}) {
  const navigate = useNavigate();
  console.log("here");
  return (
    <div className="vendor-holder card">
      <h1 className="vendor-name">
        {details.name}
        <p className="vendor-description">
            {details.description}
        </p>
      </h1>
      <div className="vendor-content">
        <h3 className="vendor-content-titles">
            Features
            <p className="vendor-content-text">
                {details.features}
            </p>
        </h3>
        <h3 className="vendor-content-titles">
            Pricing
            <p className="vendor-content-text">
                {details.pricing}
            </p>
        </h3>
        <h3 className="vendor-content-titles">
            Rating
            <p className="vendor-content-text">
                {details.rating}/5 Stars
            </p>
        </h3>
      </div>
      <span>
        <a className="vendor-buttons" href={details.main_link}>
            Visit Website
        </a>
        <a className="vendor-buttons" href={details.account_link}>
            Account Page
        </a>
      </span>
    </div>
  );
}
