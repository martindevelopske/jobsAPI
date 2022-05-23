const UserModel=require('../models/userModel')
const {StatusCodes}=require('http-status-codes')
const bcrypt=require('bcryptjs')


const login=async(req,res)=>{
    const {email,password}=req.body
    
    if(!email || !password){
        console.log('please provide email and password.');
    }
    const user=await UserModel.findOne({email})
    if(!user){
        console.log('unauthenticated user');
    }
    //compare passwords
    const isPasswordCorrect= await user.comparePasswords(password)
    if(!isPasswordCorrect){
        console.log('incorrect password');
    }

    const token=user.createJwt()
    res.status(StatusCodes.OK).json({user:{name:user.name},token})
}

const register=async (req,res)=>{
    const user= await UserModel.create({...req.body})
    const Token=user.createJwt();
        res
              .status(StatusCodes.CREATED)
              .json({user:{name:user.name},Token})
    
    
    
}

module.exports={
    login,
    register
}