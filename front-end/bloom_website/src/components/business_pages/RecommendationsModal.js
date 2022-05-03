import React from "react"
import { useState } from "react";
import { useNavigate } from "react-router-dom" 

export default function RecommendationsModal({startupID}) {

    const navigate = useNavigate();
    const [category, setCategory] = useState("MA");
    const [duration, setDuration] = useState("Free Trial");    
    function gotoRecommendations() {

        if (!(category) & !(duration)) {
            document.querySelector(".information").innerHTML = "Please select options.";
        } else {
            // console.log(`/recommendations/${startupID}/${category}/${duration}`)
            navigate(`/recommendations/${startupID}/${category}/${duration}`);
            window.location.reload();

        }

        
    }

    return (
        <div
        className="modal fade"
        id="recomendationsModal"
        data-bs-backdrop="static"
        data-bs-keyboard="false"
        tabIndex="-1"
        aria-labelledby="staticBackdropLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="staticBackdropLabel">
               Generate Recommendations
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
            <label className="information"></label>
            <label htmlFor="indus">Select the category for the predictions.</label>
            <select id="indus" className="form-control"  onChange={(e) => {
                  setCategory(e.target.value)
              }}>
                <option label="Marketing Analysis">MA</option>
                <option label="Digital Marketing">DM</option>
                <option label="Financial Analysis"> FA</option>
                <option label="Business Intelligence">BI</option>
                <option label="Team Management">TM</option>
                <option label="Human Resources">HR</option>
                <option label="Cyber Security">CS</option>
                <option label="Cloud Software">CLD</option>
              </select>
              
              <label htmlFor="duration">Enter the duration of use.</label>
              <select id="duration" className="form-control" onChange={(e) => {
                  setDuration(e.target.value)
              }}>
                  <option label="Free Trial">Free Trial</option>
                  <option label="1-5 months">1-5 months</option>
                  <option label="6-12 months">6-12 months</option>
                  <option label="1+ year">1+ year</option>
                  <option label="2+ years">2+ years</option>
              </select>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Cancel
              </button>
              <button type="button" id="sign-in-btn"className="btn btn--primary btn--medium" onClick={gotoRecommendations}>
                Generate
              </button>
            </div>
          </div>
        </div>
      </div>
    )
}