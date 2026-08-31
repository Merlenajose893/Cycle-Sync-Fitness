import { Router } from "express";
import { container } from "tsyringe";
import { AIPlanController } from "../controllers/AIPlanController.ts";
import { authMiddleware } from "../middlewares/authMiddleware.ts";
import { validate } from "../middlewares/validate.ts";
import { generatePlanSchema, updatePlanStatusSchema } from "../validators/aiPlan.validator.ts";

const router = Router();
const aiPlanController = container.resolve(AIPlanController);

// POST /api/ai-plans/generate — Generate a new active AI plan
router.post("/generate", authMiddleware, validate(generatePlanSchema), aiPlanController.generatePlan);

// POST /api/ai-plans/draft — Create a draft AI plan
router.post("/draft", authMiddleware, validate(generatePlanSchema), aiPlanController.createDraftPlan);

// GET /api/ai-plans/active — Get the user's active plan
router.get("/active", authMiddleware, aiPlanController.getActivePlan);

// GET /api/ai-plans/history — Get all plan history for the user
router.get("/history", authMiddleware, aiPlanController.getPlanHistory);

// PATCH /api/ai-plans/:id/status — Update a plan's status (DRAFT -> ACTIVE/ARCHIVED, ACTIVE -> ARCHIVED)
router.patch("/:id/status", authMiddleware, validate(updatePlanStatusSchema), aiPlanController.updatePlanStatus);

// PATCH /api/ai-plans/:id — Edit an existing plan
router.patch("/:id", authMiddleware, aiPlanController.editPlan);

// DELETE /api/ai-plans/:id — Delete a plan
router.delete("/:id", authMiddleware, aiPlanController.deletePlan);

export default router;
