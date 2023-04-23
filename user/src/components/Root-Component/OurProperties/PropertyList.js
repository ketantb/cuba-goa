import React from 'react'
import './propertyList.css'
import PropertyCard from '../Property-Card/PropertyCard'



const PropertyList = ({ currentList }) => {
  return (
    <div className='card-wrapper' >
      {
        currentList.map((property, i) => {
          return (
            <PropertyCard property={property} key={i + 1} />
          )
        })

      }
    </div>
  )
}

export default PropertyList