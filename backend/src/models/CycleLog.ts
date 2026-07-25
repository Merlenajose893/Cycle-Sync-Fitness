import mongoose, { Schema,  Types,Document } from "mongoose";
import { FlowIntensity } from "../constants/health.constant.js";


export interface ICycleLog extends Document{
    userId:Types.ObjectId;
    startDate:Date;
    endDate?:Date;
    flowIntensity:FlowIntensity;
    notes?:string;
    createdAt:Date;
    updatedAt:Date;
}

const CycleLogSchema=new Schema<ICycleLog>({
userId:{
type:Schema.Types.ObjectId,
ref:"User",
required:true
},
startDate:{
type:Date,
required:true
},
endDate:{
type:Date
},
flowIntensity:{
type:String,
enum:Object.values(FlowIntensity),
required:true
},
notes:{
type:String,

}


},{timestamps:true})


export const CycleLog=mongoose.model<ICycleLog>("CycleLog",CycleLogSchema);