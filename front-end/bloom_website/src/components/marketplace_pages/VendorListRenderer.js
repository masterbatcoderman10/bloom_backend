import React from 'react'
import VendorCardLess from "./VendorCardLess.js"
import { Loader } from '../Loader'
import "../business_pages/BusinessContainer.css"

export default function VendorListRenderer({isLoading, vendorList}) {

    console.log(vendorList)
    console.log("here we go");
    function renderItems() {
        console.log("and a one and a....")
        return vendorList.map((vendor) => <VendorCardLess key={vendor.id} details={vendor}></VendorCardLess>)
    }

    return isLoading ? <Loader /> : (
        <>
            {renderItems()}
        </>
    )

}