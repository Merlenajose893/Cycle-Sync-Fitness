import { injectable,inject } from "tsyringe";

import type { Response } from "express";

import type { IUserAuthService } from "../interfaces/services/IUserAuthService.js";
import type { IUserRepository } from "../interfaces/repositories/IUserRepository.js";
import type { IOtpRepository } from "../interfaces/repositories/IOtpRepository.js";
import type { IEmailService } from "../interfaces/services/IEmailService.js";
import type { ITokenService } from "../interfaces/services/ITokenService.js";
import { TOKENS } from "../container/tokens.js";
import bcrypt from "bcryptjs";
import { ConflictError, NotFoundError } from "../errors/index.js";

import type { ForgotPasswordDTO, ForgotPasswordResponseDTO, LogoutDTO, RegisterUserDTO, ResendOTPDTO, ResetPasswordDTO, VerifyOtpDTO, VerifyResetOtpDTO, } from "../dtos/auth.dto.js";



import type { IUser } from "../models/User.js";
import type { IOtpService } from "../interfaces/services/IOtpService.js";
import type { LoginDTO } from "../dtos/auth.dto.js";
// import type { IUser } from "../models/User.js";
import { UnauthorizedError,BadRequestError } from "../errors/index.js";
@injectable()
export class UserAuthService implements IUserAuthService{
    constructor(@inject(TOKENS.IUserRepository) private userRepository:IUserRepository,
    @inject(TOKENS.IOtpRepository)
    private otpRepository:IOtpRepository,
    @inject(TOKENS.IEmailService)
    private emailService:IEmailService,
    @inject(TOKENS.ITokenService)
    private tokenService:ITokenService,
    @inject(TOKENS.IOtpService)
    private otpService:IOtpService

){}

async registerUser(data: RegisterUserDTO,res:Response): Promise<IUser> {
    const existingUser=await this.userRepository.findByEmail(data.email);
    if(existingUser)
    {
        throw new ConflictError("User already exists")
    }
    const hashedPassword=await bcrypt.hash(data.password,10);
    const user=await this.userRepository.create({
        firstName:data.firstName,
        lastName:data.lastName,
        email:data.email,
        password:hashedPassword,
        role:"user"
    })

    const ans=await this.otpService.createAndSentOtp(
        user._id.toString(),
        "user",
        user.email,
        "email-verification"
    )
    console.log(ans);
    
return user;
}

verifyEmailOTP=async(data: VerifyOtpDTO,res:Response): Promise<IUser>=> {
    await this.otpService.verifyOtp(data.userId,"email-verification",data.otp);
    const user=await this.userRepository.findById(data.userId);
    if(!user)
    {
        throw new NotFoundError("User not found")
    }
    user.isEmailVerified=true;
    await this.userRepository.save(user);
    await this.tokenService.generateAndSetAccessToken({userId:user._id.toString(),role:user.role},res)

await this.tokenService.generateAndSetRefreshToken({userId:user._id.toString(),role:user.role},res)

return user;

}

resendOTP=async(data: ResendOTPDTO): Promise<void> =>{
    const user=await this.userRepository.findById(data.userId)
    if(!user)
    {
        throw new NotFoundError("User not found");
    }

    if(user.isEmailVerified)
    {
        throw new BadRequestError("Email already verified")
    }

    await this.otpService.resendOTP(
        user._id.toString(),
        "user",
        user.email,
        "email-verification"
    )
}

loginUser=async(data: LoginDTO,res:Response): Promise<IUser>=> {
   const user=await this.userRepository.findByEmail(data.email);
   if(!user)
    {
        throw new UnauthorizedError("Invalid credentials")
    } 
if(!user.isEmailVerified)
{
    throw new BadRequestError("Email not verified")
}
if(!user.password)
{
    throw new UnauthorizedError("Password not found");
}
const isPassword=await bcrypt.compare(data.password,user.password);

if(!isPassword)
{
    throw new UnauthorizedError("Password not valid")
}
await this.tokenService.generateAndSetAccessToken({userId:user._id.toString(),role:user.role},res);
await this.tokenService.generateAndSetRefreshToken({userId:user._id.toString(),role:user.role},res)

return user;
}



logoutuser=async(data: LogoutDTO,res:Response): Promise<void> =>{

    await this.tokenService.clearTokens(data.userId,res)
}



refreshToken=async(refreshToken: string, res: Response): Promise<void> =>{
    if(!refreshToken)
    {
        throw new UnauthorizedError("Refresh token missing");
    }

    await this.tokenService.refreshTokens(refreshToken,res)
}


forgotPassword=async (data: ForgotPasswordDTO, res: Response): Promise<ForgotPasswordResponseDTO>=> {
    const user=await this.userRepository.findByEmail(data.email);
    if(!user)
    {
        throw new NotFoundError("User not Found");
    }
    const ans=await this.otpService.createAndSentOtp(user._id.toString(),"user",user.email,"password-reset");
    console.log(ans);

    return{
        userId:user._id.toString(),
        email:user.email,
        message:"Forgot Password sent successfully"
    }
    
}

resetPassword=async(data: ResetPasswordDTO, res: Response): Promise<void>=> {
    await this.otpService.verifyOtp(data.userId,"password-reset",data.otp);
    const user=await this.userRepository.findById(data.userId);
    if(!user)
    {
        throw new NotFoundError("User not found");
    }

    const hashedPassword=await bcrypt.hash(data.newPassword,10);
    user.password=hashedPassword;
    await this.userRepository.save(user)
}
}



