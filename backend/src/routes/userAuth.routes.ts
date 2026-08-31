import { Router } from "express";
import { container } from "tsyringe";
import {  UserAuthController } from "../controllers/UserAuthControllers.ts";
import { validate } from "../middlewares/validate.ts";
import { registerUserSchema,loginSchema,verifyOtpSchema,resendOtpSchema } from "../validators/auth.validation.ts";
import { authMiddleware } from "../middlewares/authMiddleware.ts";
import { blockMiddleWare } from "../middlewares/blockMiddleware.ts";


const router=Router();
const userAuthController=container.resolve(UserAuthController);
router.post('/register',validate(registerUserSchema),userAuthController.registerUser);
router.post('/google-signin',userAuthController.googleSignIn);
router.post('/login',validate(loginSchema),userAuthController.loginUser)
router.post("/verify-otp",validate(verifyOtpSchema),userAuthController.verifyUserOtp);
router.post('/resend-otp',validate(resendOtpSchema),userAuthController.resendOtp)
router.post("/logout",userAuthController.logoutUser);

router.post("/refresh-token",userAuthController.refreshToken)
router.post("/forgot-password",userAuthController.forgotPassword)
router.post("/verify-forgot-password",userAuthController.verifyForgotPasword);
router.post("/reset-password",userAuthController.resetPassword);
router.get('/me',authMiddleware,blockMiddleWare,userAuthController.getCurrentUser);
export default router;