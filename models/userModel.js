const mongoose=require('mongoose')
const bcrypt=require('bcryptjs')
const jwt=require('json-web-token')
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
    const payLoad={
        name:this.name,
        userId:this._id
    }
    const secret=process.env.JWT_SECRET

    const token= jwt.encode(secret,payLoad,function(err,token){
        if(err){
            console.log(err);
        }else{
            console.log(token);
            return token
        }
        
    })
        return token
        
}

const UserModel=mongoose.model('User',UserSchema)

module.exports=UserModel