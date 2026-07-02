
import express from "express";
import userOnboardingRoutes from "./userOnboardingRoutes.js";
import trainerOnboardingRoutes from "./trainerOnboardingRoutes.js";
const router=express.Router();
router.use("/user",userOnboardingRoutes);
router.use("/trainer",trainerOnboardingRoutes);

export default router;
