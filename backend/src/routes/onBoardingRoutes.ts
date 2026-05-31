import express from 'express';
import { OnboardingController } from '../controllers/onboardingController.js';
const router=express.Router();
const onboardingController=new OnboardingController();
router.put('/bodyDetails/:userId',onboardingController.updateBodyDetails)
router.put('/cycleDetails/:userId',onboardingController.updateCycleDetails)
router.put('/goals/:userId',onboardingController.updateGoals)
router.post('/complete/:userId',onboardingController.onboardingComplete)
export default router;