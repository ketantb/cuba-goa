import axios from 'axios';
import { useState, useEffect } from 'react';

import { RiDeleteBin5Fill } from 'react-icons/ri';
// import AddMoreRoomForm from '../AddMoreRoomForm';


const PropertyCard = () => {
    const [allProperties, setAllProperties] = useState("")
    const [showRoomForm, setRoomForm] = useState(false)
    const getPropertiesData = async () => {
        // await axios(`https://cubagoa-server.onrender.com/hotelbook`)
        await axios(`http://localhost:4001/hotelbook`)
            .then((res) => {
                // console.log(res.data)
                setAllProperties(res.data)
                //    setSelectedVal([res.data[0].resortName, res.data[0]._id])
            })
            .catch((err) => {
                console.log(err)
            })
    }
    console.log("allProperties =>", allProperties)
    useEffect(() => {
        getPropertiesData()
    }, [])
    if (!allProperties) {
        return (
            <h1>Loading...</h1>
        )
    }
    return (
        <>
            <div className='about-hotel'>
                {allProperties.map((items, index) => {
                    const { resortDescription, resortImgURL, resortLocation, resortName, rooms } = items;
                    return (
                        <div className="property-card-container" key={index}>
                            <div id="property-card-img" style={{
                                background: `url(${resortImgURL})`,
                                backgroundSize: 'cover',
                                backgroundRepeat: 'no-repeat',
                                backgroundPosition: 'center center'
                            }}>
                                <div className='property-card-delete-icon'><RiDeleteBin5Fill/></div>
                            </div>
                            <div className="card-footer">
                                <div className="card-footer-lb">
                                    <div>
                                        {resortLocation + ",  India"}
                                    </div>
                                    <div>
                                        {resortName}
                                    </div>
                                </div>
                                <div className="card-footer-rb">
                                    <div>
                                        <button id='property-card-add-btn' onClick={() => setRoomForm(true)}>Add Rooms</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )

                })}
            </div>
            {/* <AddMoreRoomForm getPropertiesData={getPropertiesData}
            showRoomForm={showRoomForm}
            roomData={allProperties}
            setRoomForm={setRoomForm}
          /> */}
        </>
    )
}

export default PropertyCard;