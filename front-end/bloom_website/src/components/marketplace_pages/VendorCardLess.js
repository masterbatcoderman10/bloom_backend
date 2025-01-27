import React from "react";
import "./VendorCardLess.css";
import { Button } from "../Button.js";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useState } from "react";

export default function VendorCardLess({ details, isDash, stID }) {
  const navigate = useNavigate();
  const [isDeleting, setDeleting] = useState(false);

  const img_url = `https://bloom-rest.herokuapp.com${details.logo}`;
  const img2_url = `https://bloom-rest.herokuapp.com${details.screen_image}`;
  return (
    <div className="col-lg-6 col-md-6 col-sm-12 ">
      <div className="vendor-detail">
        <div className="row">
          <div className="col-lg-2 col-md-2 col-sm-2 col-2">
            <img className="logo-img" src={img_url} alt={details.alt_1}></img>
          </div>
          <div className="col-lg-7 col-md-5 col-sm-5 col-5 info">
            <h2 className={isDeleting ? "vendor-text-name deleting-text" : "vendor-text-name" }>{details.name}</h2>
            <small className="text-muted descriptor">
              {details.descriptor}
            </small>
          </div>
          <div className="col-lg-3 col-md-5 col-sm-5 col-5 btn-holder">
            {
             isDash ? 
             <button
             className="info-btn"
           >
             <a className = "link-account" href={details.account_link} target="_blank">Your Account</a>
           </button>: 
              <button
              className="info-btn"
              onClick={() => navigate(`/vendor/${details.id}/vendorDetails`)}
            >
              View Info
            </button>
            
            }

            {isDash ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                className="trash bi bi-trash3"
                viewBox="0 0 16 16"
                onClick={() => {
                  setDeleting(true);
                  const url = `https://bloom-rest.herokuapp.com/dashboard/${stID}/${details.id}/details/`;
                  console.log(url);

                  const token = JSON.parse(localStorage.getItem("token"));
                  
                  let e = document.getElementById("for-delete");
                  e.classList.remove("d-none");
                  console.log(e);
                  axios
                    .delete(url, {
                      headers: {
                        Authorization: `Token ${token}`,
                      },
                    })
                    .then((response) => {
                      
                      //console.log(vendorList);
                      window.location.reload();
                      
                    })
                    .catch((error) => navigate("/error"));
                }}
              >
                <path d="M6.5 1h3a.5.5 0 0 1 .5.5v1H6v-1a.5.5 0 0 1 .5-.5ZM11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3A1.5 1.5 0 0 0 5 1.5v1H2.506a.58.58 0 0 0-.01 0H1.5a.5.5 0 0 0 0 1h.538l.853 10.66A2 2 0 0 0 4.885 16h6.23a2 2 0 0 0 1.994-1.84l.853-10.66h.538a.5.5 0 0 0 0-1h-.995a.59.59 0 0 0-.01 0H11Zm1.958 1-.846 10.58a1 1 0 0 1-.997.92h-6.23a1 1 0 0 1-.997-.92L3.042 3.5h9.916Zm-7.487 1a.5.5 0 0 1 .528.47l.5 8.5a.5.5 0 0 1-.998.06L5 5.03a.5.5 0 0 1 .47-.53Zm5.058 0a.5.5 0 0 1 .47.53l-.5 8.5a.5.5 0 1 1-.998-.06l.5-8.5a.5.5 0 0 1 .528-.47ZM8 4.5a.5.5 0 0 1 .5.5v8.5a.5.5 0 0 1-1 0V5a.5.5 0 0 1 .5-.5Z" />
              </svg>
            ) : (
              <></>
            )}
          </div>
          <div
            className={
              isDash
                ? "col-lg-12 d-sm-none d-none"
                : "col-lg-12 d-sm-none d-none d-lg-block d-md-block"
            }
          >
            <img src={img2_url} className="screen" alt={details.alt_2}></img>
          </div>
        </div>
      </div>
    </div>
  );
}
