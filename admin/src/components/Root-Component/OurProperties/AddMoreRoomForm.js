import './OurProperties.css'
import { AiOutlineDown, AiOutlineUp } from 'react-icons/ai'
import { RiHotelLine } from 'react-icons/ri'
import { useState, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import {
  CButton, CCol, CModal, CModalHeader,
  CModalTitle, CModalBody, CModalFooter, CFormInput, CRow,
  CFormTextarea, CFormCheck, CCard, CCardHeader, CCardBody,
  CImage, CContainer, CFormLabel
} from '@coreui/react'
import axios from 'axios'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { storage } from '../../firebase'
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage'
import swal from 'sweetalert';
import { nanoid } from 'nanoid'

const AddMoreRoomForm = ({ showRoomForm, setRoomForm, property, getPropertiesData }) => {
  // console.log(property)
  const [roomFormData, setRoomFormData] = useState({
    imgUrl: [], roomId: "",
    roomType: "", totalRooms: "", availableRooms: "",
    adultCapacity: "", childrenCapacity: "", ratePerNight: "",

    nonRefundable: false, wardrobe: false, bedsideTable: false, houseKeeping: false, balcony: false,
    breakfast: false, mosquitonet: false, Wifi: false, hotNcoldshower_24hrs: false,
    airconditioned: false, roomService: false, seaView: false, fitnessCenter: false, swimmingPool: false, spa: false
  })

  const [roomImages, setRoomImages] = useState([])

  const handleRoomForm = (params) => (e) => {
    setRoomFormData({ ...roomFormData, [params]: e.target.value })
    console.log(roomFormData.nonRefundable)
  }
  const [roomImgUrl, setRoomImgUrl] = useState(false)
  const [picURL, setPicURL] = useState("")

  const imgCloudUpload = async (e) => {
    e.preventDefault()
    if (!roomFormData.roomType) {
      return toast.error("Please fill room type !")
    }
    else if (roomImages.length == 0) {
      return toast.error("No Image Chosen !")
    }
    let arr = []
    console.log(roomImages)
    for (let i = 0; i < roomImages.length; i++) {
      const imgData = new FormData()
      imgData.append("file", roomImages[i])
      imgData.append("upload_preset", "ketanInstaClone")
      await axios.post("https://api.cloudinary.com/v1_1/ketantb/image/upload", imgData)
        .then((res) => {
          // console.log(res)
          arr.push(res.data.secure_url)
          // console.log(resortForm)
        })
        .catch((err) => {
          console.log(err)
        })
    }
    setRoomFormData({ ...roomFormData, imgUrl: arr })
    setRoomImgUrl(arr)
  }


  const saveRoom = async () => {
    if (!property) return
    roomFormData.roomId = nanoid()
    property.rooms.push(roomFormData)
    await axios.put(`http://localhost:4001/hotelbook/${property._id}`, property)
      .then((res) => {
        console.log(res)
        setRoomImgUrl(false)
        setRoomForm(false)
        swal({
          title: "Good job!",
          text: "Room added successfully!",
          icon: "success",
          button: "OK!",
        });
      })
      .catch((err) => {
        console.log(err)
      })
  }


  useEffect(() => {
    if (roomImgUrl) {
      saveRoom()
      console.log("useEffect Ran")
    }
  }, [roomImgUrl])

  return (
    <>
      <CModal
        keyboard={false}
        portal={false}
        visible={showRoomForm}
        className='booking-form-p'
        scrollable
        size='lg'
      >

        <CModalHeader onClick={() => setRoomForm(false)} >
          <ToastContainer
            autoClose={1500}
            limit={5}
            theme={"dark"}
            pauseOnFocusLoss={false}
            position={"top-center"}
          />
          <CModalTitle><h4>Room Info</h4></CModalTitle>
        </CModalHeader>
        <CModalBody >
          <CRow className='py-4'>
            <CCol className='mt-3 p-0'>
              <CImage className='p-0 m-0' width={300} height={200} />
            </CCol>
          </CRow>
          <CRow>
            <CCol lg={6}>
              <CFormInput type='file' accept="image/*" multiple="multiple" label='Upload Room Images' onChange={(e) => setRoomImages(e.target.files)} />
            </CCol>
            <CCol className='mt-3' lg={6}>
              <CFormInput label='Room Type' onChange={handleRoomForm('roomType')} type='text' />
            </CCol>
          </CRow>

          <CRow>
            <CCol className='mt-3' lg={6}>
              <CFormInput label='Total Rooms' type='number' onChange={handleRoomForm('totalRooms')} />
            </CCol>
            <CCol className='mt-3' lg={6}>
              <CFormInput label='Available Rooms' type='number' onChange={handleRoomForm('availableRooms')} />
            </CCol>
          </CRow>

          <CRow>
            <CCol className='mt-3' lg={6}>
              <CFormInput label='Adult Capacity' type='number' onChange={handleRoomForm('adultCapacity')} />
            </CCol>
            <CCol className='mt-3' lg={6}>
              <CFormInput label='Children Capacity' type='number' onChange={handleRoomForm('childrenCapacity')} />
            </CCol>
          </CRow>

          <CRow>
            <CCol className='mt-3' lg={6}>
              <CFormInput label='Room Per Night Charge' type='number' onChange={handleRoomForm('ratePerNight')} />
            </CCol>
          </CRow>



          <CCard className='mx-2 mt-4'>
            <CCardHeader className='text-center'>
              <h4>Room Facility</h4>
            </CCardHeader>
            <CCardBody className='p-4'>



              <CRow className='text-start aminitiesFonts'>
                <CCol className='mt-2' >
                  <CFormCheck type='checkbox' label='Non Refundable'
                    checked={roomFormData.nonRefundable} onChange={(e) => setRoomFormData({ ...roomFormData, nonRefundable: e.target.checked })} />
                </CCol>
                <CCol className='mt-2' >
                  <CFormCheck type='checkbox' label='Wardrobe'
                    checked={roomFormData.wardrobe} onChange={(e) => setRoomFormData({ ...roomFormData, wardrobe: e.target.checked })} />
                </CCol>
              </CRow>

              <CRow className='text-start aminitiesFonts'>
                <CCol className='mt-2' >
                  <CFormCheck type='checkbox' label='Bedside Table'
                    checked={roomFormData.bedsideTable} onChange={(e) => setRoomFormData({ ...roomFormData, bedsideTable: e.target.checked })} />
                </CCol>
                <CCol className='mt-2' >
                  <CFormCheck type='checkbox' label='Breakfast'
                    checked={roomFormData.breakfast} onChange={(e) => setRoomFormData({ ...roomFormData, breakfast: e.target.checked })} />
                </CCol>
              </CRow >

              <CRow className='text-start aminitiesFonts'>
                <CCol className='mt-2' >
                  <CFormCheck type='checkbox' label='Balcony'
                    checked={roomFormData.balcony} onChange={(e) => setRoomFormData({ ...roomFormData, balcony: e.target.checked })} />
                </CCol>
                <CCol className='mt-2' >
                  <CFormCheck type='checkbox' label='House Keeping'
                    checked={roomFormData.houseKeeping} onChange={(e) => setRoomFormData({ ...roomFormData, houseKeeping: e.target.checked })} />
                </CCol>
              </CRow>

              <CRow className='text-start aminitiesFonts'>
                <CCol className='mt-2' >
                  <CFormCheck type='checkbox' label='Mosquito Net'
                    checked={roomFormData.mosquitonet} onChange={(e) => setRoomFormData({ ...roomFormData, mosquitonet: e.target.checked })} />
                </CCol>
                <CCol className='mt-2' >
                  <CFormCheck type='checkbox' label='24hr hot & cold shower'
                    checked={roomFormData.hotNcoldshower_24hrs} onChange={(e) => setRoomFormData({ ...roomFormData, hotNcoldshower_24hrs: e.target.checked })} />
                </CCol>
              </CRow>
              <CRow className='text-start aminitiesFonts' >
                <CCol className='mt-2' >
                  <CFormCheck type='checkbox' label='WiFi'
                    checked={roomFormData.Wifi} onChange={(e) => setRoomFormData({ ...roomFormData, Wifi: e.target.checked })} />
                </CCol>
                <CCol className='mt-2' >
                  <CFormCheck type='checkbox' label='Air-Conditioned'
                    checked={roomFormData.airconditioned} onChange={(e) => setRoomFormData({ ...roomFormData, airconditioned: e.target.checked })} />
                </CCol>
              </CRow>
              <CRow className='text-start aminitiesFonts' >
                <CCol className='mt-2' >
                  <CFormCheck type='checkbox' label='Sea View'
                    checked={roomFormData.seaView} onChange={(e) => setRoomFormData({ ...roomFormData, seaView: e.target.checked })} />
                </CCol>
                <CCol className='mt-2' >
                  <CFormCheck type='checkbox' label='Fitness Center'
                    checked={roomFormData.fitnessCenter} onChange={(e) => setRoomFormData({ ...roomFormData, fitnessCenter: e.target.checked })} />
                </CCol>
              </CRow>
              <CRow className='text-start aminitiesFonts' >
                <CCol className='mt-2' >
                  <CFormCheck type='checkbox' label='Swimmimg Pool'
                    checked={roomFormData.swimmingPool} onChange={(e) => setRoomFormData({ ...roomFormData, swimmingPool: e.target.checked })} />
                </CCol>
                <CCol className='mt-2' >
                  <CFormCheck type='checkbox' label='Spa'
                    checked={roomFormData.spa} onChange={(e) => setRoomFormData({ ...roomFormData, spa: e.target.checked })} />
                </CCol>
              </CRow>


            </CCardBody>
          </CCard>



          {/* <div className="mb-4" style={{ textAlign: 'center' }}>
            <CImage className='p-0 m-0' width={300} height={200}/>
          </div>
          <div className="mb-4">
            <CFormInput type="file" id="formFile" label="Upload room images" />
          </div>
          <div className="mb-4">
            <CFormInput label="Resort Name" maxLength={30} onChange={() => {}} />
          </div>
          <div className="mb-4">
            <CFormInput type="text" size="sm" maxLength={30} label="Location" onChange={() => {}} />
          </div>
          <div>
            <CFormTextarea label="Resort Info" maxLength={75} onChange={() => {}} />
          </div> */}





        </CModalBody>

        <CModalFooter>
          <CButton color="primary" onClick={imgCloudUpload}>Save Room</CButton>
        </CModalFooter>
      </CModal>
      {/* {console.log(roomFormData)} */}
      {/* {console.log(roomImgUrl)} */}
      {/* {console.log(roomImages)} */}
    </>
  )
}

export default AddMoreRoomForm

