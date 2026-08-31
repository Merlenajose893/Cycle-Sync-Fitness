import { Router } from "express";
import { container } from "tsyringe";
import { WorkoutProgramController } from "../controllers/WorkoutProgramController.ts";
import { authMiddleware } from "../middlewares/authMiddleware.ts";
import { roleMiddleware } from "../middlewares/roleMiddleWare.ts";
import { validate } from "../middlewares/validate.ts";
import { createProgramSchema, updateProgramSchema } from "../validators/workoutProgram.validator.ts";

const router = Router();
const workoutProgramController = container.resolve(WorkoutProgramController);

// ── Trainer Routes ──
// POST   /api/workout-programs          — Create a new program
router.post("/", authMiddleware, roleMiddleware("trainer"), validate(createProgramSchema), workoutProgramController.createProgram);

// GET    /api/workout-programs/trainer   — Get all programs for the trainer
router.get("/trainer", authMiddleware, roleMiddleware("trainer"), workoutProgramController.getTrainerPrograms);

// PATCH  /api/workout-programs/:id       — Update a program
router.patch("/:id", authMiddleware, roleMiddleware("trainer"), validate(updateProgramSchema), workoutProgramController.updateProgram);

// DELETE /api/workout-programs/:id       — Delete a program
router.delete("/:id", authMiddleware, roleMiddleware("trainer"), workoutProgramController.deleteProgram);

// POST   /api/workout-programs/:id/assign — Assign program to a user
router.post("/:id/assign", authMiddleware, roleMiddleware("trainer"), workoutProgramController.assignProgramToUser);

// ── User Route ──
// GET    /api/workout-programs/active    — Get the user's active program
router.get("/active", authMiddleware, workoutProgramController.getUserActiveProgram);

export default router;
