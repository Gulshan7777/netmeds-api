const jwt = require("jsonwebtoken");

const JWT = process.env.JWT_SECRET;

const verifyLogin=(req,res,next)=>{
    const Token = req.headers.authorization;
    console.log(Token)
    if(Token){
        jwt.verify(Token,JWT,(err,data)=>{
            if(err){
                res.status(400).send({
                    status:'error',
                    msg:'Please login first'
                })
            }else{
                next();
                console.log(data);
            }
        })
    }else{
        res.status(400).send({
            status:'error',
            msg:'Please login first'
        })
    }
}
module.exports=verifyLogin