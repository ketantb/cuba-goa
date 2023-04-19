const express = require("express");
const mongoose = require("mongoose");
const bodyparser = require("body-parser");
const cookieParser = require("cookie-parser");
require("dotenv").config();
var cors = require("cors");
const port =  process.env.PORT || 4001

// const bcrypt = require('bcrypt');
// const jwt = require('jsonwebtoken');

const app = express();
app.use(bodyparser.urlencoded({ extended: false }));
app.use(express.json());
app.use(cookieParser());
app.use(cors());

// rotes//
// const user = require("./router/userRouter");
// const booking = require("./router/bookingRouter");
// const spa = require("./router/spaRouter");

// app.use("/", user);
// app.use("/", booking);
// app.use("/", spa);

app.use(require('./router/adminRouter'))
app.use(require('./router/post-property'))
app.use(require('./router/spaRouter'))

app.get("/", (req, res) => {
  try{
    res.send("Welome to Cuba Goa!")
  }
  catch(err){
    res.send(err)
    console.log(err)
  }
})

mongoose.set("strictQuery", false);
mongoose
  .connect(process.env.MONGO_URL)
  .then(() => {
    console.log("connected to MongoDB");
    app.listen(port, () => {
      console.log(`Node api is running on port ${port}`);
    });
  })
  .catch((error) => {
    console.log(error);
  });
