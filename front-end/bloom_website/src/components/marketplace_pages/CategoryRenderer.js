import React from 'react'
import CategoryCard from "./CategoryCard.js"
import { Loader } from '../Loader'
import "../business_pages/BusinessContainer.css"

export default function CategoryRenderer({isLoading, categoryList}) {

    console.log(categoryList)
    function renderItems() {
        return categoryList.map((category) => <CategoryCard key={category.id} details={category}></CategoryCard>)
    }

    return isLoading ? <Loader /> : (
        <>
            {renderItems()}
        </>
    )

}