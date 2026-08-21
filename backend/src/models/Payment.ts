import mongoose, { Schema,Types,Document } from "mongoose";
import { PaymentMethod, PaymentStatus } from "../constants/payment.js";
export interface IPayment extends Document{
    paymentId:string;
    userId:Types.ObjectId;
    trainerId:Types.ObjectId;
    packageId:Types.ObjectId;
    stripeSessionId:string;
    amount:number;
    currency:string;
    paymentStatus:PaymentStatus;
    paymentMethod:PaymentMethod;
    createdAt:Date;
    updatedAt:Date;
}

const PaymentSchema=new Schema<IPayment>({
paymentId:{
    type:String,
    required:true
},
userId:{
    type:Schema.Types.ObjectId,
    ref:"User",
    required:true
},
trainerId:{
    type:Schema.Types.ObjectId,
    ref:"Trainer",
    required:true
},
packageId:{
type:Schema.Types.ObjectId,
ref:"TrainerPackage",
required:true
},
stripeSessionId:{
    type:String,
    required:true,
    unique:true
},
amount:{
type:Number,
required:true
},
currency:{
type:String,
required:true,
default:"INR"
},
paymentStatus:{
type:String,
enum:Object.values(PaymentStatus),
default:PaymentStatus.PENDING,
required:true
},
paymentMethod:{
type:String,
enum:Object.values(PaymentMethod),
required:false
}


},{timestamps:true});

export const Payment=mongoose.model<IPayment>("Payment",PaymentSchema);