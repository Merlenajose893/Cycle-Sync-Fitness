var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import nodemailer from "nodemailer";
import { injectable } from "tsyringe";
let EmailService = class EmailService {
    transporter;
    constructor() {
        if (!process.env.EMAIL_USER ||
            !process.env.EMAIL_PASS) {
            throw new Error("Invalid Email Configuration");
        }
        this.transporter =
            nodemailer.createTransport({
                host: process.env.EMAIL_HOST,
                port: Number(process.env.EMAIL_PORT),
                secure: true,
                auth: {
                    user: process.env.EMAIL_USER,
                    pass: process.env.EMAIL_PASS,
                },
            });
    }
    async sendOtpEmail(to, otp) {
        await this.transporter.sendMail({
            from: `"CycleSyncAI" <${process.env.EMAIL_USER}>`,
            to,
            subject: "Verify Your Email",
            html: `
        <h2>Welcome to CycleSync AI</h2>

        <p>Your verification OTP is:</p>

        <h1>${otp}</h1>

        <p>
          This OTP expires in 15 minutes.
        </p>
      `,
        });
    }
    async sendPasswordResetOTP(to, otp) {
        await this.transporter.sendMail({
            from: `"CycleSyncAI" <${process.env.EMAIL_USER}>`,
            to,
            subject: "Reset Your Password",
            html: `
        <h2>Password Reset</h2>

        <p>Your OTP is:</p>

        <h1>${otp}</h1>

        <p>
          This OTP expires in 15 minutes.
        </p>
      `,
        });
    }
};
EmailService = __decorate([
    injectable(),
    __metadata("design:paramtypes", [])
], EmailService);
export { EmailService };
//# sourceMappingURL=EmailService.js.map