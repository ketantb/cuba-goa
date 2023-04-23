
require("dotenv").config();

const express = require("express");
const router = express.Router();
const Razorpay = require("razorpay");
const HotelBook = require("../models/post-property");
const cartModel = require("../models/cart");
const adminMiddleware = require('../middleware/admin')

const secretKey = process.env.RAZOR_SECRET;
const keyId = process.env.RAZOR_KEYID;

const instance = new Razorpay({
  key_id: keyId,
  key_secret: secretKey,
});




router.post("/hotelbook", async (req, res) => {
  try {
    const resortData = await HotelBook.create(req.body);
    res.json({ success: true, data: resortData });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: error.message });
  }
});

//GET DATA OF SPECIFIC OWNER (login required)
router.get('/my-resorts',adminMiddleware,(req,resp)=>{

})



//GET ALL HOTEL DATA TO SHOW TO CLIENTS
router.get("/hotelbook", async (req, res) => {
  try {
    const hotelBook = await HotelBook.find({});
    res.status(200).json(hotelBook);
  } catch (error) {
    res.status(5009).json({ message: error.message });
  }
});



//GET SPECIFIC HOTEL BY ID
router.get("/resort-details/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const resortData = await HotelBook.find({_id:id});
    res.json({success:true,resortData:resortData});
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});



//to update hotelBook by id
router.put("/hotelbook/:id", async (req, res) => {
  // console.log(req.params.id)
  // res.json({message: req.body})
  try {
    const { id } = req.params;
    const hotelBook = await HotelBook.findByIdAndUpdate(id, {rooms: req.body.rooms});
    //we cannot find any product in database
    if (!hotelBook) {
      return res
        .status(404)
        .json({ message: `cannot find any hotel Book with ${id}` });
    }
    const updatedHotelBook = await HotelBook.findById(id);
    res.status(200).json(updatedHotelBook);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});


// delete a hotel Book
router.delete("/hotelbook/:id", async (req, res) => {
  try {
    const { id } = req.params.id;
    const hotelBook = await HotelBook.findByIdAndDelete(id, req.body);
    //we cannot find any product in database
    if (!hotelBook) {
      return res
        .status(404)
        .json({ message: `cannot find any hotel Book with ${id}` });
    }

    res.status(200).json(hotelBook);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});



module.exports = router;
