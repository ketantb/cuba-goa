import React from 'react'
import './RoomCard.css'

import { Icon } from 'react-icons-kit'
import { images } from 'react-icons-kit/icomoon/images'
import { useNavigate, useParams } from 'react-router'


const RoomCard = () => {
  const navigate = useNavigate()


  const handleBooking = () => {
  }

  return (
    <div className='RoomCard card'>

      <div className='row1'>
        <div>
          <h6>Room Type</h6>
          <p>Rate per night</p>
          <p>Occupancy</p>
        </div>
        <div className='images-icon'>
          <Icon icon={images} size={25}></Icon>
        </div>
      </div>

      <div className='row2 row'>
        <div >Sea View</div>
        <div >Gym</div>
        <div >Wifi</div>
        <div >Room service</div>
        <div >Swimming Pool</div>
        <div >Breakfast</div>
        <div >Room service</div>
        <div >Swimming Pool</div>
        <div >Breakfast</div>
      </div>

      <div className='row3'>
        <h6>Book Now</h6>
        <div>
          <p>Adults
            <span style={{ marginLeft: '1rem' }}>
              <select style={{ width: '3rem' }}>
                <option>0</option>
                <option>1</option>
                <option>2</option>
              </select>
            </span>
          </p>

          <p>Children
            <span style={{ marginLeft: '1rem' }}>
              <select style={{ width: '3rem' }}>
                <option>0</option>
                <option>1</option>
                <option>2</option>
              </select>
            </span>
          </p>

          <p>Stay length
            <span style={{ marginLeft: '1rem' }}>
              <select style={{ width: '3rem' }}>
                <option>0</option>
                <option>1</option>
                <option>2</option>
              </select>
            </span>
          </p>
        </div>
      </div>


      <div className='row4'>
        <button onClick={() => handleBooking(2)}>RESERVE</button>
      </div>
    </div>
  )
}

export default RoomCard