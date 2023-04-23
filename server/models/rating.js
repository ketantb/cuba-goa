const mongoose=require('mongoose')

const RatingSchema=new mongoose.Schema({
    name:String,
    email:String,
    platform:String,
    additionalComments:String,
    rating:Number
})


const RatingModel= mongoose.model('raitng', RatingSchema)
module.exports=RatingModel