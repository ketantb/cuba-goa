const mongoose = require("mongoose");

const PostPropertySchema = mongoose.Schema({
  resortImage:
    { type: String }
  ,
  resortName: {
    type: String,
  },
  location: {
    type: String,
  },
  description: {
    type: String,
  }
});

const PostProperty = mongoose.model("PostProperty", PostPropertySchema);

module.exports = PostProperty;
