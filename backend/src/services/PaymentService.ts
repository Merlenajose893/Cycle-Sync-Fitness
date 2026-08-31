import type { IPaymentService } from "../interfaces/services/IPaymentService.ts";
import Stripe from "stripe";
import type { IPaymentRepository } from "../interfaces/repositories/IPaymentRepository.ts";
import type { ITrainerPackageRepository } from "../interfaces/repositories/ITrainerPackageRepository.ts";
import type { ISubscriptionPlanRepository } from "../interfaces/repositories/ISubscriptionplanRepository.ts";
import type { IUserRepository } from "../interfaces/repositories/IUserRepository.ts";
import type { CheckoutResponseDTO, CreateCheckoutDTO, CreateSubscriptionCheckoutDTO } from "../dtos/payment.dto.ts";
import { inject, injectable } from "tsyringe";
import { TOKENS } from "../container/tokens.ts";
import type { IPayment } from "../models/Payment.ts";
import { PaymentStatus } from "../constants/payment.ts";
import { Types } from "mongoose";
import type { ITrainerAssignmentService } from "../interfaces/services/ITrainerAssignmentService.ts";
import { NotFoundError, UnauthorizedError } from "../errors/index.ts";


@injectable()
export class PaymentService implements IPaymentService {
    private stripe: Stripe;

    constructor(
        @inject(TOKENS.IPaymentRepository) private paymentRepository: IPaymentRepository,
        @inject(TOKENS.ITrainerPackageRepository) private packageRepository: ITrainerPackageRepository,
        @inject(TOKENS.ITrainerAssignmentService) private trainerassignmentservice: ITrainerAssignmentService,
        @inject(TOKENS.ISubscriptionPlanRepository) private subscriptionPlanRepository: ISubscriptionPlanRepository,
        @inject(TOKENS.IUserRepository) private userRepository: IUserRepository
    ) {
        const secretKey = process.env.STRIPE_SECRET_KEY;
        if (!secretKey) {
            throw new Error("STRIPE_SECRET_KEY environment variable is missing.");
        }
        this.stripe = new Stripe(secretKey);
    }

    async createCheckoutSession(userId: string, data: CreateCheckoutDTO): Promise<CheckoutResponseDTO> {
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
        } as Partial<IPayment>);

        return {
            paymentId: payment._id ? payment._id.toString() : tempPaymentId,
            sessionId: session.id,
            checkoutUrl: session.url || "",
        };
    }

    async createSubscriptionCheckoutSession(userId: string, data: CreateSubscriptionCheckoutDTO): Promise<CheckoutResponseDTO> {
        const plan = await this.subscriptionPlanRepository.findById(data.planId);
        if (!plan || !plan.isActive) {
            throw new Error("Subscription plan not found or is currently inactive.");
        }

        const clientUrl = process.env.CLIENT_URL || "http://localhost:5173";

        const session = await this.stripe.checkout.sessions.create({
            payment_method_types: ["card"],
            line_items: [
                {
                    price: plan.stripePriceId,
                    quantity: 1,
                },
            ],
            mode: "subscription",
            success_url: `${clientUrl}/payment/success?session_id={CHECKOUT_SESSION_ID}&type=subscription`,
            cancel_url: `${clientUrl}/payment/cancel`,
            metadata: {
                userId,
                planId: data.planId,
                itemType: "subscription",
            },
        });

        return {
            paymentId: session.id,
            sessionId: session.id,
            checkoutUrl: session.url || "",
        };
    }

    async handleWebhook(payload: Buffer | string, signature: string): Promise<void> {
        const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;
        if (!webhookSecret) {
            throw new Error("STRIPE_WEBHOOK_SECRET environment variable is missing.");
        }

        let event: Stripe.Event;
        try {
            event = this.stripe.webhooks.constructEvent(payload, signature, webhookSecret);
        } catch (error: any) {
            throw new UnauthorizedError(`Webhook Signature Verification Failed: ${error.message}`);
        }

        switch (event.type) {
            case "checkout.session.completed": {
                const session = event.data.object as Stripe.Checkout.Session;
                if (session.id) {
                    if (session.metadata?.itemType === "subscription") {
                        const userId = session.metadata.userId;
                        const planId = session.metadata.planId;
                        if (userId && planId) {
                            const plan = await this.subscriptionPlanRepository.findById(planId);
                            const daysToAdd = plan?.billingCycle === "annual" ? 365 : 30;
                            const periodEnd = new Date();
                            periodEnd.setDate(periodEnd.getDate() + daysToAdd);

                            await this.userRepository.updateProfile(userId, {
                                subscription: {
                                    status: "active",
                                    planId: planId,
                                    currentPeriodEnd: periodEnd,
                                },
                            });
                        }
                    } else {
                        const payment = await this.paymentRepository.findByStripeSessionId(session.id);
                        if (!payment) {
                            throw new NotFoundError("Payment Not Found");
                        }

                        await this.paymentRepository.updatePaymentStatus(
                            payment._id.toString(),
                            PaymentStatus.COMPLETED
                        );

                        const pkg = await this.packageRepository.findById(payment.packageId.toString());
                        if (!pkg) {
                            throw new NotFoundError("Package Not Found");
                        }

                        await this.trainerassignmentservice.createAssignment({
                            userId: payment.userId.toString(),
                            trainerId: payment.trainerId.toString(),
                            packageId: payment.packageId.toString(),
                            paymentId: payment._id.toString()
                        });
                    }
                }
                break;
            }
            case "checkout.session.expired": {
                const session = event.data.object as Stripe.Checkout.Session;
                if (session.id) {
                    const payment = await this.paymentRepository.findByStripeSessionId(session.id);
                    if (payment) {
                        await this.paymentRepository.updatePaymentStatus(
                            payment._id.toString(),
                            PaymentStatus.FAILED
                        );
                    }
                }
                break;
            }
            case "customer.subscription.deleted": {
                const subscriptionObj = event.data.object as Stripe.Subscription;
                const userId = subscriptionObj.metadata?.userId;
                if (userId) {
                    await this.userRepository.updateProfile(userId, {
                        subscription: {
                            status: "canceled",
                        },
                    });
                }
                break;
            }
            default:
                break;
        }
    }

    async confirmSession(sessionId: string): Promise<IPayment | null> {
        const session = await this.stripe.checkout.sessions.retrieve(sessionId);
        if (session.payment_status === "paid" || session.status === "complete") {
            if (session.metadata?.itemType === "subscription") {
                const userId = session.metadata.userId;
                const planId = session.metadata.planId;
                if (userId && planId) {
                    const plan = await this.subscriptionPlanRepository.findById(planId);
                    const daysToAdd = plan?.billingCycle === "annual" ? 365 : 30;
                    const periodEnd = new Date();
                    periodEnd.setDate(periodEnd.getDate() + daysToAdd);

                    await this.userRepository.updateProfile(userId, {
                        subscription: {
                            status: "active",
                            planId: planId,
                            currentPeriodEnd: periodEnd,
                        },
                    });
                }
                return null;
            }

            const payment = await this.paymentRepository.findByStripeSessionId(session.id);
            if (payment) {
                if (payment.paymentStatus !== PaymentStatus.COMPLETED) {
                    await this.paymentRepository.updatePaymentStatus(
                        payment._id.toString(),
                        PaymentStatus.COMPLETED
                    );
                    try {
                        await this.trainerassignmentservice.createAssignment({
                            userId: payment.userId.toString(),
                            trainerId: payment.trainerId.toString(),
                            packageId: payment.packageId.toString(),
                            paymentId: payment._id.toString()
                        });
                    } catch (err) {
                        // ignore if assignment already exists
                    }
                }
                return payment;
            }
        }
        return null;
    }


    async getPaymentsByUser(userId: string): Promise<IPayment[]> {
        return this.paymentRepository.findByUser(userId);
    }

    async getPaymentById(paymentId: string): Promise<IPayment | null> {
        return this.paymentRepository.findById(paymentId);
    }
}