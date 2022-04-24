
import React from "react";
import "./CategoryCard.css"
import {Button} from "../Button.js"

export default function CategoryCard({details}) {

    const img_url = `https://bloom-rest.herokuapp.com${details.background}`;
    let heading = "Category"
    switch(details.category) {
        case "TM":
            heading = "Team Management";
            break;
        case "MA":
            heading = "Market Analysis";
            break;
        case "DM":
            heading = "Digital Marketing";
            break;
        case "FA":
            heading = "Financial Analysis";
            break;
        case "HR":
            heading = "Human Resources";
            break;
        case "CS":
            heading = "Cyber Security";
            break;
        case "BI":
            heading = "Business Intelligence";
            break;
        case "CLD":
            heading = "Cloud Services";
            break;
    }

    
    return (
        <div class="col-12 col-sm-6 col-md-4 mb-5">
              <div class="card mt-4">
                <img
                  class="card-img-top card-img"
                  src={img_url}
                  alt="Illustration"
                 
                />
                <div class="card-body">
                  <h4 class="card-title text-secondary">{heading}</h4>
                  <p class="card-text text-secondary desc">
                    {details.description}
                  </p>
                </div>
                <div class="card-footer text-center">
                  <a href={`/vendors/${details.category}`} class="view-btn text-center">
                    See Vendors
                  </a>
                </div>
              </div>
            </div>
    )

}