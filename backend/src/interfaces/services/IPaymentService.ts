import type Stripe from "stripe";
import type { CheckoutResponseDTO, CreateCheckoutDTO, CreateSubscriptionCheckoutDTO } from "../../dtos/payment.dto.ts";
import type { IPayment } from "../../models/Payment.ts";

export interface IPaymentService{
    createCheckoutSession(userId:string,data:CreateCheckoutDTO):Promise<CheckoutResponseDTO>;
    createSubscriptionCheckoutSession(userId:string,data:CreateSubscriptionCheckoutDTO):Promise<CheckoutResponseDTO>;
    handleWebhook(payload:Buffer|string,signature:string):Promise<void>;
    confirmSession(sessionId:string):Promise<IPayment|null>;
    getPaymentsByUser(userId:string):Promise<IPayment[]>;
    getPaymentById(paymentId:string):Promise<IPayment|null>;
}