import React from 'react';
import VendorListGetter from '../marketplace_pages/VendorListGetter';
import { useNavigate, useParams } from 'react-router-dom';

export default function Recomendations() {
    const navigate = useNavigate();
    const params = useParams();

    const startupID = params.startupID;
    const vendorCat = params.vendorCat;
    const options = params.options;

    if (!(startupID | vendorCat | options)) {
        navigate("/error")
    }

    const url = `https://bloom-rest.herokuapp.com/recommendations/${startupID}/${vendorCat}/${options}`

    return (
        <VendorListGetter url={url} heading={"Recomendations"} isDash={false}></VendorListGetter>
        
    )
}