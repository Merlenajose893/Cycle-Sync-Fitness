import type { CreateProgramDTO, UpdateProgramDTO } from "../../dtos/workout.dto.js";
import type { IWorkoutProgram } from "../../models/WorkoutProgram.js";

export interface IWorkoutProgramService{
    createProgram(trainerId:string,data:CreateProgramDTO):Promise<IWorkoutProgram>;
    updateProgram(trainerId:string,data:UpdateProgramDTO):Promise<IWorkoutProgram>;
    deleteProgram(trainerId:string,programId:string):Promise<void>;
    assignProgramtoUser(trainerId:string,programId:string,userId:string):Promise<IWorkoutProgram>;
    getTrainerPrograms(trainerId:string):Promise<IWorkoutProgram[]>;
    getUserActivePrograms(userId:string):Promise<IWorkoutProgram|null>;
}