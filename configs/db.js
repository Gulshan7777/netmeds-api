const mongoose = require('mongoose');
require("dotenv").config();

const URL=process.env.MONGO_URL;
mongoose.set("strictQuery",true);
const connection = mongoose.connect(URL);

module.exports=connection