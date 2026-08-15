var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { injectable } from "tsyringe";
import { Payment } from "../models/Payment.js";
import { BaseRepository } from "./BaseRepository.js";
let PaymentRepository = class PaymentRepository extends BaseRepository {
    constructor() {
        super(Payment);
    }
    findByStripeSessionId(stripeSessionId) {
        return this.model.findOne({ stripeSessionId });
    }
    findByUser(userId) {
        return this.model.find({ userId });
    }
    findByTrainer(trainerId) {
        return this.model.find({ trainerId });
    }
    updatePaymentStatus(paymentId, status) {
        return this.model.findByIdAndUpdate(paymentId, { paymentStatus: status }, { new: true });
    }
};
PaymentRepository = __decorate([
    injectable(),
    __metadata("design:paramtypes", [])
], PaymentRepository);
export { PaymentRepository };
//# sourceMappingURL=PaymentRepository.js.map