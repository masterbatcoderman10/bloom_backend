import "./StartupCard.css";
import React from "react";
import { useNavigate } from "react-router-dom";
import image from "../img4.jpg";
import { Button } from "../Button";
import { Loader } from "../Loader";
import DeleteModal from "./DeleteModal";
import RecommendationsModal from "./RecommendationsModal";


export default function StartupCard(props) {
  const navigate = useNavigate();
  console.log(props);
  const loaded = props.isLoading;
  return loaded ? (
    <Loader></Loader>
  ) : (
    <div className="busi-holder card mb-3">
      <img src={image} className="card-img-top" id="card-img" alt="..." />
      {/* <img src="..."></img> */}
      <div className="card-body">
        <h3 className="card-title">{props.details.name}</h3>
        <p id="desc-date-holder" className="card-text">
          {props.details.founders}
        </p>
        <p className="card-text">
          <span className="desc-date text-muted">
            {props.details.description}
          </span>
          <span className="desc-date text-muted">
            {props.details.date_founded}
          </span>
        </p>
        <p className="card-text">
          A team of {props.details.num_employees} members
        </p>
        <p className="card-text">
          <span className="desc-date">
            <Button
              onClick={() => navigate(`/editStartup/${props.details.id}`)}
            >
              Edit Info
            </Button>
          </span>
          <span className="desc-date">
          <button
              type="button"
              className="btn btn--primary btn--medium"
              id="sign-in-btn"
              data-bs-toggle="modal"
              data-bs-target="#recomendationsModal"
            >
              Recomendations
            </button>
          </span>
          <span className="desc-date">
            <Button onClick={() => navigate(`/dashboard/${props.d_ID}`, {state: {stID: props.details.id}})}>
              Dashboard
            </Button>
          </span>
          <span className="desc-date">
            <button
              type="button"
              className="btn btn--primary btn--medium"
              id="sign-in-btn"
              data-bs-toggle="modal"
              data-bs-target="#staticBackdrop"
            >
              Delete
            </button>
          </span>
        </p>
      </div>
      <DeleteModal startupID={props.details.id}></DeleteModal>
      <RecommendationsModal startupID={props.details.id}></RecommendationsModal>
    </div>
  );
}
