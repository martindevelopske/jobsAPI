const getAllJobs=async (req,res)=>{
    res.send('all jobs')
}
const getJob=async(req,res)=>{
    res.send('get job')
}
const createJob=async(req,res)=>{
    res.send('job created')
}
const deleteJob=async(req,res)=>{
    res.send('job deleted')
}
const updateJob= async (req,res)=>{
    res.send('job updated')
}

module.exports={
    getAllJobs,
    getJob,
    createJob,
    deleteJob,
    updateJob
}