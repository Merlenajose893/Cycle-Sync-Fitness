
import 'dotenv/config';

import "reflect-metadata";
import express from 'express';
import cookieParser from 'cookie-parser';
import './container/index.ts';
import cors from 'cors';
import connectDB from './config/db.ts';
import type { IAssignmentExpiryScheduler } from './interfaces/jobs/IAssignmentExpiryScheduler.ts';
import userAuthRoutes from './routes/userAuth.routes.ts';
import trainerRoutes from './routes/trainerAuth.routes.ts';
import onboardingRoutes from './routes/onBoardingRoutes.ts';
import adminRoutes from './routes/adminAuthRoutes.ts';
import userProfileRoutes from './routes/userProfileRoutes.ts';
import aiPlanRoutes from './routes/aiPlan.routes.ts';
import mealLogRoutes from './routes/meal.log.routes.ts';
import recipeRoutes from './routes/recipe.routes.ts';
import workoutProgramRoutes from './routes/workoutProgram.routes.ts';
import workoutLogRoutes from './routes/workoutLog.routes.ts';
import trainerPackageRoutes from './routes/trainerPackage.routes.ts';
import paymentRoutes from './routes/paymentRoutes.ts';
import trainerBrowseRoutes from './routes/trainerbrowse.routes.ts';
import trainerAssignmentRoutes from './routes/trainerassignment.routes.ts';
import healthTrackingRoutes from './routes/healthTrackingRoutes.ts';
import subscriptionPlanRoutes from './routes/subscriptionplan.routes.ts';
import reportRoutes from './routes/report.routes.ts';


import { errorHandler } from './middlewares/errorHandler.ts';
import { container } from './container/index.ts';
import { TOKENS } from './container/tokens.ts';

const app = express();
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
app.use("/api/subscription-plans", subscriptionPlanRoutes);
app.use("/api/reports", reportRoutes);



app.use(errorHandler);

async function startServer() {
  try {
    await connectDB();
    const assignmentExpiry=container.resolve<IAssignmentExpiryScheduler>(TOKENS.IAssignmentExpiryScheduler);
    assignmentExpiry.start();
    console.log("Assignment expiry started");
    app.listen(PORT, () => {
  console.log(`Server running on ${PORT}`);
});
    
  } catch (error) {
    console.error(error);
    process.exit(1)
    
  }
}
startServer();


