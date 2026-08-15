import mongoose, { Types, Document } from "mongoose";
import { PaymentMethod, PaymentStatus } from "../constants/payment.js";
export interface IPayment extends Document {
    paymentId: string;
    userId: Types.ObjectId;
    trainerId: Types.ObjectId;
    packageId: Types.ObjectId;
    stripeSessionId: string;
    amount: number;
    currency: string;
    paymentStatus: PaymentStatus;
    paymentMethod: PaymentMethod;
    createdAt: Date;
    updatedAt: Date;
}
export declare const Payment: mongoose.Model<IPayment, {}, {}, {}, mongoose.Document<unknown, {}, IPayment, {}, mongoose.DefaultSchemaOptions> & IPayment & Required<{
    _id: Types.ObjectId;
}> & {
    __v: number;
} & {
    id: string;
}, any, IPayment>;
//# sourceMappingURL=Payment.d.ts.map