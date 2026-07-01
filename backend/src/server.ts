import 'dotenv/config';
import "reflect-metadata";
import express from 'express';
import cookieParser from 'cookie-parser';
import './container/index.js'
import cors from 'cors';
import connectDB from './config/db.js'
import type {Request,Response} from 'express'
import userAuthRoutes from './routes/userAuth.routes.js'
import trainerRoutes from './routes/trainerAuth.routes.js'
<<<<<<< HEAD
import onboardingRoutes from './routes/onboardingRoutes.js'
import adminRoutes from './routes/adminAuthRoutes.js'
=======
>>>>>>> 081b12d (changes)
const  app=express();
connectDB();
console.log(connectDB());

app.use(cors({
  origin: "http://localhost:5173",     // ← Use exact origin
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization", "X-Requested-With"]
}));


// Optional: Explicitly handle preflight requests

app.use(express.json())
app.use(cookieParser());
app.use((req, res, next) => {
  console.log(`[${req.method}] ${req.path} | Origin: ${req.headers.origin}`);
  next();
});

app.use('/api/users',userAuthRoutes)
app.use('/api/trainer',trainerRoutes)
<<<<<<< HEAD
app.use("/api/onboarding", onboardingRoutes);
app.use("/api/admin", adminRoutes);
=======
>>>>>>> 081b12d (changes)
// app.use('/api/onboarding', onboardingRoutes);
const PORT=process.env.PORT||3000;
app.listen(PORT,()=>{
    console.log(`Server running on ${PORT}`);
    
})

