import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import VendorListRenderer from "./VendorListRenderer.js";
import {SmallLoader} from "../SmallLoader.js";

export default function VendorListGetter({ heading, url, isDash, isRecommended, stID }) {
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
          <span id="for-delete" className="d-none"><SmallLoader></SmallLoader><p className="text-muted text-small">Deleting ..</p></span>
        </div>
        <hr className="simple"></hr>
        {
          /* <div className="col-lg-12 busi-container">
                    {renderItems()}
                </div> */
          <VendorListRenderer isLoading={isLoading} vendorList={vendorList} isDash={isDash} stID={stID} />
        }
      </div>
    </div>
  );
}
