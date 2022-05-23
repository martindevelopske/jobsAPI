const jobModel=require('../models/jobModel')
const {StatusCodes}=require('http-status-codes')

const getAllJobs=async (req,res)=>{
    const allJobs=await jobModel.find({createdBy:req.user.userId}).sort('createdAt')
    res.status(StatusCodes.OK).json({allJobs,nbHits:allJobs.length})
}
const getJob=async(req,res)=>{
    const {
        user:{userId},
        params:{id:jobId}
    }=req
try{
    const specificJob=await jobModel.findOne({
        _id:jobId,
        createdBy:userId
    })
    if(!specificJob){
        console.log('no job with that id');
    }
    res.status(StatusCodes.OK).json({specificJob})
}catch(e){
    console.log(e.message);
}
   
}
const createJob=async(req,res)=>{
    req.body.createdBy=req.user.userId
    const job=await jobModel.create({...req.body})
    res.status(StatusCodes.CREATED).json(job)
}
const deleteJob=async(req,res)=>{
    const {user:{userId},params:{id:jobId}}=req
    const jobToDelete=await jobModel.findByIdAndRemove({
        _id:jobId,
        createdBy:userId
    })
    if(!jobToDelete){
        console.log('not available');
    }
    res.status(StatusCodes.OK).json({msg:"deleted"})
}
const updateJob= async (req,res)=>{
    const {
        body:{company,position},
        user:{userId},
        params:{ id:jobId}
    }=req
    if(company===''||position===''){
        console.log('cannot be empty');
    }
    try{
        const jobForUpdate=await jobModel.findByIdAndUpdate({_id:jobId,createdBy:userId},req.body,{new:true,runValidators:true})
    
        if(!jobForUpdate){
            console.log("unavailable");
        }
        res.status(StatusCodes.OK).send({jobForUpdate})
    }catch(e){
        console.log(e.message);
    }
    
}

module.exports={
    getAllJobs,
    getJob,
    createJob,
    deleteJob,
    updateJob
}