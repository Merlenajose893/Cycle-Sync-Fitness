import type { OtpType,UserType,IOtp } from "../../models/Otp.js";

export interface IOtpRepository{
    createOtp(userId:string,userType:UserType,email:string,otp:string,type:OtpType):Promise<IOtp|null>;
    findOtp(userId:string,type:OtpType):Promise<IOtp|null>
    verifyOtp(userId:string,type:OtpType,rawOtp:string):Promise<IOtp|null>
    deleteOtp(userId:string,type:OtpType):Promise<void>

}