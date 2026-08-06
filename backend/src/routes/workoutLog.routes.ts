import { Router } from "express";
import { container } from "tsyringe";
import { WorkoutLogController } from "../controllers/WorkoutLogController.js";
import { authMiddleware } from "../middlewares/authMiddleware.js";
import { roleMiddleware } from "../middlewares/roleMiddleWare.js";
import { validate } from "../middlewares/validate.js";
import { logWorkoutSchema } from "../validators/workoutLog.validator.js";

const router = Router();
const workoutLogController = container.resolve(WorkoutLogController);

// POST   /api/workout-logs                        — Log a new workout
router.post("/", authMiddleware, validate(logWorkoutSchema), workoutLogController.logWorkout);

// GET    /api/workout-logs/daily                  — Get daily workout log (?date=YYYY-MM-DD)
router.get("/daily", authMiddleware, workoutLogController.getDailyLog);

// GET    /api/workout-logs/history                — Get workout history with pagination (?page=1&limit=10)
router.get("/history", authMiddleware, workoutLogController.getWorkoutHistory);

// GET    /api/workout-logs/exercise/:exerciseName — Get history for a specific exercise
router.get("/exercise/:exerciseName", authMiddleware, workoutLogController.getExerciseHistory);

// GET    /api/workout-logs/client/:clientId       — Get workout logs of a client for trainer
router.get("/client/:clientId", authMiddleware, roleMiddleware("trainer"), workoutLogController.getClientWorkoutLogs);

export default router;
