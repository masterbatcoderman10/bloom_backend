import React from "react";
import { useNavigate } from "react-router-dom";
import image from "../img4.jpg"
import { Button } from "../Button";

export default function VendorCardSimple(props) {
  const navigate = useNavigate();
  console.log(props);
  return (
    <div className="vendor-holder card">
      <h1 className="vendor-name">
        {props.details.name}
        <p className="vendor-description">
            {props.details.description}
        </p>
      </h1>
      <div className="vendor-content">
        <h3 className="vendor-content-titles">
            Features
            <p className="vendor-content-text">
                {props.details.features}
            </p>
        </h3>
        <h3 className="vendor-content-titles">
            Pricing
            <p className="vendor-content-text">
                {props.details.pricing}
            </p>
        </h3>
        <h3 className="vendor-content-titles">
            Rating
            <p className="vendor-content-text">
                {props.details.rating}/5 Stars
            </p>
        </h3>
      </div>
      <span>
        <a className="vendor-buttons" href={props.details.main_link}>
            Visit Website
        </a>
        <a className="vendor-buttons" href={props.details.account_link}>
            Account Page
        </a>
      </span>
    </div>
  );
}
