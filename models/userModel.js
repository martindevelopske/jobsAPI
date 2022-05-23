const mongoose=require('mongoose')
const bcrypt=require('bcryptjs')
const jwt=require('jsonwebtoken')
require('dotenv').config()

const UserSchema= new mongoose.Schema({
    name:{
        type:String,
        required:[true,'name must be provided'],
        minlength:3,
        maxlength:50
    },
    email:{
        type:String,
        required:[true,'email must be provided'],
        minlength:10,
        maxlength:50,
        unique:true
        //match email
    },
    password:{
        type:String,
        required:[true,'please provide a password'],
        minlength:6
    }
})
//in the latest version there is no need for the next()
UserSchema.pre('save',async function(){
    const salt =await bcrypt.genSalt(10)
    this.password=await bcrypt.hash(this.password, salt)
    
})
//methods
UserSchema.methods.getName=function(){
    return this.name
}
UserSchema.methods.createJwt=function(){
    //jwt
  return jwt.sign({userId:this.id,name:this.name},process.env.JWT_SECRET,{
      expiresIn:'30d'
  })
        
}
UserSchema.methods.comparePasswords=async function (candidatePassword){
    const isMatch= await bcrypt.compare(candidatePassword,this.password)
    return isMatch
}
const UserModel=mongoose.model('User',UserSchema)

module.exports=UserModel