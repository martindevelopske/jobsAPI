const mongoose=require('mongoose')
const jobSchema=new mongoose.Schema({
    company:{
        type:String,
        required:[true,'please provide a company name'],
        maxlength:50
    },
    position:{
        type:String,
        required:[true,'please provide a position'],
        maxlength:50
    },
    status:{
        type:String,
        enum:["interview",'declined','pending'],
        default:'pending'
    },
    createdBy:{
        type:mongoose.Types.ObjectId,
        ref:'User',
        required:[true,'please provide a user']
    }
},{timestamps:true})

const jobModel=mongoose.model("Job",jobSchema)
module.exports=jobModel