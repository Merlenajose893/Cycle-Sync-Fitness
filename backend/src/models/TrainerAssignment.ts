import mongoose, { Schema, Types ,Document} from "mongoose";
import { TrainerAssignmentStatus } from "../constants/trainerassign.js";
export interface ITrainerAssignment extends Document{
userId:Types.ObjectId;
trainerId:Types.ObjectId;
paymentId:Types.ObjectId;
packageId:Types.ObjectId;
  assignmentStatus: TrainerAssignmentStatus;
  startDate: Date;
  endDate: Date;
  createdAt: Date;
  updatedAt: Date;
}


const TrainerAssignmentSchema = new Schema<ITrainerAssignment>({
  userId: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  trainerId: {
    type: Schema.Types.ObjectId,
    ref: "Trainer",
    required: true
  },
  paymentId: {
    type: Schema.Types.ObjectId,
    ref: "Payment",
    required: true
  },
  packageId: {
    type: Schema.Types.ObjectId,
    ref: "TrainerPackage",
    required: true
  },
  assignmentStatus: {
    type: String,
    enum: Object.values(TrainerAssignmentStatus),
    default: TrainerAssignmentStatus.ACTIVE
  },
startDate:{
type:Date,
required:true
},
endDate:{
type:Date,
required:true
}
},{timestamps:true})

export const TrainerAssignment=mongoose.model<ITrainerAssignment>('TrainerAssignment',TrainerAssignmentSchema)