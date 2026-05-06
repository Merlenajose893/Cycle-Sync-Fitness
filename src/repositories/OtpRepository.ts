import mongoose from "mongoose";
import type { OtpType,UserType,IOtp } from "../models/Otp.js";
import { otpModel } from "../models/Otp.js";
import type { IOtpRepository } from "../interfaces/repositories/IOtpRepository.js";


export class OtpRepository implements IOtpRepository{

    async createOtp(userId:string,userType:UserType,email:string,otp:string,type:OtpType):Promise<IOtp|null>
    {
        await otpModel.deleteOne({userId: new mongoose.Types.ObjectId(userId),type})
        const expiresAt=new Date(Date.now()+10*60*1000)

        await otpModel.create({
            userId:new mongoose.Types.ObjectId(userId),
            userType,
            email,
            otp,
            type,
            expiresAt
        });

        return otp
    }

    async findOtp(userId:string,type:OtpType)
    {
        return otpModel.findOne({
            userId:new mongoose.Types.ObjectId(userId),
            type
        })
    }

    async verifyOtp(userId:string,type:OtpType,rawOtp:string):Promise<IOtp|null>
    {
        const record=await this.findOtp(userId,type);
        if(!record)
        {
            throw new Error("No Otp found")
        };
        if(record.expiresAt<new Date())
        {
            throw new Error("Otp has expired")
        }

        if(record.otp!==rawOtp)
        {
            throw new Error("Otp is not matched")
        }

        return true;
    }


    async deleteOtp(userId:string,type:OtpType):Promise<void>
    {
         await otpModel.deleteOne({userId:new mongoose.Types.ObjectId(userId),type})
    }
}