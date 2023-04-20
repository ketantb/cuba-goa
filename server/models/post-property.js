const mongoose = require("mongoose");

const PostPropertySchema = mongoose.Schema({

    resortName: {
        type: String,
    },
    resortLocation: {
        type: String,
    },
    resortDescription: {
        type: String,
    },
    resortImgURL:{
      type:String
    },
    rooms: [
        {
            imgurl: [
                { type: String },
            ],
            roomType: {
                type: String
            },
            totalRooms: {
                type: Number
            },
            availableroom: {
                type: Number
            },
            ratePerNight: {
                type: Number,
            },
            aminities: [

            ],



            //aminities
            breakfast: {
                type: Boolean
            },
            mosquitonet: {
                type: Boolean,
            },
            Wifi: {
                type: Boolean,
            },
            coldshower_24hrs: {
                type: Boolean,
            },
            airconditioned: {
                type: Boolean,
            },
            roomService: {
                type: Boolean,
            },
            seaView: {
                type: Boolean
            },
            swimmingPool: {
                type: Boolean
            },
            kitchenFacilities: {
                type: Boolean
            },
            spa: {
                type: Boolean
            }
        },
    ],
});

const PostProperty = mongoose.model("PostProperty", PostPropertySchema);

module.exports = PostProperty;