import { Router } from "express";
import { container } from "tsyringe";
import {  UserAuthController } from "../controllers/UserAuthControllers.js";
import { validate } from "../middlewares/validate.js";
import { registerUserSchema,loginSchema,verifyOtpSchema } from "../validators/auth.validation.js";

const router=Router();
const userAuthController=container.resolve(UserAuthController);
router.post('/register',validate(registerUserSchema),userAuthController.registerUser);
router.post('/login',validate(loginSchema),userAuthController.loginUser)
router.post("/verify-otp",validate(verifyOtpSchema),userAuthController.verifyUserOtp);
router.post("/logout",userAuthController.logoutUser);

router.post("/refresh-token",userAuthController.refreshToken)
export default router;