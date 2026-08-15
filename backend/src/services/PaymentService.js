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
import Stripe from "stripe";
import { inject, injectable } from "tsyringe";
import { TOKENS } from "../container/tokens.js";
import { PaymentStatus } from "../constants/payment.js";
import { Types } from "mongoose";
import { NotFoundError, UnauthorizedError } from "../errors/index.js";
let PaymentService = class PaymentService {
    paymentRepository;
    packageRepository;
    trainerassignmentservice;
    stripe;
    constructor(paymentRepository, packageRepository, trainerassignmentservice) {
        this.paymentRepository = paymentRepository;
        this.packageRepository = packageRepository;
        this.trainerassignmentservice = trainerassignmentservice;
        const secretKey = process.env.STRIPE_SECRET_KEY;
        if (!secretKey) {
            throw new Error("STRIPE_SECRET_KEY environment variable is missing.");
        }
        this.stripe = new Stripe(secretKey);
    }
    async createCheckoutSession(userId, data) {
        const pkg = await this.packageRepository.findById(data.packageId);
        if (!pkg || !pkg.isActive) {
            throw new Error("Trainer package not found or is currently inactive.");
        }
        const clientUrl = process.env.CLIENT_URL || "http://localhost:5173";
        const tempPaymentId = new Types.ObjectId().toString();
        const session = await this.stripe.checkout.sessions.create({
            payment_method_types: ["card"],
            line_items: [
                {
                    price_data: {
                        currency: "inr",
                        product_data: {
                            name: pkg.packageName,
                            description: pkg.description,
                        },
                        unit_amount: Math.round(pkg.price * 100),
                    },
                    quantity: 1,
                },
            ],
            mode: "payment",
            success_url: `${clientUrl}/payment/success?session_id={CHECKOUT_SESSION_ID}`,
            cancel_url: `${clientUrl}/payment/cancel`,
            metadata: {
                paymentId: tempPaymentId,
                userId,
                packageId: data.packageId,
                trainerId: pkg.trainerId.toString(),
            },
        });
        const payment = await this.paymentRepository.create({
            paymentId: tempPaymentId,
            userId: new Types.ObjectId(userId),
            trainerId: pkg.trainerId,
            packageId: new Types.ObjectId(data.packageId),
            stripeSessionId: session.id,
            amount: pkg.price,
            currency: "INR",
            paymentStatus: PaymentStatus.PENDING,
        });
        return {
            paymentId: payment._id ? payment._id.toString() : tempPaymentId,
            sessionId: session.id,
            checkoutUrl: session.url || "",
        };
    }
    async handleWebhook(payload, signature) {
        const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;
        if (!webhookSecret) {
            throw new Error("STRIPE_WEBHOOK_SECRET environment variable is missing.");
        }
        let event;
        try {
            event = this.stripe.webhooks.constructEvent(payload, signature, webhookSecret);
        }
        catch (error) {
            throw new UnauthorizedError(`Webhook Signature Verification Failed: ${error.message}`);
        }
        switch (event.type) {
            case "checkout.session.completed": {
                const session = event.data.object;
                if (session.id) {
                    const payment = await this.paymentRepository.findByStripeSessionId(session.id);
                    if (!payment) {
                        throw new NotFoundError("Payment Not Found");
                    }
                    await this.paymentRepository.updatePaymentStatus(payment._id.toString(), PaymentStatus.COMPLETED);
                    const pkg = await this.packageRepository.findById(payment.packageId.toString());
                    if (!pkg) {
                        throw new NotFoundError("Package Not Found");
                    }
                    await this.trainerassignmentservice.createAssignment({
                        userId: payment.userId.toString(),
                        packageId: payment.packageId.toString(),
                        paymentId: payment._id.toString()
                    });
                }
                break;
            }
            case "checkout.session.expired": {
                const session = event.data.object;
                if (session.id) {
                    const payment = await this.paymentRepository.findByStripeSessionId(session.id);
                    if (payment) {
                        await this.paymentRepository.updatePaymentStatus(payment._id.toString(), PaymentStatus.FAILED);
                    }
                }
                break;
            }
            default:
                break;
        }
    }
    async confirmSession(sessionId) {
        const session = await this.stripe.checkout.sessions.retrieve(sessionId);
        if (session.payment_status === "paid" || session.status === "complete") {
            const payment = await this.paymentRepository.findByStripeSessionId(session.id);
            if (payment) {
                if (payment.paymentStatus !== PaymentStatus.COMPLETED) {
                    await this.paymentRepository.updatePaymentStatus(payment._id.toString(), PaymentStatus.COMPLETED);
                    try {
                        await this.trainerassignmentservice.createAssignment({
                            userId: payment.userId.toString(),
                            packageId: payment.packageId.toString(),
                            paymentId: payment._id.toString()
                        });
                    }
                    catch (err) {
                        // ignore if assignment already exists
                    }
                }
                return payment;
            }
        }
        return null;
    }
    async getPaymentsByUser(userId) {
        return this.paymentRepository.findByUser(userId);
    }
    async getPaymentById(paymentId) {
        return this.paymentRepository.findById(paymentId);
    }
};
PaymentService = __decorate([
    injectable(),
    __param(0, inject(TOKENS.IPaymentRepository)),
    __param(1, inject(TOKENS.ITrainerPackageRepository)),
    __param(2, inject(TOKENS.ITrainerAssignmentService)),
    __metadata("design:paramtypes", [Object, Object, Object])
], PaymentService);
export { PaymentService };
//# sourceMappingURL=PaymentService.js.map