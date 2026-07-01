export interface RegisterUserDTO{
    firstName:string;
    lastName:string;
    email:string;
    password:string;
}

export interface LoginDTO{
    email:string;
    password:string;
}

export interface VerifyOtpDTO{
    userId:string;
    otp:string
}

export interface ResendOTPDTO{
    userId:string;
}

export interface LogoutDTO{
<<<<<<< HEAD
    userId:string;
}

export interface ForgotPasswordDTO{
    email:string;
}

export interface ResetPasswordDTO{
    userId:string;
    otp:string;
    newPassword:string;
}

export interface VerifyResetOtpDTO{
    userId:string;
    otp:string;
}
export interface ForgotPasswordResponseDTO{
    userId:string;
    email:string;
    message?:string;
=======
    userId:string
>>>>>>> 081b12d (changes)
}