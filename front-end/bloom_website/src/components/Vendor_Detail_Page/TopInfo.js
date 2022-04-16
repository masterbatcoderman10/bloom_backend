import React from "react";
import "./VendorCardSimple.css";
import { useNavigate } from "react-router-dom";

export default function TopInfo({ details }) {
  const navigate = useNavigate();

  const img_url = `https://bloom-rest.herokuapp.com${details.logo}`;
  const img2_url = `https://bloom-rest.herokuapp.com${details.screen_image}`;

  function genStars(number) {
    const ratings = Math.round(number);

    const remainder = 5 - ratings;
    const toStar = [];
    for (let i = 0; i < ratings; i += 1) {
      toStar.push(true);
    }
    for (let i = 0; i < remainder; i += 1) {
      toStar.push(false);
    }

    const starObjects = toStar.map((bool, i) => ({id: i, b: bool}))

    // console.log(toStar);
    return starObjects.map((bool) =>
      bool.b ? (
        <i key={bool.id} className="fa fa-star rating-color"></i>
      ) : (
        <i key={bool.id} className="fa fa-star rating-color uncolored"></i>
      )
    );
  }

  return (
    <div className="col-lg-12 info-holder">
      <div className="row">
        <div className="col-md-6 col-sm-12 col-12">
          <div className="col-12 top-row">
            <div className="row">
              <div className="col-md-3 col-lg-2 col-12 img-holder">
                <img src={img_url} className="logo"></img>
              </div>
              <div className="col-md-9 col-lg-10 col-12 title-area">
                <h2>{details.name}</h2>
                <div className="ratings">
                  {genStars(details.rating)}{" "}
                  <span className="rating-num">{details.rating}/5</span>
                </div>
              </div>
            </div>
          </div>
          <div className="col-12 btn-holder">
            <button
              className="connect-btn"
              onClick={() => navigate(`/vendor/${details.id}/linkVendor`)}
            >
              Connect
            </button>
          </div>
          <hr className=""></hr>
          <div className="col-12">
            <a className="web-link" href={details.main_link} target="_blank">
              Website
            </a>
          </div>
        </div>
        <div className="col-md-6 col-sm-12 col-12">
          <img className="screen" src={img2_url}></img>
        </div>
      </div>
    </div>
  );
}
