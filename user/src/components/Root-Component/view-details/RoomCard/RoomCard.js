import React, { useEffect, useState } from 'react'
import './RoomCard.css'

import { Icon } from 'react-icons-kit'
import { images } from 'react-icons-kit/icomoon/images'
import { user } from 'react-icons-kit/icomoon/user'
import { circleLeft } from 'react-icons-kit/icomoon/circleLeft'
import { circleRight } from 'react-icons-kit/icomoon/circleRight'

import { useNavigate } from 'react-router'



const RoomCard = ({ room, cart, setCart, }) => {
  const navigate = useNavigate()

  const capacity = Number(room.adultCapacity)


  //HANDLE RESERVE BUTTON
  const handleReserve = (obj, id) => {
    // console.log(cart)
    console.log(room)
    const exixstingRoom = cart.find((item) => item.room.roomId === id)
    if (exixstingRoom) {
    
      setCart(
        cart.map((item) =>
          item.room.roomId === id ? {...item,quantity: item.quantity + 1 } : item
        )
      )
    }
    else {
      setCart([...cart, { room, quantity: 1 }])
    }
  }



  //HANDLE SLIDER
  const [current, setCurrent] = useState(0)
  const prevBtn = () => {
    setCurrent((current === room.imgUrl.length) ? (0) : (current + 1))
  }
  const nextBtn = () => {
    setCurrent((current === 0) ? (room.imgUrl.length - 1) : (current - 1))
  }
  

  return (
    <div className='RoomCard'>
      <div className='imgwrap'>
        <div className='icon1'><Icon icon={circleLeft} onClick={prevBtn} size={20} /></div>
        <img src={room.imgUrl[current]} alt='roomimage' />
        <div className='icon2'><Icon icon={circleRight} onClick={nextBtn} size={20} /></div>
      </div>

      <div style={{ padding: '1rem' }} >
        <div className='row1' >
          <div >
            <h5>{room.roomType}</h5>
            <p style={{ fontWeight: 'bold', textDecoration: 'underline' }}>{room.ratePerNight} /night</p>
            <p style={{ display: 'flex' }}>
              Occupancy:
              <span style={{ paddingLeft: '1rem', fontSize: '1.2 rem' }}>{room.adultCapacity}</span>
              <span style={{ display: 'flex', marginLeft: '0.5rem' }}>
                {
                  [...Array(capacity)].map((icon, i) => {
                    return (
                      <Icon icon={user} style={{ marginLeft: '0.2rem' }} key={i + 1} />
                    )
                  })
                }
              </span>
            </p>
          </div>

          <div className='images-icon'>
            {(room.nonRefundable === true) ? (<p style={{ color: 'green', border: '1px solid green', padding: '0rem 0.5rem' }}>Non refundable</p>) : (
              <p style={{ color: 'red', border: '1pc solid red' }}>Refundable</p>)}
            {/* <Icon icon={images} size={25} style={{ float: 'right' }}></Icon> */}
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





        {/* <div className='row3'>
        <p>Room Available
          <span>{room.availableRooms}</span>
        </p>
      </div> */}

        <div className='row4'>
          <button onClick={() => {
            handleReserve(room, room.roomId)
          }}
          >RESERVE</button>
        </div>
      </div>

    </div>
  )
}

export default RoomCard