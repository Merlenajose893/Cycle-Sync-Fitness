import { injectable } from "tsyringe";
import type { PaymentStatus } from "../constants/payment.js";
import type { IPaymentRepository } from "../interfaces/repositories/IPaymentRepository.js";
import { Payment, type IPayment } from "../models/Payment.js";
import { BaseRepository } from "./BaseRepository.js";

@injectable()
export class PaymentRepository
    extends BaseRepository<IPayment>
    implements IPaymentRepository {

    constructor() {
        super(Payment);
    }

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

    findByTrainer(
        trainerId: string
    ): Promise<IPayment[]> {
        return this.model.find({ trainerId });
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