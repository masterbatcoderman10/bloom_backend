import "./StartupCard.css";
import React from "react";
import { useNavigate } from "react-router-dom";
import image from "../img4.jpg"
import { Button } from "../Button";

export default function StartupCard(props) {
  const navigate = useNavigate();
  console.log(props);
  return (
    <div className="busi-holder card mb-3">
      <img src={image} className="card-img-top" id="card-img" alt="..." />
      {/* <img src="..."></img> */}
      <div className="card-body">
        <h3 className="card-title">{props.details.name}</h3>
        <p id="desc-date-holder" className="card-text">
          {props.details.founders}
        </p>
        <p className="card-text">
          <span className="desc-date text-muted">{props.details.description}</span>
          <span className="desc-date text-muted">{props.details.date_founded}</span>
        </p>
        <p className="card-text">
          <span className="desc-date"><Button onClick={() => navigate(`/editStartup/${props.details.id}`)}>Edit Info</Button></span>
          <span className="desc-date"><Button>Delete</Button></span>
        </p>
      </div>
    </div>
  );
}
