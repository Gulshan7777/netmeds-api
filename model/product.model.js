const mongoose = require('mongoose');

const productSchema=mongoose.Schema({
    title:String,
    img1:String,
    img2:String,
    img3:String,
    actual_price:Number,
    crossed_price:Number,
    manufacturer:String,
    country:String,
    category:String,
    sub_category:String,
})

const ProductModel=mongoose.model("products",productSchema);

module.exports=ProductModel