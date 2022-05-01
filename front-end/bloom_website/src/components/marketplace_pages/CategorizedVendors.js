import React from 'react'
import { useParams } from 'react-router-dom'
import { useState } from 'react';
import VendorListRenderer from './VendorListRenderer';
import VendorListGetter from './VendorListGetter';

export default function CategorizedVendors() {

    const params = useParams();
    const vendorCat = params.vendorCat;
    console.log(vendorCat)
    let heading = "";
    const url = `https://bloom-rest.herokuapp.com/marketplace/${vendorCat}/vendors`

    switch(vendorCat) {
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
        <VendorListGetter url={url} heading={heading} isDash={false} />
    )
    


}