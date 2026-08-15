import express from "express";
import { container } from "tsyringe";
import { HealthTrackingController } from "../controllers/HealthTrackingController.js";
import { authMiddleware } from "../middlewares/authMiddleware.js";
import { validate } from "../middlewares/validate.js";
import { createCycleLogSchema, updateCycleLogSchema } from "../validators/cycleLog.validator.js";
import { addWaterSchema, createHealthLogSchema } from "../validators/healthLog.validator.js";
const router = express.Router();
const controller = container.resolve(HealthTrackingController);
// ── Cycle Tracking Routes ──
router.post("/cycle/start", authMiddleware, validate(createCycleLogSchema), controller.startPeriod);
router.put("/cycle/:logId/end", authMiddleware, validate(updateCycleLogSchema), controller.endPeriod);
router.get("/cycle/logs", authMiddleware, controller.getCycleLogs);
router.get("/cycle/predictions", authMiddleware, controller.getCyclePredictions);
router.delete("/cycle/:logId", authMiddleware, controller.deleteCycleLog);
// ── Daily Health & Water Logging Routes ──
router.post("/daily", authMiddleware, validate(createHealthLogSchema), controller.logDailyHealth);
router.get("/daily/today", authMiddleware, controller.getTodayHealthLog);
router.get("/daily/history", authMiddleware, controller.getHealthHistory);
router.post("/daily/water", authMiddleware, validate(addWaterSchema), controller.addWaterIntake);
// ── Health Milestones Route ──
router.get("/milestones", authMiddleware, controller.getMilestones);
export default router;
//# sourceMappingURL=healthTrackingRoutes.js.map