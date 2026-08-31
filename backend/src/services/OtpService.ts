import { injectable,inject } from "tsyringe";
import type { IOtpService } from "../interfaces/services/IOtpService.ts";
import type { IOtpRepository } from "../interfaces/repositories/IOtpRepository.ts";
import type { IEmailService } from "../interfaces/services/IEmailService.ts";
import bcrypt from "bcryptjs";
// import { UnauthorizedError } from "../errors/index.ts";
import { TOKENS } from "../container/tokens.ts";
import type { OtpType,UserType } from "../models/Otp.ts";
import type { OtpRepository } from "../repositories/OtpRepository.ts";
import { BadRequestError, NotFoundError } from "../errors/index.ts";
import { LoginTicket } from "google-auth-library";
@injectable()
export class OtpService implements IOtpService{
    constructor(@inject (TOKENS.IOtpRepository) private otpRepository:IOtpRepository,@inject(TOKENS.IEmailService) private emailService:IEmailService){}

    createAndSentOtp=async(userId: string, userType: UserType, email: string, type: OtpType): Promise<void> =>{
    //    const otp=Math.floor(10000+Math.random()*900000).toString();
    const otp =
  Math.floor(
    100000 + Math.random() * 900000
  ).toString();
       console.log(otp);
       
       const hashedOtp=await bcrypt.hash(otp,10);
       await this.otpRepository.createOtp(
        userId,
        userType,
        email,
        hashedOtp,
        type

       ) 
       await this.emailService.sendOtpEmail(email,otp)
    }

    verifyOtp=async(userId: string, type: OtpType, otp: string): Promise<void>=> {
        const existOtp=await this.otpRepository.findOtp(userId,type);
        
        if(!existOtp)
        {
            throw new NotFoundError("OTP not found")
        }
        if(existOtp.expiresAt<new Date())
        {
            throw new BadRequestError("Otp expired")
        }
        const otpValid=await bcrypt.compare(otp,existOtp.otp)
        if(!otpValid)
        {
            throw new BadRequestError("Invalid OTP")
        }

        await this.otpRepository.deleteOtp(userId,type)
    }

    resendOTP=async(userId: string, userType: UserType, email: string, type: OtpType): Promise<void> =>{
       const ans= await this.createAndSentOtp(userId,userType,email,type)
       console.log(ans);
       
    }
}

