import './OurProperties.css'
import React, { useState, useEffect } from 'react'
import PropertyList from './PropertyList'
import axios from 'axios'
import Pagination from './Pagination'



const Footer = React.lazy(() => import('../Footer/Footer'))


const OurProperties = () => {
  const [allProperties, setAllProperties] = useState("")
  const [showRoomForm, setRoomForm] = useState(false)


  //Pagination
  const [currentPage, setCurrentPage] = useState(1)
  const [postPerPage, setPostPerPage] = useState(8)
  const lastPostIndex = currentPage * postPerPage
  const firstPostIndex = lastPostIndex - postPerPage
  const currentList = allProperties.slice(firstPostIndex, lastPostIndex)

  const getPropertiesData = async () => {
    // await axios(`https://cubagoa-server.onrender.com/hotelbook`)
    await axios(`http://localhost:4001/hotelbook`)
      .then((res) => {
        console.log('property list',res.data)
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
      <main className='our-properties-main'>
        <div className='quba-goa-search'>
          <div className='banner'>
            <h2>The Cuba Goa Properties</h2>
            <h6 style={{ margin: '20px 0' }}>BEACH HUTS, BUNGALOWS & RESORTS</h6>
          </div>
          <div className='properties-to-book'>
            {/* filter section do at veyr last */}
          </div>
          <PropertyList currentList={currentList} />
          <Pagination totalPosts={allProperties.length} postPerPage={postPerPage} setCurrentPage={setCurrentPage} />
        </div>
      </main >
      <Footer />
    </>
  )
}

export default OurProperties