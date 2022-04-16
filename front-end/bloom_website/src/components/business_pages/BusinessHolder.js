import React from "react"

import './BusinessContainer.css'
import BusinessCard from "./BusinessCard";
import {Loader} from "../Loader";

export default function BusinessHolder({startups, isLoading, isDash, vendorID}) {

    function renderItems() {
        return startups.map(startup => <BusinessCard key={startup.id} details={startup} isDash={isDash} vendorID={vendorID}/>)
    }

    return isLoading ? (<Loader />) :(

        <div className="col-lg-12 busi-container">
                    {renderItems()}
        </div>
        
    )

}