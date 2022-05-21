const login=async(req,res)=>{
    res.json({msg:"user login"})
}

const register=async (req,res)=>{
    res.json({msg:'user created'})
}

module.exports={
    login,
    register
}