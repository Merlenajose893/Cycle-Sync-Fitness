import express from "express";
import { container } from "tsyringe";
import { TrainerOnboardingController } from "../controllers/TrainerOnboardingController.js";
import { authMiddleware } from "../middlewares/authMiddleware.js";
import { validate } from "../middlewares/validate.js";
import { updateTrainerCertificationSchema, updateTrainerPackageSchema, updateTrainerProfileSchema } from "../validators/traineronboarding.validator.js";
const router=express.Router();
const controller=container.resolve(TrainerOnboardingController);
router.get("/status",authMiddleware,controller.getTrainerOnboardingStatus.bind(controller));
router.put("/profile",authMiddleware,validate(updateTrainerProfileSchema),controller.updateTrainerProfile.bind(controller));
router.put("/packages",authMiddleware,validate(updateTrainerPackageSchema),controller.updateTrainerPackages.bind(controller));
router.post("/complete",authMiddleware,controller.completeTrainerOnboarding.bind(controller))
export default router;