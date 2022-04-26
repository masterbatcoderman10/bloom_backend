import React from "react"
import { useNavigate } from "react-router-dom" 

export default function RecommendationsModal() {

    const navigate = useNavigate();
    
    function gotoRecommendations() {
        
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
                ...
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Cancel
              </button>
              <button type="button" id="sign-in-btn"className="btn btn--primary btn--medium" onClick={console.log("Test Recomendation")}>
                Generate
              </button>
            </div>
          </div>
        </div>
      </div>
    )
}