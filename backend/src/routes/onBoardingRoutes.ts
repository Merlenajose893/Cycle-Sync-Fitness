
import express from "express";
import userOnboardingRoutes from "./userOnboardingRoutes.ts";
import trainerOnboardingRoutes from "./trainerOnboardingRoutes.ts";
const router=express.Router();
router.use("/user",userOnboardingRoutes);
router.use("/trainer",trainerOnboardingRoutes);

export default router;
