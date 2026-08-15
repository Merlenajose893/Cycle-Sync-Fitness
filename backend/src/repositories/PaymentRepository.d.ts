import type { PaymentStatus } from "../constants/payment.js";
import type { IPaymentRepository } from "../interfaces/repositories/IPaymentRepository.js";
import { type IPayment } from "../models/Payment.js";
import { BaseRepository } from "./BaseRepository.js";
export declare class PaymentRepository extends BaseRepository<IPayment> implements IPaymentRepository {
    constructor();
    findByStripeSessionId(stripeSessionId: string): Promise<IPayment | null>;
    findByUser(userId: string): Promise<IPayment[]>;
    findByTrainer(trainerId: string): Promise<IPayment[]>;
    updatePaymentStatus(paymentId: string, status: PaymentStatus): Promise<IPayment | null>;
}
//# sourceMappingURL=PaymentRepository.d.ts.map