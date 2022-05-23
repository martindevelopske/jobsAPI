const jobModel=require('../models/jobModel')
const {StatusCodes}=require('http-status-codes')
const { NotFoundError, BadRequestError } = require('../errors')

const getAllJobs=async (req,res)=>{
    const allJobs=await jobModel.find({createdBy:req.user.userId}).sort('createdAt')
    res.status(StatusCodes.OK).json({allJobs,nbHits:allJobs.length})
}
const getJob=async(req,res)=>{
    const {
        user:{userId},
        params:{id:jobId}
    }=req

    const specificJob=await jobModel.findOne({
        _id:jobId,
        createdBy:userId
    })
    if(!specificJob){
        throw new NotFoundError('job not found')
    }
    res.status(StatusCodes.OK).json({specificJob})

   
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
        throw new NotFoundError('job not found')
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
        throw new BadRequestError('please provide the details')
    }
    
        const jobForUpdate=await jobModel.findByIdAndUpdate({_id:jobId,createdBy:userId},req.body,{new:true,runValidators:true})
    
        if(!jobForUpdate){
            throw new NotFoundError('job not found')
        }
        res.status(StatusCodes.OK).send({jobForUpdate})
   
    
}

module.exports={
    getAllJobs,
    getJob,
    createJob,
    deleteJob,
    updateJob
}