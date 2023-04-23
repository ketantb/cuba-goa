const router = require('express').Router()
const RatingModel = require('../models/rating')
const PropertyModel = require('../models/post-property')


router.put("/hotelbook/:id", async (req, res) => {
    // console.log(req.params.id)
    // res.json({message: req.body})
    try {
        const { id } = req.params;
        const hotelBook = await PropertyModel.findByIdAndUpdate(id, { rating: req.body.rating });
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

module.exports=router