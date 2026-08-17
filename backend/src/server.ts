
import 'dotenv/config';

import "reflect-metadata";
import http from "http"
import express from 'express';
import {Server} from "socket.io";
import { registervideoCallSocket } from './sockets/videoCallSocket.js';
import { addUserSocket,removeUserSocket } from './sockets/socketRegistry.js';
import cookieParser from 'cookie-parser';
import './container/index.js';
import cors from 'cors';
import connectDB from './config/db.js';
import type { IAssignmentExpiryScheduler } from './interfaces/jobs/IAssignmentExpiryScheduler.js';
import userAuthRoutes from './routes/userAuth.routes.js';
import trainerRoutes from './routes/trainerAuth.routes.js';
import onboardingRoutes from './routes/onBoardingRoutes.js';
import adminRoutes from './routes/adminAuthRoutes.js';
import userProfileRoutes from './routes/userProfileRoutes.js';
import aiPlanRoutes from './routes/aiPlan.routes.js';
import mealLogRoutes from './routes/meal.log.routes.js';
import recipeRoutes from './routes/recipe.routes.js';
import workoutProgramRoutes from './routes/workoutProgram.routes.js';
import workoutLogRoutes from './routes/workoutLog.routes.js';
import trainerPackageRoutes from './routes/trainerPackage.routes.js';
import paymentRoutes from './routes/paymentRoutes.js';
import trainerBrowseRoutes from './routes/trainerbrowse.routes.js';
import trainerAssignmentRoutes from './routes/trainerassignment.routes.js';
import healthTrackingRoutes from './routes/healthTrackingRoutes.js';

import { errorHandler } from './middlewares/errorHandler.js';
import { container } from './container/index.js';
import { TOKENS } from './container/tokens.js';
import { socketAuth } from './middlewares/socketAuth.js';

const app = express();
const server=http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: process.env.FRONTEND_URL || "http://localhost:5173",
    credentials: true,
    methods: ["GET", "POST"]
  }
});
io.use(socketAuth);

io.on("connection",(socket)=>{
  const userId=socket.data.user?.userId;
  console.log(socket.data.user);
  
  addUserSocket(userId,socket.id)
  console.log(`User ${userId} connected with socket ${socket.id}`);
  
  console.log(socket.id);
  registervideoCallSocket(io,socket)
  socket.on("disconnect",()=>{
    removeUserSocket(userId);
    console.log(`User ${userId} disconnected`);
    
    console.log("Socket disconnected",socket.id);
    
  })
  
})
connectDB();
console.log(connectDB());

app.use(cors({
  origin: "http://localhost:5173",
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS", "PATCH"],
  allowedHeaders: ["Content-Type", "Authorization", "X-Requested-With"]
}));

const PORT = process.env.PORT || 3000;
app.use(express.json());
app.use(cookieParser());
app.use((req, res, next) => {
  console.log(`[${req.method}] ${req.path} | Origin: ${req.headers.origin}`);
  next();
});

app.use('/api/users', userAuthRoutes);
app.use('/api/trainer', trainerRoutes);
app.use("/api/onboarding", onboardingRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/users", userProfileRoutes);

app.use("/api/ai-plans", aiPlanRoutes);
app.use("/api/meals", mealLogRoutes);
app.use("/api/recipes", recipeRoutes);
app.use("/api/workout-programs", workoutProgramRoutes);
app.use("/api/workout-logs", workoutLogRoutes);
app.use("/api/trainer-packages",trainerPackageRoutes);
app.use("/api/payment",paymentRoutes);
app.use("/api/trainers",trainerBrowseRoutes);
app.use("/api/trainer-assignments",trainerAssignmentRoutes);
app.use("/api/health", healthTrackingRoutes);


app.use(errorHandler);

async function startServer() {
  try {
    await connectDB();
    const assignmentExpiry=container.resolve<IAssignmentExpiryScheduler>(TOKENS.IAssignmentExpiryScheduler);
    assignmentExpiry.start();
    console.log("Assignment expiry started");
    server.listen(PORT, () => {
  console.log(`Server running on ${PORT}`);
});
    
  } catch (error) {
    console.error(error);
    process.exit(1)
    
  }
}
startServer();


