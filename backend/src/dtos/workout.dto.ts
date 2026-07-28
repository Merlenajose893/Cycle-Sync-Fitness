import type { CyclePhase, WorkoutCategory,WorkoutDifficulty,WorkoutGoal } from "../constants/workout.js";

export interface CreateWorkoutProgramDTO{
    exerciseName:string;
    category:WorkoutCategory;
    targetSets:number;
    targetReps:number;
    targetWeightkg?:number;
    restSeconds:number;
    notes?:string
}

export interface CreateProgramDayDTO{
    dayNumber:number;
    title:string;
    focusPhase?:CyclePhase;
    exercises:CreateWorkoutProgramDTO[]
}

export interface CreateProgramDTO {


    title:string;


    description:string;


    durationWeeks:number;


    daysPerWeek:number;


    difficulty:WorkoutDifficulty;


    goal:WorkoutGoal;


    days:CreateProgramDayDTO[];


    isTemplate?:boolean;

}

export interface UpdateProgramDTO {


    title?:string;


    description?:string;


    durationWeeks?:number;


    daysPerWeek?:number;


    difficulty?:WorkoutDifficulty;


    goal?:WorkoutGoal;


    days?:unknown[];


}

export interface AssignProgramDTO {

    userId:string;

}

export interface LoggedSetDTO {


    setNumber:number;


    repsCompleted:number;


    weightKg:number;


    rpe?:number;


    isCompleted:boolean;

}

export interface LoggedExerciseDTO {


    exerciseName:string;


    category:string;


    sets:LoggedSetDTO[];

}



export interface LogWorkoutDTO {


    date:string;


    source:WorkoutSource;


    programId?:string;


    workoutTitle:string;


    durationMinutes:number;


    exercises:LoggedExerciseDTO[];


    notes?:string;

}

export interface WorkoutProgramFilterDTO{
    difficulty?:WorkoutDifficulty;
    goals?:WorkoutGoal;
    durationWeeks?:number;
    daysPerWeek?:number;
    trainerId?:string
}