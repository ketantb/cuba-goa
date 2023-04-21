import axios from 'axios';
import './PropertyCard.css'
import { useState, useEffect } from 'react';

import { RiDeleteBin5Fill } from 'react-icons/ri';
// import AddMoreRoomForm from '../AddMoreRoomForm';


const PropertyCard = ({ property }) => {

    return (
        <>
            <div className="property-card-container">
                <div id="property-card-img" style={{
                    background: `url(${property.resortImgURL})`,
                    backgroundSize: 'cover',
                    backgroundRepeat: 'no-repeat',
                    backgroundPosition: 'center center'
                }}>
                    <div className='property-card-delete-icon'><RiDeleteBin5Fill /></div>
                </div>
                <div className="card-footer">
                    <div className="card-footer-lb">
                        <div>
                            {property.resortLocation + ",  India"}
                        </div>
                        <div>
                            {property.resortName}
                        </div>
                    </div>
                    <div className="card-footer-rb">
                        <div>
                            <button id='property-card-add-btn'>Add Rooms</button>
                        </div>
                    </div>
                </div>
            </div>

        </>
    )
}

export default PropertyCard;