import mongoose,{Schema,Document} from "mongoose";

export type OtpType='email-verification'|'password-reset'
export type UserType='user'|'trainer';


export interface IOtp extends Document{
    userId:mongoose.Types.ObjectId;
    userType:UserType;
    email:string;
    otp:string;
    type:OtpType;
    createdAt:Date;
    expiresAt:Date;
}

const OtpSchema =new mongoose.Schema<IOtp>({
userId:{
    type:Schema.Types.ObjectId,required:true
},
userType:{
    type:String,enum:['user','trainer'],required:true
},
email:{
    type:String,required:true
},
otp:{
    type:String,required:true
},
type:{
    type:String,enum:['email-verification','password-reset'],required:true
},
expiresAt:{
    type:Date,required:true
}
},{timestamps:true})

export const otpModel=mongoose.model<IOtp>('Otp',OtpSchema)