import React from "react";
import BusinessContainer from "../business_pages/BusinessContainer";
import { useParams } from "react-router-dom";

export default function DashboardLinkMedium() {
    const params = useParams();
    const vID = params.vendorID;

    return (
        <BusinessContainer forDash={true} vendorID={vID}></BusinessContainer>
    )
}