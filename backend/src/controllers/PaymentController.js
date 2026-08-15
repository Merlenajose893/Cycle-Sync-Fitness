var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
import { inject, injectable } from "tsyringe";
import { TOKENS } from "../container/tokens.js";
import { successResponse } from "../utils/response.js";
import { HttpStatus } from "../constants/HttpStatus.js";
import { BadRequestError } from "../errors/index.js";
let PaymentController = class PaymentController {
    paymentService;
    constructor(paymentService) {
        this.paymentService = paymentService;
    }
    createCheckoutSession = async (req, res, next) => {
        try {
            const userId = req.user?.userId;
            if (!userId) {
                throw new Error("Unauthorized: User ID is required");
            }
            const result = await this.paymentService.createCheckoutSession(userId, req.body);
            successResponse(res, "Checkout session created successfully", result, HttpStatus.OK);
        }
        catch (error) {
            next(error);
        }
    };
    handleWebhook = async (req, res, next) => {
        try {
            const signature = req.headers["stripe-signature"];
            if (!signature) {
                throw new BadRequestError("Missing stripe-signature header");
            }
            const result = await this.paymentService.handleWebhook(req.body, signature);
            successResponse(res, "Webhook processed successfully", result, HttpStatus.OK);
        }
        catch (error) {
            next(error);
        }
    };
    confirmSession = async (req, res, next) => {
        try {
            const { sessionId } = req.body;
            if (!sessionId) {
                throw new BadRequestError("Session ID is required");
            }
            const result = await this.paymentService.confirmSession(sessionId);
            successResponse(res, "Payment confirmed successfully", result, HttpStatus.OK);
        }
        catch (error) {
            next(error);
        }
    };
    getPaymentsByUser = async (req, res, next) => {
        try {
            const userId = req.user?.userId;
            if (!userId) {
                throw new Error("Unauthorized: User ID is required");
            }
            const result = await this.paymentService.getPaymentsByUser(userId);
            successResponse(res, "Payments retrieved successfully", result, HttpStatus.OK);
        }
        catch (error) {
            next(error);
        }
    };
    getPaymentById = async (req, res, next) => {
        try {
            const paymentId = req.params.id;
            const result = await this.paymentService.getPaymentById(paymentId);
            successResponse(res, "Payment retrieved successfully", result, HttpStatus.OK);
        }
        catch (error) {
            next(error);
        }
    };
};
PaymentController = __decorate([
    injectable(),
    __param(0, inject(TOKENS.IPaymentService)),
    __metadata("design:paramtypes", [Object])
], PaymentController);
export { PaymentController };
//# sourceMappingURL=PaymentController.js.map