import type { IRecipe } from "../models/Recpe.ts";
import type { ITrainerPackage } from "../models/Trainer.ts";
import type { ITrainerAssignment } from "../models/TrainerAssignment.ts";
import type { IWorkoutProgram } from "../models/WorkoutProgram.ts";

export interface ProgramTrackerResponseDTO{
    assignment:ITrainerAssignment;
    package:ITrainerPackage;
    recipes:IRecipe[];
    workouts:IWorkoutProgram[]
}