import type { IPaymentService } from "../interfaces/services/IPaymentService.js";
import Stripe from "stripe";
import type { IPaymentRepository } from "../interfaces/repositories/IPaymentRepository.js";
import type { ITrainerPackageRepository } from "../interfaces/repositories/ITrainerPackageRepository.js";
import type { CheckoutResponseDTO, CreateCheckoutDTO } from "../dtos/payment.dto.js";
import { inject, injectable } from "tsyringe";
import { TOKENS } from "../container/tokens.js";
import type { IPayment } from "../models/Payment.js";
import { PaymentStatus } from "../constants/payment.js";
import { Types } from "mongoose";
import { NotFoundError } from "../errors/index.js";

@injectable()
export class PaymentService implements IPaymentService {
    private stripe: Stripe;

    constructor(
        @inject(TOKENS.IPaymentRepository) private paymentRepository: IPaymentRepository,
        @inject(TOKENS.ITrainerPackageRepository) private packageRepository: ITrainerPackageRepository
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

    async handleWebhook(event: Stripe.Event): Promise<void> {
        switch (event.type) {
            case "checkout.session.completed": {
                const session = event.data.object as Stripe.Checkout.Session;
                if (session.id) {
                    const payment = await this.paymentRepository.findByStripeSessionId(session.id);
                    if(!payment)
                    {
                        throw new NotFoundError("Payment not found")
                    }
                    if (payment) {
                        await this.paymentRepository.updatePaymentStatus(
                            payment._id.toString(),
                            PaymentStatus.COMPLETED
                        );
                    }
                }
                break;
            }
            default:
                break;
        }
    }

    async getPaymentsByUser(userId: string): Promise<IPayment[]> {
        return this.paymentRepository.findByUser(userId);
    }

    async getPaymentById(paymentId: string): Promise<IPayment | null> {
        return this.paymentRepository.findById(paymentId);
    }
}