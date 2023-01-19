const express= require('express');
const connection = require('./configs/db');
const productRoute = require('./routes/products.routes');
const userRouter = require('./routes/user.routes');
require("dotenv").config();
const app = express();
app.use(express.json());

app.use("/user",userRouter)
app.use('/products',productRoute)

const PORT = process.env.PORT||3000;
connection
.then(()=>{
    console.log("connected to db")
    app.listen(PORT,()=>{
        console.log(`started at ${PORT}`)
    })
})
.catch(()=>{
    console.log("connection failed");
})