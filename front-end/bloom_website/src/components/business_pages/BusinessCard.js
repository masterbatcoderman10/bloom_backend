import "./BusinessCard.css";
import React from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Button } from "../Button";


export default function BusinessCard(props) {

  const navigate = useNavigate();
  console.log(props);
  
  const url = `https://bloom-rest.herokuapp.com/dashboard/${props.details.id}/${props.vendorID}/addMember/`
  
  return (
    <div className="col-lg-12 busi-holder" id={props.id}>
      <div className="primary-row">
        <h3 className="busi-title">{props.details.name}</h3>
        <p className="desc">{props.details.description}</p>
      </div>
      <div className="btn-row">
        <Button onClick={() => {
          
          //If this needs to connect a vendor, it will make the post call.
          if (props.isDash) {

            const token = JSON.parse(localStorage.getItem("token"));
            
            axios
              .post(url, {},{
                headers: {
                Authorization: `Token ${token}`,
                },
            }).then(() => {
              navigate(`/startup/${props.details.id}`)
            })
            .catch(err => navigate("/error"))

          } else {
            
            navigate(`/startup/${props.details.id}`)
            
          }
          
          }}>{props.isDash ? "Link Business" :"View Details"}</Button>

      </div>
    </div>
  );
}
