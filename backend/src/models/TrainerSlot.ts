import { Schema, Types } from "mongoose";
import type { TrainerSlots } from "../constants/TrainerSlots.ts";
export interface ITrainerSlot{
    trainerId:Types.ObjectId;
    startAt:Date;
    endAt:Date;
    status:TrainerSlots;
    bookingId?:Types.ObjectId;
    notes?:string;
    createdAt:Date;
    updatedAt:Date;
} 

const trainerslotschema=new Schema<ITrainerSlot>({
    trainerId:{
        type:Schema.Types.ObjectId,
        ref:"Trainer",
        required:true

    }
})