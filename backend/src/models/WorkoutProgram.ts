import type { CyclePhase, WorkoutCategory } from "../constants/workout.js";

export interface ITargetExercise{
    exerciseName:string;
    category:WorkoutCategory;
    targetSets:number;
    targetReps:number;
    targetWeightKg?:number;
    restSeconds:number;
    notes?:string
}

export interface IWorkoutProgramDay{
    dayNumber:number;
    title:string;
    focusPhase:CyclePhase;
    exercise:ITargetExercise[];
}

