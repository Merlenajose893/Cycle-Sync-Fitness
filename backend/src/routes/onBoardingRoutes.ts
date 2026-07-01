<<<<<<< HEAD
import express from "express";
import userOnboardingRoutes from "./userOnboardingRoutes.js";
import trainerOnboardingRoutes from "./trainerOnboardingRoutes.js";
const router=express.Router();
router.use("/user",userOnboardingRoutes);
router.use("/trainer",trainerOnboardingRoutes);
=======
import express from 'express';
import { OnboardingController } from '../controllers/onboardingController.js';
const router=express.Router();
const onboardingController=new OnboardingController();
router.put('/bodyDetails/:userId',onboardingController.updateBodyDetails)
router.put('/cycleDetails/:userId',onboardingController.updateCycleDetails)
router.put('/goals/:userId',onboardingController.updateGoals)
router.post('/complete/:userId',onboardingController.onboardingComplete)
>>>>>>> 081b12d (changes)
export default router;