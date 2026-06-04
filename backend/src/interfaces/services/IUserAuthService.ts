import type { RegisterUserDTO,LoginDTO,VerifyOtpDTO, LogoutDTO, ResendOTPDTO } from "../../dtos/auth.dto.js";

import type { IUser } from "../../models/User.js";

export interface IUserAuthService{
    registerUser(data:RegisterUserDTO):Promise<IUser>;
    loginUser(data:LoginDTO):Promise<IUser>;
    verifyEmailOTP(data:VerifyOtpDTO):Promise<IUser>;
    logoutuser(data:LogoutDTO):Promise<IUser>;
    resendOTP(data:ResendOTPDTO):Promise<void>;
    refreshToken(refreshToken:string,res:Response):Promise<void>
}