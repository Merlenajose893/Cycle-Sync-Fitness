import { Router } from "express";
import { container } from "tsyringe";
import { ReportController } from "../controllers/ReportController.js";
import { authMiddleware } from "../middlewares/authMiddleware.js";

const router = Router();
const reportController = container.resolve(ReportController);

// GET /api/reports/analytics?range=week|month|3months
router.get("/analytics", authMiddleware, reportController.getUserReport);

// GET /api/reports/export?range=week|month|3months
router.get("/export", authMiddleware, reportController.exportUserReport);

export default router;
