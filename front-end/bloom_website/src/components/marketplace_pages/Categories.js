import React from 'react'
import { useParams } from 'react-router-dom'
import CategoryGetter from './CategoryGetter';

export default function Categories() {

    const params = useParams();
    const category = params.category;
    console.log(category)
    let heading = "";
    const url = `https://bloom-rest.herokuapp.com/marketplace/categories`

    return (
        <CategoryGetter url={url} heading={heading} />
    )
    
}