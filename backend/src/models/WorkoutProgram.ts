import { WorkoutCategory, CyclePhase,WorkoutDifficulty,WorkoutGoal, } from "../constants/workout.ts";
import mongoose, { Schema, Document,Types } from "mongoose";

export interface ITargetExercise {
    exerciseName: string;
    category: WorkoutCategory;
    targetSets: number;
    targetReps: number;
    targetWeightKg?: number;
    restSeconds: number;
    notes?: string
}

export interface IWorkoutProgramDay {
    dayNumber: number;
    title: string;
    focusPhase?: CyclePhase;
    exercises: ITargetExercise[];
}

export interface IWorkoutProgram extends Document {
    trainerId: Types.ObjectId;
    title: string;
    description: string;
    durationWeeks: number;
    daysPerWeek: number;
    difficulty: WorkoutDifficulty;
    goal: WorkoutGoal;
    days: IWorkoutProgramDay[];
    isTemplate: boolean;
    assignedUserId?: Types.ObjectId;
    isArchived: boolean;
    createdAt: Date;
    updatedAt: Date;
}

const targetExerciseSchema = new Schema<ITargetExercise>({
    exerciseName: {
        type: String,
        required: true
    },
    category: {
        type: String,
        enum: Object.values(WorkoutCategory),
        required: true
    },
    targetSets: {
        type: Number,
        required: true,
        min: 1
    },
    targetReps: {
        type: Number,
        required: true
    },
    targetWeightKg: {
        type: Number,
        required: true
    },
    restSeconds: {
        type: Number,
        required: true,
        min: 0
    },
    notes: {
        type: String
    }

}, { _id: false })

const WorkoutDaySchema =
    new Schema<IWorkoutProgramDay>(
        {

            dayNumber: {
                type: Number,
                required: true
            },


            title: {
                type: String,
                required: true
            },


            focusPhase: {
                type: String,
                enum: Object.values(CyclePhase)
            },


            exercises: [
                targetExerciseSchema
            ]


        },
        {
            _id: false
        }

    );

    const WorkoutProgramSchema =
new Schema<IWorkoutProgram>(
{

trainerId:{
    type:Schema.Types.ObjectId,
    ref:"Trainer",
    required:true
},


title:{
    type:String,
    required:true,
    trim:true
},


description:{
    type:String,
    required:true
},


durationWeeks:{
    type:Number,
    required:true,
    min:1
},


daysPerWeek:{
    type:Number,
    required:true,
    min:1,
    max:7
},


difficulty:{
    type:String,
    enum:Object.values(WorkoutDifficulty),
    required:true
},


goal:{
    type:String,
    enum:Object.values(WorkoutGoal),
    required:true
},


days:[
    WorkoutDaySchema
],


isTemplate:{
    type:Boolean,
    default:false
},


assignedUserId:{
    type:Schema.Types.ObjectId,
    ref:"User"
},


isArchived:{
    type:Boolean,
    default:false
}


},
{
timestamps:true
}

);

export const WorkoutProgram =mongoose.model<IWorkoutProgram>("WorkoutProgram",WorkoutProgramSchema)