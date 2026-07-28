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
        z.string(),


    source:
        z.nativeEnum(WorkoutSource),


    programId:
        z.string()
        .optional(),


    workoutTitle:
        z.string()
        .min(2),


    durationMinutes:
        z.number()
        .min(1),


    exercises:
        z.array(loggedExerciseSchema)
        .min(1),


    notes:
        z.string()
        .optional()

});