import {z } from "zod";
import { WorkoutCategory,CyclePhase,WorkoutDifficulty,WorkoutGoal } from "../constants/workout.js";
export const workoutExerciseSchema = z.object({

    exerciseName:
        z.string()
        .min(2, "Exercise name required"),


    category:
        z.nativeEnum(WorkoutCategory),


    targetSets:
        z.number()
        .min(1),


    targetReps:
        z.string()
        .min(1),


    targetWeightKg:
        z.number()
        .min(0)
        .optional(),


    restSeconds:
        z.number()
        .min(0),


    notes:
        z.string()
        .optional()

});

export const workoutDaySchema = z.object({

    dayNumber:
        z.number()
        .min(1),


    title:
        z.string()
        .min(2),


    focusPhase:
        z.nativeEnum(CyclePhase)
        .optional(),


    exercises:
        z.array(workoutExerciseSchema)
        .min(1)

});

export const createProgramSchema = z.object({

    title:
        z.string()
        .min(3),


    description:
        z.string()
        .min(5),


    durationWeeks:
        z.number()
        .min(1),


    daysPerWeek:
        z.number()
        .min(1)
        .max(7),


    difficulty:
        z.nativeEnum(WorkoutDifficulty),


    goal:
        z.nativeEnum(WorkoutGoal),


    days:
        z.array(workoutDaySchema)
        .min(1),


    isTemplate:
        z.boolean()
        .optional()

});

export const updateProgramSchema =
createProgramSchema.partial();