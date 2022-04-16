import React from 'react'
import VendorCardLess from "./VendorCardLess.js"
import { Loader } from '../Loader'
import "../business_pages/BusinessContainer.css"

export default function VendorListRenderer({isLoading, vendorList, isDash}) {

    function renderItems() {
        return vendorList.map((vendor) => <VendorCardLess key={vendor.id} details={vendor} isDash={isDash}></VendorCardLess>)
    }

    return isLoading ? <Loader /> : (
        <>
            {renderItems()}
        </>
    )

}