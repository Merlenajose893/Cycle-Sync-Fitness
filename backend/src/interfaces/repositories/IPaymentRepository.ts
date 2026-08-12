import type { PaymentStatus } from "../../constants/payment.js";
import type { IPayment } from "../../models/Payment.js";
import type { IBaseRepository } from "./IBaseRepository.js";

export interface IPaymentRepository extends IBaseRepository<IPayment>{
findByStripeSessionId(stripeSessionId:string):Promise<IPayment>;
findByUser(userId:string):Promise<IPayment[]>;
findByTrainer(trainerId:string):Promise<IPayment[]>;
updatePaymentStatus(paymentId:string,status:PaymentStatus):Promise<IPayment|null>;


}