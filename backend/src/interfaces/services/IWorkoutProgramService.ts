import type { CreateProgramDTO, UpdateProgramDTO } from "../../dtos/workout.dto.ts";
import type { IWorkoutProgram } from "../../models/WorkoutProgram.ts";

export interface IWorkoutProgramService{
    createProgram(trainerId:string,data:CreateProgramDTO):Promise<IWorkoutProgram|null>;
    updateProgram(trainerId:string,programId:string,data:UpdateProgramDTO):Promise<IWorkoutProgram|null>;
    deleteProgram(trainerId:string,programId:string):Promise<void>;
    assignProgramtoUser(trainerId:string,programId:string,userId:string):Promise<IWorkoutProgram|null>;
    getTrainerPrograms(trainerId:string):Promise<IWorkoutProgram[]>;
    getUserActivePrograms(userId:string):Promise<IWorkoutProgram|null>;
}