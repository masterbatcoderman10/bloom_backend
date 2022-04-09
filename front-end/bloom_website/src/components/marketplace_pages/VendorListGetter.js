import React from "react";
import {useState, useEffect} from 'react';
import axios from "axios";
import VendorListRenderer from "./VendorListRenderer.js"


export default function VendorListGetter({heading, url}) {

    
    const [vendorList, setVendorList] = useState([]);
    const [isLoading, setLoading] = useState(true);
    let dats = []
    
    useEffect(() => {

        axios
        .get(url)
        .then((response) => {

            setVendorList(response.data);
            //console.log(vendorList);
            setLoading(false);

        })
        .catch(error => console.log(error))



    }, [setVendorList])

    return (
        <div className="container">
            <div className="row">
                <div className="col-lg-12 top-nav">
                    <h1 className="heading">{heading}</h1>
                </div>
                <hr className="simple"></hr>
                {/* <div className="col-lg-12 busi-container">
                    {renderItems()}
                </div> */
                    <VendorListRenderer isLoading={isLoading} vendorList={vendorList}/>
                
                }
            </div>
        </div>
    )

}