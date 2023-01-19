const mongoose = require('mongoose');

const userSchema=mongoose.Schema({
    email:{type:String,require:true},
    phone:{type:Number,require:true},
    password:{type:String,require:true},
    username:{type:String,require:true},
    age:{type:Number,require:true},
})

const UserModel=mongoose.model("users",userSchema);

module.exports=UserModel