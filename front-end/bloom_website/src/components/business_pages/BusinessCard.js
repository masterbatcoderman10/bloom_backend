import "./BusinessCard.css";
import React from "react";
import { useNavigate } from "react-router-dom";

import { Button } from "../Button";


export default function BusinessCard(props) {

  const navigate = useNavigate();
  console.log(props);
  return (
    <div className="col-lg-12 busi-holder" id={props.id}>
      <div className="primary-row">
        <h3 className="busi-title">{props.details.name}</h3>
        <p className="desc">{props.details.description}</p>
      </div>
      <div className="btn-row">
        <Button onClick={() => navigate(`/startup/${props.details.id}`)}>View Details</Button>

      </div>
    </div>
  );
}
