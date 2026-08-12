import { inject, injectable } from "tsyringe";
import { TOKENS } from "../container/tokens.js";
import type { IPaymentService } from "../interfaces/services/IPaymentService.js";
import type { NextFunction, Request, Response } from "express";
import { successResponse } from "../utils/response.js";
import { HttpStatus } from "../constants/HttpStatus.js";
import type Stripe from "stripe";

import { BadRequestError } from "../errors/index.js";

@injectable()
export class PaymentController {
    constructor(
        @inject(TOKENS.IPaymentService) private paymentService: IPaymentService
    ) {}

    createCheckoutSession = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const userId = req.user?.userId;
            if (!userId) {
                throw new Error("Unauthorized: User ID is required");
            }

            const result = await this.paymentService.createCheckoutSession(userId, req.body);
            successResponse(res, "Checkout session created successfully", result, HttpStatus.OK);
        } catch (error) {
            next(error);
        }
    };

    handleWebhook = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const signature = req.headers["stripe-signature"] as string;
            if (!signature) {
                throw new BadRequestError("Missing stripe-signature header");
            }
            const result = await this.paymentService.handleWebhook(req.body, signature);
            successResponse(res, "Webhook processed successfully", result, HttpStatus.OK);
        } catch (error) {
            next(error);
        }
    };

    confirmSession = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { sessionId } = req.body;
            if (!sessionId) {
                throw new BadRequestError("Session ID is required");
            }
            const result = await this.paymentService.confirmSession(sessionId);
            successResponse(res, "Payment confirmed successfully", result, HttpStatus.OK);
        } catch (error) {
            next(error);
        }
    };

    getPaymentsByUser = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const userId = req.user?.userId;
            if (!userId) {
                throw new Error("Unauthorized: User ID is required");
            }

            const result = await this.paymentService.getPaymentsByUser(userId);
            successResponse(res, "Payments retrieved successfully", result, HttpStatus.OK);
        } catch (error) {
            next(error);
        }
    };

    getPaymentById = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const paymentId = req.params.id!;
            const result = await this.paymentService.getPaymentById(paymentId);
            successResponse(res, "Payment retrieved successfully", result, HttpStatus.OK);
        } catch (error) {
            next(error);
        }
    };
}
