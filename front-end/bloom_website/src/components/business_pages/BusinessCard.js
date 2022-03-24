import "./BusinessCard.css";
import React from "react";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import { Button } from "../Button";


export default function BusinessCard(props) {
  console.log(props);
  return (
    <div className="col-lg-12 busi-holder" id={props.id}>
      <div className="primary-row">
        <h3 className="busi-title">{props.details.name}</h3>
        <p className="desc">{props.details.description}</p>
      </div>
      <div className="btn-row">
        <Button >View Details</Button>

      </div>
    </div>
  );
}
