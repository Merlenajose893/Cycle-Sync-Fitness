import express from 'express';
import { AuthController } from '../controllers/authController.js';
const router=express.Router();
const authController=new AuthController();

router.post('/register',authController.registerUser)
router.post('/verifyEmail',authController.verifyEmail)
router.post('/login',authController.loginUser)
router.post('/forgetPassword',authController.forgetPassword)
router.post('/resetPassword',authController.resetPassword);

router.post('/trainer/register',authController.registerTrainer);
router.post('/trainer/login',authController.loginTrainer)
router.post('/trainer/verifyEmail',authController.verifyTrainer)

export default router