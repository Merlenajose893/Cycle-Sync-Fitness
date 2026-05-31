export interface IEmailService{
    sendOtpEmail(email:string,otp:string):Promise<void>;
    // sendPasswordResetOtp(email:string,otp:string):Promise<void>;
}