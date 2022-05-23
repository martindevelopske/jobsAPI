const User=require('../models/userModel')
const jwt=require('jsonwebtoken')

const auth=(req,res,next)=>{
//check header
const authHeader=req.headers.authorization
if(!authHeader || !authHeader.startsWith('Bearer ')){
    console.log('authentication invalid');
}
const token =authHeader.split(' ')[1]
try{
    const payLoad=jwt.verify(token,process.env.JWT_SECRET)
    //attach user to the job routes
    req.user={userId:payLoad.userId,name:payLoad.name}
    next()
}catch(e){
    console.log(e.message);
}
}
module.exports=auth;