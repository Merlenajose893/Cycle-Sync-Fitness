import { Router } from "express";
import express from "express"
import { container } from "tsyringe";
import { PaymentController } from "../controllers/PaymentController.js";
import { authMiddleware } from "../middlewares/authMiddleware.js";
const paymenyController=container.resolve(PaymentController);
const router=Router();
router.post("/webhook",express.raw({type:"application/json"}),paymenyController.handleWebhook);
router.post("/checkout-session",authMiddleware,paymenyController.createCheckoutSession);
router.get("/my-payments",authMiddleware,paymenyController.getPaymentsByUser)
router.get("/:id",authMiddleware,paymenyController.getPaymentById);
