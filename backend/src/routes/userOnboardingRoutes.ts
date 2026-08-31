import express from "express"
import type { Router } from "express";
import { container } from "tsyringe";
import { UserOnboardingControlling } from "../controllers/UserOnboardinController.ts";
import { authMiddleware } from "../middlewares/authMiddleware.ts";
import { validate } from "../middlewares/validate.ts";
import { updateBodyDetailsSchema,updateCycleSetupSchema,updateGoalsSchema } from "../validators/useronboarding.validator.ts";
const router=express.Router();
const controller=container.resolve(UserOnboardingControlling);
router.get("/status",authMiddleware,controller.getOnboardingStatus);
router.put("/body-details",authMiddleware,validate(updateBodyDetailsSchema),controller.updateBodyDetails.bind(controller));
router.put("/cycle-setup",authMiddleware,validate(updateCycleSetupSchema),controller.updateCycleDetails.bind(controller));
router.put("/goals",authMiddleware,validate(updateGoalsSchema),controller.updateGoals);
router.post("/complete",authMiddleware,controller.completeOnboarding.bind(controller));
export default router;

