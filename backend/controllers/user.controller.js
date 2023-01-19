const UserModel = require("../model/user.model")
const bcrypt = require('bcryptjs');
const jwt = require("jsonwebtoken")
const JWT=process.env.JWT_SECRET;

const getAllUser = async(req,res)=>{
    try {
        const users =await UserModel.find();
        return res.status(200).send({
            status:"success",
            data:users
        })
    } catch (err) {
        return res.status(500).send({
            status:"error",
            msg:"Internal Server Error"
        })
    }
}
const getSingleUser = async(req,res)=>{
    try {
        const {id}=req.params;
        const user =await UserModel.find({_id:id});
        return res.status(200).send({
            status:"success",
            data:user
        })
    } catch (err) {
        return res.status(500).send({
            status:"error",
            msg:"Internal Server Error"
        })
    }
}

const registerUser = async(req,res)=>{
    try {
        const {email,password,age,phone}=req.body;
        const existingUser =await UserModel.findOne({email});
        if(existingUser){
            return res.status(400).send({
                status:"error",
                msg:"User already exist"
            })
        }
        const hashed = bcrypt.hashSync(password);
        const newUser= new UserModel({
            email,password:hashed,age,phone
        })
        await newUser.save();
        let secure = newUser.toJSON();
        delete secure.password;
        return res.status(200).send({
            status:"success",
            data:secure
        })
    } catch (err) {
        return res.status(500).send({
            status:"error",
            msg:"Internal Server Error"
        })
    }
}
const loginUser = async(req,res)=>{
    try {
        const {email,password}=req.body;
        const existingUser =await UserModel.findOne({email});
        if(!existingUser){
            return res.status(400).send({
                status:"error",
                msg:"user doesn't exist"
            })
        }
        const match = bcrypt.compareSync(password,existingUser.password);
        console.log(match);
        if(!match){
            return res.status(400).send({
                status:"error",
                msg:"password wrong"
            })
        }
        const token = jwt.sign({_id:existingUser._id},JWT)
        return res.status(200).send({
            status:"success",
            token
        })
    } catch (err) {
        return res.status(500).send({
            status:"error",
            msg:"Internal Server Error"
        })
    }
}

module.exports={
    getAllUser,getSingleUser,registerUser,loginUser
}