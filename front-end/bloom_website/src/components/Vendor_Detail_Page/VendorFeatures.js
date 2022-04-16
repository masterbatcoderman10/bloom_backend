import React from 'react'
import "./VendorFeatures.css"

export default function VendorFeatures({details}) {

    let featureList = []
    if (details.features === undefined) {
        featureList = []
    } else {
        
        featureList = details.features.split(",");
    }

    const featureObjects = featureList.map((feature, i) => ({id: i, feat: feature}))
    return (
        <div className="col-12 info-holder">

            <div className="row">
                <div className="col-12 title">
                    <h2>Features</h2>
                </div>
                <div className="col-12 feature-list">
                    <ul className="feature-holder">
                        {featureObjects.map((feature) => <li key={feature.id} className='feature'>{feature.feat}</li>)}
                    </ul>
                </div>
            </div>
        </div>
    )

}