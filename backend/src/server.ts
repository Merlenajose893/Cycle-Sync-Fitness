console.log("hello");

import 'dotenv/config';

import "reflect-metadata";
import express from 'express';
import cookieParser from 'cookie-parser';
import './container/index.js';
import cors from 'cors';
import connectDB from './config/db.js';

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

import { errorHandler } from './middlewares/errorHandler.js';

const app = express();
connectDB();
console.log(connectDB());

app.use(cors({
  origin: "http://localhost:5173",
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS", "PATCH"],
  allowedHeaders: ["Content-Type", "Authorization", "X-Requested-With"]
}));

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

app.use(errorHandler);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on ${PORT}`);
});
