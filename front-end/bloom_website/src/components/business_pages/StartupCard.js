import "./StartupCard.css";
import React from "react";
import { useNavigate } from "react-router-dom";

import { Button } from "../Button";


export default function StartupCard(props) {
  
  const navigate = useNavigate();
  console.log(props);
  return (
    <div className="col-lg-12 busi-holder" id={props.id}>
      <h1 className="busi-title">{props.details.name}</h1>
      <div className="primary-row">
        <div>
          <h3 className="busi-description">Description:</h3>
          <p className="desc">{props.details.description}</p>
        </div>
        <div>
          <h3 className="busi-founders">Founders:</h3>
          <p>{props.details.founders}</p>
        </div>
        <div>
          <h3 className="busi-date">Date Founded:</h3>
          <p>{props.details.date_founded}</p>
        </div>
        <div>
          <h3 className="busi-email">Business Email:</h3>
          <p>{props.details.email}</p>
        </div>
        <div>
          <h3 className="busi-num">Number of Current Employees:</h3>
          <p>{props.details.num_employees}</p>
        </div>
        <div>
          <h3 className="busi-industry">Industry:</h3>
          <p>{props.details.industry}</p>
        </div>
      </div>
    </div>
  );
}
