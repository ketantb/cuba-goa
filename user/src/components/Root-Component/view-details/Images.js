import React, { useState } from 'react'
import './Images.css'
import { Icon } from 'react-icons-kit'
import {circleRight} from 'react-icons-kit/icomoon/circleRight'
import { circleLeft } from 'react-icons-kit/icomoon/circleLeft'


import r1 from '../../../assets/r1.jpg'
import r2 from '../../../assets/r2.jpg'
import r3 from '../../../assets/r3.jpg'
import r4 from '../../../assets/r4.jpg'
import r5 from '../../../assets/r5.jpg'
import r6 from '../../../assets/r6.jpg'
import r7 from '../../../assets/r7.jpg'

const array = [r1, r2, r3, r4, r5, r6, r7]

const Images = () => {


  // MOBILE VIEW SOLDER
  const [current, setCurrent] = useState(0)
  const nextBtn = () => {
    setCurrent((current === array.length - 1) ? (0) : (current + 1))
  }
  const prevBtn = () => {
    setCurrent((current === 0) ? (array.length - 1) : (current - 1))
  }
  // MOBILE VIEW SOLDER ENDS

  return (
    <div className='ImagesWrapper'>
      <div className='desktop-view'>
        <div className='row1'>
          <div className='col1'>
            <div className='col1-row1'>col1 row1</div>
            <div className='col1-row2'>col1 row2</div>
          </div>
          <div className='col2'>
          </div>
        </div>

        <div className='row2'>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
        </div>
      </div>



      {/* mobile view */}
      <div className='mobile-view'>
        <div>
          <div onClick={prevBtn}><Icon icon={circleLeft}></Icon></div>
          <div><img src={array[current]} alt='' /></div>
          <div onClick={nextBtn}><Icon icon={circleRight}></Icon></div>
        </div>
      </div>
    </div>

  )
}

export default Images