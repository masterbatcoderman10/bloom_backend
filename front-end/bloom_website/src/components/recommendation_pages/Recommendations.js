import React from 'react';
import VendorListGetter from '../marketplace_pages/VendorListGetter';
import { useNavigate, useParams } from 'react-router-dom';

export default function Recomendations() {
    const navigate = useNavigate();
    const params = useParams();

    const startupID = params.startupID;
    const vendorCat = params.vendorCat;
    const option = params.option;
    console.log(option);

    if (!(startupID & vendorCat & option)) {
        navigate("/error")
    }

    const url = `https://bloom-rest.herokuapp.com/recommendations/${startupID}/${vendorCat}/${option}/generateRecommendations`;
    console.log(url);
    return (
        <VendorListGetter url={url} heading={"Recomendations"} isDash={false} isRecommended={true}></VendorListGetter>
        
    )
}