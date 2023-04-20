
require("dotenv").config();

const express = require("express");
const router = express.Router();
const multer = require('multer')
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




router.post("/hotelbook", adminMiddleware, async (req, res) => {
  try {
    const resortData = await HotelBook.create(req.body);
    res.json({ success: true, data: resortData });
  } 
  catch (error) {
    const hotelBook = await HotelBook.create(req.body);
    res.status(200).json(hotelBook);
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: error.message });
  }
});


//GET ALL HOTEL DATA TO SHOW TO CLIENTS
router.get("/hotelbook", async (req, res) => {
  try {
    const hotelBook = await HotelBook.find({});
    res.status(200).json(hotelBook);
  } catch (error) {
    res.status(5009).json({ message: error.message });
  }
});

//to  get   hotel Book by id
router.get("/hotelBook/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const hotelBook = await HotelBook.findById(id);
    res.status(200).json(hotelBook);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

//to update hotelBook by id
router.put("/hotelbook/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const hotelBook = await HotelBook.findByIdAndUpdate(id, req.body);
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
    const { id } = req.params;
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
