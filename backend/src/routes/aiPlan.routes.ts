import { Router } from "express";
import { container } from "tsyringe";
import { AIPlanController } from "../controllers/AIPlanController.js";
import { authMiddleware } from "../middlewares/authMiddleware.js";
import { validate } from "../middlewares/validate.js";
import { generatePlanSchema, updatePlanStatusSchema } from "../validators/aiPlan.validator.js";

const router = Router();
const aiPlanController = container.resolve(AIPlanController);

// POST /api/ai-plans/generate — Generate a new AI plan
router.post("/generate", authMiddleware, validate(generatePlanSchema), aiPlanController.generatePlan);

// GET /api/ai-plans/active — Get the user's active plan
router.get("/active", authMiddleware, aiPlanController.getActivePlan);

// GET /api/ai-plans/history — Get all plan history for the user
router.get("/history", authMiddleware, aiPlanController.getPlanHistory);

// PATCH /api/ai-plans/:id/status — Update a plan's status
router.patch("/:id/status", authMiddleware, validate(updatePlanStatusSchema), aiPlanController.updatePlanStatus);

// DELETE /api/ai-plans/:id — Delete a plan
router.delete("/:id", authMiddleware, aiPlanController.deletePlan);

export default router;
