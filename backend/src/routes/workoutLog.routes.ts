import { Router } from "express";
import { container } from "tsyringe";
import { WorkoutLogController } from "../controllers/WorkoutLogController.ts";
import { authMiddleware } from "../middlewares/authMiddleware.ts";
import { roleMiddleware } from "../middlewares/roleMiddleWare.ts";
import { validate } from "../middlewares/validate.ts";
import { logWorkoutSchema } from "../validators/workoutLog.validator.ts";

import { upload } from "../middlewares/upload.ts";

const router = Router();
const workoutLogController = container.resolve(WorkoutLogController);

// POST   /api/workout-logs                        — Log a new workout
router.post("/", authMiddleware, upload.single("image"), validate(logWorkoutSchema), workoutLogController.logWorkout);

// GET    /api/workout-logs/daily                  — Get daily workout log (?date=YYYY-MM-DD)
router.get("/daily", authMiddleware, workoutLogController.getDailyLog);

// GET    /api/workout-logs/history                — Get workout history with pagination (?page=1&limit=10)
router.get("/history", authMiddleware, workoutLogController.getWorkoutHistory);

// GET    /api/workout-logs/exercise/:exerciseName — Get history for a specific exercise
router.get("/exercise/:exerciseName", authMiddleware, workoutLogController.getExerciseHistory);

// GET    /api/workout-logs/client/:clientId       — Get workout logs of a client for trainer
router.get("/client/:clientId", authMiddleware, roleMiddleware("trainer"), workoutLogController.getClientWorkoutLogs);

export default router;
