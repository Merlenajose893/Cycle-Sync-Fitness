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
import mongoose from "mongoose";
import { otpModel } from "../models/Otp.js";
import { BaseRepository } from "./BaseRepository.js";
let OtpRepository = class OtpRepository extends BaseRepository {
    constructor() {
        super(otpModel);
    }
    async createOtp(userId, userType, email, otp, type) {
        await this.model.deleteOne({ userId: new mongoose.Types.ObjectId(userId), type });
        const expiresAt = new Date(Date.now() + 10 * 60 * 1000);
        console.log(expiresAt);
        const createdOtp = await this.model.create({
            userId: new mongoose.Types.ObjectId(userId),
            userType,
            email,
            otp,
            type,
            expiresAt
        });
        return createdOtp;
    }
    async findOtp(userId, type) {
        return this.model.findOne({
            userId: new mongoose.Types.ObjectId(userId),
            type
        });
    }
    async deleteOtp(userId, type) {
        await this.model.deleteOne({ userId: new mongoose.Types.ObjectId(userId), type });
    }
};
OtpRepository = __decorate([
    injectable(),
    __metadata("design:paramtypes", [])
], OtpRepository);
export { OtpRepository };
//# sourceMappingURL=OtpRepository.js.map