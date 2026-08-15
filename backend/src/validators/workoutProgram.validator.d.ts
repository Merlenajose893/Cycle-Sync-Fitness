import { z } from "zod";
import { WorkoutCategory, CyclePhase, WorkoutDifficulty, WorkoutGoal } from "../constants/workout.js";
export declare const workoutExerciseSchema: z.ZodObject<{
    exerciseName: z.ZodString;
    category: z.ZodEnum<typeof WorkoutCategory>;
    targetSets: z.ZodNumber;
    targetReps: z.ZodString;
    targetWeightKg: z.ZodOptional<z.ZodNumber>;
    restSeconds: z.ZodNumber;
    notes: z.ZodOptional<z.ZodString>;
}, z.core.$strip>;
export declare const workoutDaySchema: z.ZodObject<{
    dayNumber: z.ZodNumber;
    title: z.ZodString;
    focusPhase: z.ZodOptional<z.ZodEnum<typeof CyclePhase>>;
    exercises: z.ZodArray<z.ZodObject<{
        exerciseName: z.ZodString;
        category: z.ZodEnum<typeof WorkoutCategory>;
        targetSets: z.ZodNumber;
        targetReps: z.ZodString;
        targetWeightKg: z.ZodOptional<z.ZodNumber>;
        restSeconds: z.ZodNumber;
        notes: z.ZodOptional<z.ZodString>;
    }, z.core.$strip>>;
}, z.core.$strip>;
export declare const createProgramSchema: z.ZodObject<{
    title: z.ZodString;
    description: z.ZodString;
    durationWeeks: z.ZodDefault<z.ZodOptional<z.ZodNumber>>;
    daysPerWeek: z.ZodDefault<z.ZodOptional<z.ZodNumber>>;
    difficulty: z.ZodDefault<z.ZodOptional<z.ZodEnum<typeof WorkoutDifficulty>>>;
    goal: z.ZodDefault<z.ZodOptional<z.ZodEnum<typeof WorkoutGoal>>>;
    days: z.ZodDefault<z.ZodOptional<z.ZodArray<z.ZodObject<{
        dayNumber: z.ZodNumber;
        title: z.ZodString;
        focusPhase: z.ZodOptional<z.ZodEnum<typeof CyclePhase>>;
        exercises: z.ZodArray<z.ZodObject<{
            exerciseName: z.ZodString;
            category: z.ZodEnum<typeof WorkoutCategory>;
            targetSets: z.ZodNumber;
            targetReps: z.ZodString;
            targetWeightKg: z.ZodOptional<z.ZodNumber>;
            restSeconds: z.ZodNumber;
            notes: z.ZodOptional<z.ZodString>;
        }, z.core.$strip>>;
    }, z.core.$strip>>>>;
    isTemplate: z.ZodOptional<z.ZodBoolean>;
}, z.core.$strip>;
export declare const updateProgramSchema: z.ZodObject<{
    title: z.ZodOptional<z.ZodString>;
    description: z.ZodOptional<z.ZodString>;
    durationWeeks: z.ZodOptional<z.ZodDefault<z.ZodOptional<z.ZodNumber>>>;
    daysPerWeek: z.ZodOptional<z.ZodDefault<z.ZodOptional<z.ZodNumber>>>;
    difficulty: z.ZodOptional<z.ZodDefault<z.ZodOptional<z.ZodEnum<typeof WorkoutDifficulty>>>>;
    goal: z.ZodOptional<z.ZodDefault<z.ZodOptional<z.ZodEnum<typeof WorkoutGoal>>>>;
    days: z.ZodOptional<z.ZodDefault<z.ZodOptional<z.ZodArray<z.ZodObject<{
        dayNumber: z.ZodNumber;
        title: z.ZodString;
        focusPhase: z.ZodOptional<z.ZodEnum<typeof CyclePhase>>;
        exercises: z.ZodArray<z.ZodObject<{
            exerciseName: z.ZodString;
            category: z.ZodEnum<typeof WorkoutCategory>;
            targetSets: z.ZodNumber;
            targetReps: z.ZodString;
            targetWeightKg: z.ZodOptional<z.ZodNumber>;
            restSeconds: z.ZodNumber;
            notes: z.ZodOptional<z.ZodString>;
        }, z.core.$strip>>;
    }, z.core.$strip>>>>>;
    isTemplate: z.ZodOptional<z.ZodOptional<z.ZodBoolean>>;
}, z.core.$strip>;
//# sourceMappingURL=workoutProgram.validator.d.ts.map