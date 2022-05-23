require('dotenv').config()
const express=require('express')
const app=express()
const connectDB=require('./db/connect')
const authRouter=require('./routes/auth')
const jobsRouter=require('./routes/job')
const bodyParser=require('body-parser')
const authenticateUser=require('./middleware/authentication')
//port 
const port=process.env.PORT || 4000

app.use(bodyParser.json())
app.use('/api/v1/auth',authRouter)
app.use('/api/v1/jobs',authenticateUser,jobsRouter)
// start app

const start=async()=>{
    await connectDB(process.env.MONGO_URI)
    console.log('connected to the database');
    app
    .listen(port,()=>{console.log(`server is listening on ${port} `)})
}
start()
   
