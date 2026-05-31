import type { RegisterUserDTO,LoginDTO,VerifyOtpDTO, LogoutDTO } from "../../dtos/auth.dto.js";

import type { IUser } from "../../models/User.js";

export interface IUserAuthService{
    registerUser(data:RegisterUserDTO):Promise<IUser>;
    loginUser(data:LoginDTO):Promise<IUser>;
    verifyEmailOTP(data:VerifyOtpDTO):Promise<IUser>;
    logoutuser(data:LogoutDTO):Promise<IUser>;
    refreshToken(refreshToken:string,res:Response):Promise<void>
}