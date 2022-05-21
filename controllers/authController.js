const UserModel=require('../models/userModel')
const {StatusCodes}=require('http-status-codes')
const bcrypt=require('bcryptjs')


const login=async(req,res)=>{
    res.json({msg:"user login"})
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