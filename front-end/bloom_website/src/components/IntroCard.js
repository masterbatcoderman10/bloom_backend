import React from "react";
import "./IntroCard.css";

export default function IntroCard(props) {
  
  return (
    <div className="col-lg-12 intro">
      <div className="row">
        <div className="col-lg-8">
          <h2>{props.props.heading}</h2>
          <p className="description">{props.props.text}</p>
        </div>
        <div className="col-lg-4 img-holder">
          <img src={props.props.imgPath} alt={props.props.alt_tag}/>
        </div>
      </div>
    </div>
  );
}
