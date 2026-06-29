import { Router } from "express";
import { container } from "tsyringe";
import {  UserAuthController } from "../controllers/UserAuthControllers.js";
import { validate } from "../middlewares/validate.js";
import { registerUserSchema,loginSchema,verifyOtpSchema,resendOtpSchema } from "../validators/auth.validation.js";

const router=Router();
const userAuthController=container.resolve(UserAuthController);
router.post('/register',validate(registerUserSchema),userAuthController.registerUser);
router.post('/login',validate(loginSchema),userAuthController.loginUser)
router.post("/verify-otp",validate(verifyOtpSchema),userAuthController.verifyUserOtp);
router.post('/resend-otp',validate(resendOtpSchema),userAuthController.resendOtp)
router.post("/logout",userAuthController.logoutUser);

router.post("/refresh-token",userAuthController.refreshToken)
router.post("/forgot-password",userAuthController.forgotPassword)
router.post("/verify-forgot-password",userAuthController.verifyForgotPasword);
router.post("/reset-password",userAuthController.resetPassword);
export default router;