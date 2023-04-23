import React, { useEffect, useState } from 'react'
import './ViewDetails.css'
import { useParams } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import axios from 'axios';
import Images from './Images';

const ViewDetails = () => {
  const navigate = useNavigate()

  const [resort, setResort] = useState([])
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
          <div className='col2 room-filter'>
            <select>
              <option>ROOM TYPE</option>
            </select>
          </div>
        </div>
      </div>


      {/* section3 */}
      <Images />
      {/* section3 ends*/}


      <div className='section4'>
        <div className='col'></div>
        <div className='col2'></div>
      </div>


    </div>
  )
}

export default ViewDetails