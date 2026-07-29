import { WorkoutSource } from "../constants/workout.js";
import mongoose, { Schema,Document,Types } from "mongoose";
export interface ILoggedSet {
setNumber:number;
repsCompleted:number;
weightKg:number;
rpe?:number;
isCompleted:boolean;

}

export interface ILoggedExercise {
exerciseName:string;
category:string;
sets:ILoggedSet[];

}

export interface IWorkoutLog extends Document {


userId:Types.ObjectId;


date:Date;


source:WorkoutSource;


programId?:Types.ObjectId;


workoutTitle:string;


durationMinutes:number;


totalVolumeKg:number;


totalSetsCompleted:number;


exercises:ILoggedExercise[];


notes?:string;


createdAt:Date;


updatedAt:Date;

}


const LoggedSetSchema =
new Schema<ILoggedSet>(
{

setNumber:{
 type:Number,
 required:true
},


repsCompleted:{
 type:Number,
 required:true,
 min:0
},


weightKg:{
 type:Number,
 required:true,
 min:0
},


rpe:{
 type:Number,
 min:1,
 max:10
},


isCompleted:{
 type:Boolean,
 default:false
}

},
{
_id:false
}

);

const LoggedExerciseSchema =
new Schema<ILoggedExercise>(
{

exerciseName:{
type:String,
required:true
},


category:{
type:String,
required:true
},


sets:[
 LoggedSetSchema
]

},
{
_id:false
}

);


const WorkoutLogSchema =
new Schema<IWorkoutLog>(
{

userId:{
type:Schema.Types.ObjectId,
ref:"User",
required:true
},


date:{
type:Date,
required:true
},


source:{
type:String,
enum:Object.values(WorkoutSource),
required:true
},



programId:{
type:Schema.Types.ObjectId,
ref:"WorkoutProgram"
},


workoutTitle:{
type:String,
required:true
},


durationMinutes:{
type:Number,
required:true,
min:0
},


totalVolumeKg:{
type:Number,
default:0
},


totalSetsCompleted:{
type:Number,
default:0
},


exercises:[
 LoggedExerciseSchema
],


notes:String


},
{
timestamps:true
}

);

export const WorkoutLog=mongoose.model<IWorkoutLog>("WorkoutLog",WorkoutLogSchema)