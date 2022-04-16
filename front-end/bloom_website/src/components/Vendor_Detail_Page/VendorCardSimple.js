import React from "react";
import "./VendorCardSimple.css";
import { useNavigate } from "react-router-dom";
import { Button } from "../Button";
import TopInfo from "./TopInfo";
import VendorDescription from "./VendorDescription";
import VendorFeatures from "./VendorFeatures";
import { Loader } from "../Loader";

export default function VendorCardSimple({ details, isLoading }) {

  
 
  return isLoading ? <Loader /> : (
    <>
    
    <TopInfo details={details} />
    <VendorDescription details={details} />
    <VendorFeatures details={details}/>
    </>
  );
}
