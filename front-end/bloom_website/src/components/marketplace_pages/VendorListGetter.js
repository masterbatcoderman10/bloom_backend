import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import VendorListRenderer from "./VendorListRenderer.js";

export default function VendorListGetter({ heading, url, isDash, isRecommended }) {
  const [vendorList, setVendorList] = useState([]);
  const [isLoading, setLoading] = useState(true);
  let dats = [];

  useEffect(() => {

    
    
    if (isDash) {
      const token = JSON.parse(localStorage.getItem("token"));

      axios
        .get(url, {
          headers: {
            Authorization: `Token ${token}`,
          },
        })
        .then((response) => {
          setVendorList(response.data);
          //console.log(vendorList);
          setLoading(false);
        })
        .catch((error) => console.log(error));
    } else if (isRecommended) {

      const token = JSON.parse(localStorage.getItem("token"));

      axios
        .get(url, {
          headers: {
            Authorization: `Token ${token}`,
          },
        })
        .then((response) => {
          setVendorList(response.data);
          //console.log(vendorList);
          setLoading(false);
        })
        .catch((error) => console.log(error));

    } else {
      axios
        .get(url)
        .then((response) => {
          setVendorList(response.data);
          //console.log(vendorList);
          setLoading(false);
        })
        .catch((error) => console.log(error));
    }
  }, [setVendorList]);

  return (
    <div className="container">
      <div className="row">
        <div className="col-lg-12 top-nav">
          <h1 className="heading">{heading}</h1>
        </div>
        <hr className="simple"></hr>
        {
          /* <div className="col-lg-12 busi-container">
                    {renderItems()}
                </div> */
          <VendorListRenderer isLoading={isLoading} vendorList={vendorList} isDash={isDash} />
        }
      </div>
    </div>
  );
}
