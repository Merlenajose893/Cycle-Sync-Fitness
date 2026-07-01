var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
import { injectable, inject } from "tsyringe";
import bcrypt from "bcryptjs";
// import { UnauthorizedError } from "../errors/index.js";
import { TOKENS } from "../container/tokens.js";
import { BadRequestError, NotFoundError } from "../errors/index.js";
import { LoginTicket } from "google-auth-library";
let OtpService = class OtpService {
    otpRepository;
    emailService;
    constructor(otpRepository, emailService) {
        this.otpRepository = otpRepository;
        this.emailService = emailService;
    }
    createAndSentOtp = async (userId, userType, email, type) => {
        //    const otp=Math.floor(10000+Math.random()*900000).toString();
        const otp = Math.floor(100000 + Math.random() * 900000).toString();
        console.log(otp);
        const hashedOtp = await bcrypt.hash(otp, 10);
        await this.otpRepository.createOtp(userId, userType, email, hashedOtp, type);
        await this.emailService.sendOtpEmail(email, otp);
    };
    verifyOtp = async (userId, type, otp) => {
        const existOtp = await this.otpRepository.findOtp(userId, type);
        if (!existOtp) {
            throw new NotFoundError("OTP not found");
        }
        if (existOtp.expiresAt < new Date()) {
            throw new BadRequestError("Otp expired");
        }
        const otpValid = await bcrypt.compare(otp, existOtp.otp);
        if (!otpValid) {
            throw new BadRequestError("Invalid OTP");
        }
        await this.otpRepository.deleteOtp(userId, type);
    };
    resendOTP = async (userId, userType, email, type) => {
        const ans = await this.createAndSentOtp(userId, userType, email, type);
        console.log(ans);
    };
};
OtpService = __decorate([
    injectable(),
    __param(0, inject(TOKENS.IOtpRepository)),
    __param(1, inject(TOKENS.IEmailService)),
    __metadata("design:paramtypes", [Object, Object])
], OtpService);
export { OtpService };
//# sourceMappingURL=OtpService.js.map