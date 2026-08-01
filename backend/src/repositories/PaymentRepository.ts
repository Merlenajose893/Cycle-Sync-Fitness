import type { PaymentStatus } from "../constants/payment.js";
import type { IPaymentRepository } from "../interfaces/repositories/IPaymentRepository.js";
import type { IPayment } from "../models/Payment.js";
import { BaseRepository } from "./BaseRepository.js";

export class PaymentRepository
    extends BaseRepository<IPayment>
    implements IPaymentRepository {

    findByStripeSessionId(
        stripeSessionId: string
    ): Promise<IPayment | null> {
        return this.model.findOne({ stripeSessionId });
    }

    findByUser(
        userId: string
    ): Promise<IPayment[]> {
        return this.model.find({ userId });
    }

    updatePaymentStatus(
        paymentId: string,
        status: PaymentStatus
    ): Promise<IPayment | null> {
        return this.model.findByIdAndUpdate(
            paymentId,
            { paymentStatus: status },
            { new: true }
        );
    }
}