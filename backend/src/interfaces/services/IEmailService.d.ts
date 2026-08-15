export interface IEmailService {
    sendOtpEmail(email: string, otp: string): Promise<void>;
    sendPasswordResetOtp(email: string, otp: string): Promise<void>;
    sendTrainerInvitation(to: string, firstName: string, inviteLink: string): Promise<void>;
}
//# sourceMappingURL=IEmailService.d.ts.map