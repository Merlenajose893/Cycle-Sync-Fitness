import { injectable,inject } from "tsyringe";

import type { Response } from "express";

import type { IUserAuthService } from "../interfaces/services/IUserAuthService.ts";
import type { IUserRepository } from "../interfaces/repositories/IUserRepository.ts";
import type { IOtpRepository } from "../interfaces/repositories/IOtpRepository.ts";
import type { IEmailService } from "../interfaces/services/IEmailService.ts";
import type { ITokenService } from "../interfaces/services/ITokenService.ts";
import { TOKENS } from "../container/tokens.ts";
import bcrypt from "bcryptjs";
import { ConflictError, ForbiddenError, NotFoundError } from "../errors/index.ts";

import type { ForgotPasswordDTO, ForgotPasswordResponseDTO, LogoutDTO, RegisterUserDTO, RegisterUserResponse, ResendOTPDTO, ResetPasswordDTO, VerifyOtpDTO, VerifyResetOtpDTO, } from "../dtos/auth.dto.ts";



import type { IUser } from "../models/User.ts";
import type { IOtpService } from "../interfaces/services/IOtpService.ts";
import type { LoginDTO } from "../dtos/auth.dto.ts";
// import type { IUser } from "../models/User.ts";
import { UnauthorizedError,BadRequestError } from "../errors/index.ts";
import { OAuth2Client } from "google-auth-library";
import { UserAuthMapper } from "../mappers/UserAuthMapper.ts";
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

async registerUser(data: RegisterUserDTO,res:Response): Promise<RegisterUserResponse> {
    const existingUser=await this.userRepository.findByEmail(data.email);
    if(existingUser)
    {
        throw new ConflictError("User already exists")
    }
    const hashedPassword=await bcrypt.hash(data.password,10);
    const userData=UserAuthMapper.toRegisterUser(data);
    const user=await this.userRepository.create({
        ...userData,
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
    
 return UserAuthMapper.toRegisterResponse(user)
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
googleSignIn=async (idToken:string,res:Response):Promise<IUser>=>{
const client=new OAuth2Client(process.env.GOOGLE_CLIENT_ID);
const ticket=await client.verifyIdToken({
    idToken,audience:process.env.GOOGLE_CLIENT_ID!,
});
const payload=ticket.getPayload();
if(!payload)
{
    throw new BadRequestError("Invalid Google token");
}
const {sub:googleId,email,given_name,family_name,picture,email_verified}=payload;
if(!email ||!googleId)
{
    throw new BadRequestError("Google token missing email")
}
if(!email_verified)
{
    throw new BadRequestError("Google Email is not verified")
}
let user=await this.userRepository.findByGoogleId(googleId)
if(!user)
{
    user=await this.userRepository.findByEmail(email);

    if(user)
    {
        user.googleId=googleId;
        user.isEmailVerified=true;
        await this.userRepository.save(user);

    }
    else
    {
        user=await this.userRepository.create({
            firstName:given_name||"User",
            lastName:family_name||"",
            email:email,
            googleId:googleId,
            isEmailVerified:true,
            avatarUrl:picture!,
            onboardingStep: 1,
            onboardingComplete: false,
        })
    }
    
}
await this.tokenService.generateAndSetAccessToken({userId:user._id.toString(),role:user.role},res);
await this.tokenService.generateAndSetRefreshToken({userId:user._id.toString(),role:user.role},res)
return user;
}
resendOTP=async(data: ResendOTPDTO,res:Response): Promise<void> =>{
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

if(user.isDeleted)
{
    throw new ForbiddenError("Your account is blokced")
}


// const isPassword=await bcrypt.compare(data.password,user.password!);

const isPassword=await bcrypt.compare(data.password,user.password!);
// console.log(isPassword);



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
    let userId = data.userId;
    if (data.userId && data.userId.includes("@")) {
        const user = await this.userRepository.findByEmail(data.userId);
        if (!user) {
            throw new NotFoundError("User not found");
        }
        userId = user._id.toString();
    }
    await this.otpService.verifyOtp(userId,"password-reset",data.otp);
    const user=await this.userRepository.findById(userId);
    if(!user)
    {
        throw new NotFoundError("User not found");
    }

    const hashedPassword=await bcrypt.hash(data.newPassword,10);
    user.password=hashedPassword;
    await this.userRepository.save(user)
}


getCurrentUser=async(userId: string): Promise<IUser> =>{
    const user=await this.userRepository.findById(userId);
    if(!user)
    {
        throw new NotFoundError("User not found");
    }
    return user;
}

}



