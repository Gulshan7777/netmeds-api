const { getSingleUser, getAllUser, registerUser, loginUser } = require('../controllers/user.controller');

const userRouter=require('express').Router();


userRouter.get("/",getAllUser)
userRouter.get("/:id",getSingleUser);

userRouter.post("/signup",registerUser);
userRouter.post("/login",loginUser);

module.exports=userRouter