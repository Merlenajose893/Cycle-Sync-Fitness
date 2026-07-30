import { Router } from "express";
import { container } from "tsyringe";
import { TrainerAuthController } from "../controllers/TrainerAuthController.js";
import { validate } from "../middlewares/validate.js";
import { loginTrainer, registerTrainerSchema, verifyTrainerOtpSchema } from "../validators/trainer.validation.js";
import { authMiddleware } from "../middlewares/authMiddleware.js";
import { roleMiddleware } from "../middlewares/roleMiddleWare.js";
import { blockMiddleWare } from "../middlewares/blockMiddleware.js";
const router=Router();
const trainerAuthController=container.resolve(TrainerAuthController);
router.post("/register",validate(registerTrainerSchema),trainerAuthController.registerTrainer);
router.post("/verify-otp",validate(verifyTrainerOtpSchema),trainerAuthController.verifyTrainerOTP);
router.post("/resend-otp",trainerAuthController.resendTrainerOTP)
router.post("/login",validate(loginTrainer),trainerAuthController.loginTrainer);
router.post("/logout",trainerAuthController.logoutTrainer);
router.post("/invite/verify",trainerAuthController.verifyTrainer);
router.post("/invite/register",trainerAuthController.registerFromInvite)
router.get('/me',authMiddleware,roleMiddleware("trainer"),blockMiddleWare,trainerAuthController.getCurrentTrainer);
router.post("/forgot-password",trainerAuthController.forgotPassword);
router.post("/reset-password",trainerAuthController.resetPassword);

export default router;