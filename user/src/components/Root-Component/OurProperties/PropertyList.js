import React from 'react'
import PropertyCard from '../Property-Card/PropertyCard'

const PropertyList = ({currentList}) => {
  return (
    <div className='card-wrapper' style={{display:'flex', flexWrap:'wrap'}}>
        {
            currentList.map((property,i)=>{
                return(
                    <PropertyCard property={property} key={i+1}/>
                )
            })
           
        }
    </div>
  )
}

export default PropertyList