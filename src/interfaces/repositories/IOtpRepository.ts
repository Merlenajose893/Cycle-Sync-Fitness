import type { OtpType,UserType,IOtp } from "../../models/Otp.js";
import type { IBaseRepository } from "./IBaseRepository.js";

export interface IOtpRepository extends IBaseRepository<IOtp>{
    createOtp(userId:string,userType:UserType,email:string,otp:string,type:OtpType):Promise<IOtp|null>;
    findOtp(userId:string,type:OtpType):Promise<IOtp|null>
    deleteOtp(userId:string,type:OtpType):Promise<void>

}