import { Router } from "express";
import { container } from "tsyringe";
import { TrainerAuthController } from "../controllers/TrainerAuthController.js";
import { validate } from "../middlewares/validate.js";
import { loginTrainer, registerTrainerSchema, verifyTrainerOtpSchema } from "../validators/trainer.validation.js";
const router=Router();
const trainerAuthController=container.resolve(TrainerAuthController);
router.post("/register",validate(registerTrainerSchema),trainerAuthController.registerTrainer);
router.post("/verify-otp",validate(verifyTrainerOtpSchema),trainerAuthController.verifyTrainerOTP);
router.post("/resend-otp",trainerAuthController.resendTrainerOTP)
router.post("/login",validate(loginTrainer),trainerAuthController.loginTrainer);
router.post("/logout",trainerAuthController.logoutTrainer);

export default router;