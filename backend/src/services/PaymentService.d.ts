import type { IPaymentService } from "../interfaces/services/IPaymentService.js";
import type { IPaymentRepository } from "../interfaces/repositories/IPaymentRepository.js";
import type { ITrainerPackageRepository } from "../interfaces/repositories/ITrainerPackageRepository.js";
import type { CheckoutResponseDTO, CreateCheckoutDTO } from "../dtos/payment.dto.js";
import type { IPayment } from "../models/Payment.js";
import type { ITrainerAssignmentService } from "../interfaces/services/ITrainerAssignmentService.js";
export declare class PaymentService implements IPaymentService {
    private paymentRepository;
    private packageRepository;
    private trainerassignmentservice;
    private stripe;
    constructor(paymentRepository: IPaymentRepository, packageRepository: ITrainerPackageRepository, trainerassignmentservice: ITrainerAssignmentService);
    createCheckoutSession(userId: string, data: CreateCheckoutDTO): Promise<CheckoutResponseDTO>;
    handleWebhook(payload: Buffer | string, signature: string): Promise<void>;
    confirmSession(sessionId: string): Promise<IPayment | null>;
    getPaymentsByUser(userId: string): Promise<IPayment[]>;
    getPaymentById(paymentId: string): Promise<IPayment | null>;
}
//# sourceMappingURL=PaymentService.d.ts.map