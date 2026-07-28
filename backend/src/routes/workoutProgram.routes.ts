import { Router } from "express";
import { container } from "tsyringe";
import { WorkoutProgramController } from "../controllers/WorkoutProgramController.js";
import { trainerAuthMiddleware } from "../middlewares/trainerAuthMiddleware.js";
import { authMiddleware } from "../middlewares/authMiddleware.js";
import { validate } from "../middlewares/validate.js";
import { createProgramSchema, updateProgramSchema } from "../validators/workoutProgram.validator.js";

const router = Router();
const workoutProgramController = container.resolve(WorkoutProgramController);

// ── Trainer Routes ──
// POST   /api/workout-programs          — Create a new program
router.post("/", trainerAuthMiddleware, validate(createProgramSchema), workoutProgramController.createProgram);

// GET    /api/workout-programs/trainer   — Get all programs for the trainer
router.get("/trainer", trainerAuthMiddleware, workoutProgramController.getTrainerPrograms);

// PATCH  /api/workout-programs/:id       — Update a program
router.patch("/:id", trainerAuthMiddleware, validate(updateProgramSchema), workoutProgramController.updateProgram);

// DELETE /api/workout-programs/:id       — Delete a program
router.delete("/:id", trainerAuthMiddleware, workoutProgramController.deleteProgram);

// POST   /api/workout-programs/:id/assign — Assign program to a user
router.post("/:id/assign", trainerAuthMiddleware, workoutProgramController.assignProgramToUser);

// ── User Route ──
// GET    /api/workout-programs/active    — Get the user's active program
router.get("/active", authMiddleware, workoutProgramController.getUserActiveProgram);

export default router;
