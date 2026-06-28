import type { IEmailService } from "../interfaces/services/IEmailService.js";
export declare class EmailService implements IEmailService {
    private transporter;
    constructor();
    sendOtpEmail(to: string, otp: string): Promise<void>;
    sendPasswordResetOTP(to: string, otp: string): Promise<void>;
}
//# sourceMappingURL=EmailService.d.ts.map