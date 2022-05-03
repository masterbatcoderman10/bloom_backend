import React from 'react'
import { useParams } from 'react-router-dom'
import VendorListGetter from '../marketplace_pages/VendorListGetter'


export default function DashboardGetter() {

    const params = useParams();
    const dashID = params.dashboardID
    const url = `https://bloom-rest.herokuapp.com/dashboard/${dashID}/members/`;

    return (
        <VendorListGetter url={url} heading={"Your Dashboard"} isDash={true}/>
    )

}