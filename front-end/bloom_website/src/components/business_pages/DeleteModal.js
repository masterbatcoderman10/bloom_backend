
import { useNavigate } from "react-router-dom";
import "./StartupCard.css";
import axios from "axios";

export default function DeleteModal({startupID}) {

    const navigate = useNavigate();

    const url = `https://bloom-rest.herokuapp.com/startups/${startupID}/details`

    function deleteBusiness() {

        const token = JSON.parse(localStorage.getItem("token"));
        document.querySelector("div.modal-body").innerHTML = "Deleting Business..."
        
        
        axios
        .delete(url, {
            headers: {
            Authorization: `Token ${token}`,
            },
        })
        .then((response) => {
            
            navigate("/startups");
            window.location.reload();
        })
        .catch((error) => {
            navigate("/error")
            console.log(error)});

    }

    return (
        <div
        className="modal fade"
        id="staticBackdrop"
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
                Delete Confirmation
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">Are you sure you want to delete this business</div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Cancel
              </button>
              <button type="button" id="sign-in-btn"className="btn btn--primary btn--medium" onClick={deleteBusiness}>
                Confirm
              </button>
            </div>
          </div>
        </div>
      </div>
    )
}