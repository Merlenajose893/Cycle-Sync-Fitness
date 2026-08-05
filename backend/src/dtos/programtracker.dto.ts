import type { IRecipe } from "../models/Recpe.js";
import type { ITrainerPackage } from "../models/Trainer.js";
import type { ITrainerAssignment } from "../models/TrainerAssignment.js";
import type { IWorkoutProgram } from "../models/WorkoutProgram.js";

export interface ProgramTrackerResponseDTO{
    assignment:ITrainerAssignment;
    package:ITrainerPackage;
    recipes:IRecipe[];
    workouts:IWorkoutProgram[]
}