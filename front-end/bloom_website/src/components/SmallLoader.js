import React from 'react'

import "./SmallLoader.css"

let loader = require("./infinity.gif")

export const SmallLoader = () => {
    return (
                // eslint-disable-next-line
        <img src={loader } className="small-loader"/>
            
       
    )
}
