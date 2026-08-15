import { z } from "zod";
import { WorkoutSource } from "../constants/workout.js";
export declare const loggedSetSchema: z.ZodObject<{
    setNumber: z.ZodNumber;
    repsCompleted: z.ZodNumber;
    weightKg: z.ZodNumber;
    rpe: z.ZodOptional<z.ZodNumber>;
    isCompleted: z.ZodBoolean;
}, z.core.$strip>;
export declare const loggedExerciseSchema: z.ZodObject<{
    exerciseName: z.ZodString;
    category: z.ZodString;
    sets: z.ZodArray<z.ZodObject<{
        setNumber: z.ZodNumber;
        repsCompleted: z.ZodNumber;
        weightKg: z.ZodNumber;
        rpe: z.ZodOptional<z.ZodNumber>;
        isCompleted: z.ZodBoolean;
    }, z.core.$strip>>;
}, z.core.$strip>;
export declare const logWorkoutSchema: z.ZodObject<{
    date: z.ZodOptional<z.ZodString>;
    source: z.ZodDefault<z.ZodOptional<z.ZodEnum<typeof WorkoutSource>>>;
    programId: z.ZodOptional<z.ZodString>;
    workoutProgramId: z.ZodOptional<z.ZodString>;
    workoutTitle: z.ZodString;
    durationMinutes: z.ZodCoercedNumber<unknown>;
    caloriesBurned: z.ZodDefault<z.ZodOptional<z.ZodCoercedNumber<unknown>>>;
    exercises: z.ZodPreprocess<z.ZodDefault<z.ZodOptional<z.ZodArray<z.ZodObject<{
        exerciseName: z.ZodString;
        category: z.ZodString;
        sets: z.ZodArray<z.ZodObject<{
            setNumber: z.ZodNumber;
            repsCompleted: z.ZodNumber;
            weightKg: z.ZodNumber;
            rpe: z.ZodOptional<z.ZodNumber>;
            isCompleted: z.ZodBoolean;
        }, z.core.$strip>>;
    }, z.core.$strip>>>>>;
    notes: z.ZodOptional<z.ZodString>;
    imageUrl: z.ZodOptional<z.ZodString>;
}, z.core.$strip>;
//# sourceMappingURL=workoutLog.validator.d.ts.map