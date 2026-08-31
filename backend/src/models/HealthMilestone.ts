import mongoose, { Document,Schema,Types } from "mongoose";
import { HealthMilestoneType } from "../constants/health.constant.ts";
export interface IHealthMilestone extends Document{
userId:Types.ObjectId;
milestoneType:HealthMilestoneType;
title:string;
description:string;
badgeIcon:string;
achievedAt:Date;

}

const HealthMilestoneSchema=new Schema<IHealthMilestone>({
    userId:{
        type:Schema.Types.ObjectId,
        ref:"User",
        required:true

    },
    milestoneType:{
        type:String,
        enum:Object.values(HealthMilestoneType),
        required:true
    },
    title:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    badgeIcon:{
        type:String,
        required:true
    },
    achievedAt:{
        type:Date,
        required:true
    }
})

export const HealthMilestone=mongoose.model<IHealthMilestone>("HealthMileStone",HealthMilestoneSchema)