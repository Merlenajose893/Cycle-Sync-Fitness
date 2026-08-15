import type { IEmailService } from "../interfaces/services/IEmailService.js";
export declare class EmailService implements IEmailService {
    private transporter;
    constructor();
    sendOtpEmail(to: string, otp: string): Promise<void>;
    sendPasswordResetOtp(to: string, otp: string): Promise<void>;
    sendTrainerInvitation(to: string, firstName: string, inviteLink: string): Promise<void>;
}
//# sourceMappingURL=EmailService.d.ts.map