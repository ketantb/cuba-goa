import React, { useEffect, useState } from 'react'
import './ViewDetails.css'
import { useParams } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import axios from 'axios';
import { FaStar } from 'react-icons/fa';

import Images from './Images';
import RoomCard from './RoomCard/RoomCard';


const ViewDetails = () => {
  const navigate = useNavigate()


  const [resort, setResort] = useState([])
  // eslint-disable-next-line
  const { resortname, id } = useParams()

  //GET PROPERTY DETAILS
  const getProperty = async () => {
    try {
      const response = await axios.get(`http://localhost:4001/resort-details/${id}`)
      console.log('view details of resort', response.data.resortData)
      setResort(response.data.resortData[0])
    }
    catch (err) {
      console.log(err)
    }
  }
  useEffect(() => {
    getProperty()
    // eslint-disable-next-line
  }, [id])

  return (
    <>
      <div className='view-details-wrapper'>

        <div className='section1'>
          <button className='back-btn' onClick={() => { navigate('/our-properties') }}
          >BACK</button>
        </div>

        <div className='section2'>
          <div className='row1'>
            <div className='col1'>
              <h3>{resort.resortName}</h3>
              <p>{resort.resortLocation}</p>
            </div>
            <div className='col2 ' style={{ display: 'flex', flexDirection: 'column' }}>
              <h5>Rating
                <span style={{ marginLeft: '0.5rem' }}>5</span>
              </h5>
              <div>
                {
                  [...Array(5)].map((star, index) => {
                    return (
                      <FaStar size={25} style={{ color: 'orange' }} />
                    )
                  })
                }
              </div>
            </div>
          </div>
        </div>


        {/* section3 */}
        <Images />
        {/* section3 ends*/}


        <div className='section4'>
          <div className='col1'>
            <p>{resort.resortDescription}</p>
          </div>
          <div className='col2'>
            <h6>AMINITIES</h6>
            <div>Swimming Pool</div>
          </div>
        </div>


        <div className='booking-setion' id='booking-section'>
          <h3>Room Availability</h3>
          <div className='room-card-wrapper'>
            <RoomCard />
            <RoomCard />
            <RoomCard />
          </div>
        </div>
      </div>

    </>
  )
}

export default ViewDetails