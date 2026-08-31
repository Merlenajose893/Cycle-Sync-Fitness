import type { PaymentStatus } from "../../constants/payment.ts";
import type { IPayment } from "../../models/Payment.ts";
import type { IBaseRepository } from "./IBaseRepository.ts";

export interface IPaymentRepository extends IBaseRepository<IPayment>{
findByStripeSessionId(stripeSessionId:string):Promise<IPayment|null>;
findByUser(userId:string):Promise<IPayment[]>;
findByTrainer(trainerId:string):Promise<IPayment[]>;
updatePaymentStatus(paymentId:string,status:PaymentStatus):Promise<IPayment|null>;


}