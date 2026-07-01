<<<<<<< HEAD
import type { RegisterUserDTO,LoginDTO,VerifyOtpDTO, LogoutDTO, ResendOTPDTO, ForgotPasswordDTO, VerifyResetOtpDTO, ResetPasswordDTO,ForgotPasswordResponseDTO } from "../../dtos/auth.dto.js";
import type { Response } from "express";
import type { IUser } from "../../models/User.js";

export interface IUserAuthService{
    registerUser(data:RegisterUserDTO,res:Response):Promise<IUser>;
    loginUser(data:LoginDTO,res:Response):Promise<IUser>;
    verifyEmailOTP(data:VerifyOtpDTO,res:Response):Promise<IUser>;
    logoutuser(data:LogoutDTO,res:Response):Promise<void>;
    resendOTP(data:ResendOTPDTO,res:Response):Promise<void>;
    refreshToken(refreshToken:string,res:Response):Promise<void>;
    forgotPassword(data:ForgotPasswordDTO,res:Response):Promise<ForgotPasswordResponseDTO>;
    // verifyResetOtp(data:VerifyResetOtpDTO,res:Response):Promise<void>;
    resetPassword(data:ResetPasswordDTO,res:Response):Promise<void>;
=======
import type { RegisterUserDTO,LoginDTO,VerifyOtpDTO, LogoutDTO, ResendOTPDTO } from "../../dtos/auth.dto.js";

import type { IUser } from "../../models/User.js";

export interface IUserAuthService{
    registerUser(data:RegisterUserDTO):Promise<IUser>;
    loginUser(data:LoginDTO):Promise<IUser>;
    verifyEmailOTP(data:VerifyOtpDTO):Promise<IUser>;
    logoutuser(data:LogoutDTO):Promise<IUser>;
    resendOTP(data:ResendOTPDTO):Promise<void>;
    refreshToken(refreshToken:string,res:Response):Promise<void>
>>>>>>> 081b12d (changes)
}