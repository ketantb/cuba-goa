const mongoose=require('mongoose')


const bookingformSchema=new mongoose.Schema({
    name:String,
    email:String,
    contact:String,
    checkindate:String,
    checkoutDate:String,
    client:mongoose.Schema.Types.ObjectId
})
