
import React from "react";
import "./VendorCardLess.css"
import {Button} from "../Button.js"

export default function VendorCardLess({details}) {
    
    const img_url = `https://bloom-rest.herokuapp.com${details.logo}`
    const img2_url = `https://bloom-rest.herokuapp.com${details.screen_image}`
    return (
        <div className="col-lg-6 col-md-6 col-sm-12 ">
            <div className="vendor-detail">


                <div className="row">
                    <div className="col-lg-2 col-md-2 col-sm-2">
                        <img className="logo-img" src={img_url}></img>
                    </div>
                    <div className="col-lg-7 col-md-5 col-sm-5 info">
                        <h2 className="vendor-text-name">{details.name}</h2>
                        <small className="text-muted descriptor">{details.category}</small>
                    </div>
                    <div className="col-lg-3 col-md-5 col-sm-5 btn-holder">
                        <button className="info-btn">View Info</button>
                    </div>
                    <div className="col-lg-12 d-sm-none d-lg-block d-md-block">
                        <img src={img2_url} className="screen"></img>
                    </div>
                </div>
            </div>
            

        </div>
    )

}