import express from "express"
import type { Router } from "express";
import { container } from "tsyringe";
import { UserOnboardingControlling } from "../controllers/UserOnboardinController.js";
import { authMiddleware } from "../middlewares/authMiddleware.js";
import { validate } from "../middlewares/validate.js";
import { updateBodyDetailsSchema,updateCycleSetupSchema,updateGoalsSchema } from "../validators/useronboarding.validator.js";
const router=express.Router();
const controller=container.resolve(UserOnboardingControlling);
router.get("/status",authMiddleware,controller.getOnboardingStatus);
router.put("/body-details",authMiddleware,validate(updateBodyDetailsSchema),controller.updateBodyDetails);
router.put("/cycle-setup",authMiddleware,validate(updateCycleSetupSchema),controller.updateCycleDetails);
router.put("/goals",authMiddleware,validate(updateGoalsSchema),controller.updateGoals);
router.post("/complete",authMiddleware,controller.completeOnboarding);
export default router;

