import 'dotenv/config';


import express from 'express';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import connectDB from './config/db.js'
import type {Request,Response} from 'express'
import authRoutes from './routes/authRoutes.js'
import onboardingRoutes from './routes/onBoardingRoutes.js'
const  app=express();
connectDB();
console.log(connectDB());

app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true
}));
app.use(express.json())
app.use(cookieParser());

app.get('/',(req:Request,res:Response)=>{
res.send("hello")
})
app.use('/api/auth',authRoutes)
app.use('/api/onboarding', onboardingRoutes);
const PORT=process.env.PORT||3000;
app.listen(PORT,()=>{
    console.log(`Server running on ${PORT}`);
    
})

