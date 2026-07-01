export interface RegisterUserDTO {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
}
export interface LoginDTO {
    email: string;
    password: string;
}
export interface VerifyOtpDTO {
    userId: string;
    otp: string;
}
export interface ResendOTPDTO {
    userId: string;
}
export interface LogoutDTO {
    userId: string;
}
//# sourceMappingURL=auth.dto.d.ts.map