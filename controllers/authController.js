const UserModel=require('../models/userModel')
const {StatusCodes}=require('http-status-codes')
const bcrypt=require('bcryptjs')
const { UnauthenticatedError, BadRequestError } = require('../errors')


const login=async(req,res)=>{
    const {email,password}=req.body
    
    if(!email || !password){
        throw new BadRequestError('please provide an email and a password')
    }
    const user=await UserModel.findOne({email})
    if(!user){
        throw new UnauthenticatedError('invalid credentials')
    }
    //compare passwords
    const isPasswordCorrect= await user.comparePasswords(password)
    if(!isPasswordCorrect){
        throw new UnauthenticatedError('invalid credentials')
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