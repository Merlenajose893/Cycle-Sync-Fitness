import { z } from "zod";

import {
    WorkoutSource
} from "../constants/workout.js"


export const loggedSetSchema =
z.object({

    setNumber:
        z.number()
        .min(1),


    repsCompleted:
        z.number()
        .min(0),


    weightKg:
        z.number()
        .min(0),


    rpe:
        z.number()
        .min(1)
        .max(10)
        .optional(),


    isCompleted:
        z.boolean()

});

export const loggedExerciseSchema =
z.object({

    exerciseName:
        z.string()
        .min(2),


    category:
        z.string(),


    sets:
        z.array(loggedSetSchema)
        .min(1)

});

export const logWorkoutSchema =
z.object({

    date:
        z.string()
        .optional(),


    source:
        z.nativeEnum(WorkoutSource)
        .optional()
        .default(WorkoutSource.TRAINER_PROGRAM),


    programId:
        z.string()
        .optional(),

    workoutProgramId:
        z.string()
        .optional(),


    workoutTitle:
        z.string()
        .min(1, "Workout title is required"),


    durationMinutes:
        z.coerce.number()
        .min(1),

    caloriesBurned:
        z.coerce.number()
        .optional()
        .default(0),


    exercises:
        z.preprocess((val) => {
            if (typeof val === "string") {
                try { return JSON.parse(val); } catch (e) { return []; }
            }
            return val;
        }, z.array(loggedExerciseSchema).optional().default([])),


    notes:
        z.string()
        .optional(),

    imageUrl:
        z.string()
        .optional()

});