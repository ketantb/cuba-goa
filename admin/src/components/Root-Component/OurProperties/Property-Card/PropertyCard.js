import './PropertyCard.css'
import '../OurProperties.css'
import axios from 'axios';
import { useState, useEffect } from 'react';
import {
    CButton, CCol, CModal, CModalHeader,
    CModalTitle, CModalBody, CModalFooter, CFormInput, CRow,
    CFormTextarea, CFormCheck, CCard, CCardHeader, CCardBody,
    CImage,
    CContainer
} from '@coreui/react'
import { RiDeleteBin5Fill } from 'react-icons/ri';
import AddMoreRoomForm from '../AddMoreRoomForm';


const PropertyCard = ({ property, allProperties, getPropertiesData, key, deleteProperty }) => {
    const [showRoomForm, setRoomForm] = useState(false)
    console.log("allProperties =>", allProperties)
    if (!allProperties) {
        return (
            <h1>Loading...</h1>
        )
    }
    return (
        <>
            <div className='about-hotel'>
                        <div className="property-card-container" key={key}>
                            <div id="property-card-img" style={{
                                background: `url(${property.resortImgURL})`,
                                backgroundSize: 'cover',
                                backgroundRepeat: 'no-repeat',
                                backgroundPosition: 'center center'
                            }}>
                                <div className='property-card-delete-icon' onClick={() => deleteProperty(property._id)}><RiDeleteBin5Fill/></div>
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
                                        <button id='property-card-add-btn' onClick={() => setRoomForm(true)}>Add Rooms</button>
                                    </div>
                                </div>
                            </div>
                        </div>
            </div>
            <AddMoreRoomForm getPropertiesData={getPropertiesData}
            showRoomForm={showRoomForm}
            property={property}
            setRoomForm={setRoomForm}
          />
        </>
    )
}

export default PropertyCard;