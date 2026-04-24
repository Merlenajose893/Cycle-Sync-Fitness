import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import cors from 'cors';
import connectDB from './config/db.js'
import type {Request,Response} from 'express'
import authRoutes from './routes/authRoutes.js'
const  app=express();
connectDB();
console.log(connectDB());

app.use(cors())
app.use(express.json())

app.get('/',(req:Request,res:Response)=>{
res.send("hello")
})
app.use('/api/auth',authRoutes)
const PORT=process.env.PORT||3000;
app.listen(PORT,()=>{
    console.log(`Server running on ${PORT}`);
    
})

