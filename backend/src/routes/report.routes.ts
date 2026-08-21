import { Router } from "express";
import { container } from "tsyringe";
import { ReportController } from "../controllers/ReportController.js";
import { authMiddleware } from "../middlewares/authMiddleware.js";

const router = Router();

// GET /api/reports/analytics?range=week|month|3months
router.get("/analytics", authMiddleware, (req, res, next) => {
  const reportController = container.resolve(ReportController);
  return reportController.getUserReport(req, res, next);
});

// GET /api/reports/export?range=week|month|3months
router.get("/export", authMiddleware, (req, res, next) => {
  const reportController = container.resolve(ReportController);
  return reportController.exportUserReport(req, res, next);
});

export default router;
