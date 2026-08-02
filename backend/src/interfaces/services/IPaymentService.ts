import type { CheckoutResponseDTO, CreateCheckoutDTO } from "../../dtos/payment.dto.js";
import type { IPayment } from "../../models/Payment.js";

export interface IPaymentService{
    createCheckoutSession(userId:string,data:CreateCheckoutDTO):Promise<CheckoutResponseDTO>;
    handleWebhook(event:StripTypeScriptTypesOptions.event):Promise<void>;
    getPaymentsByUser(userId:string):Promise<IPayment[]>;
    getPaymentById(paymentId:string):Promise<IPayment|null>;
}