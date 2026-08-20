import { Router } from "express";
import { container } from "tsyringe";
import { SubscriptionPlanController } from "../controllers/SubscriptionplanController.js";
import { authMiddleware } from "../middlewares/authMiddleware.js";
import { roleMiddleware } from "../middlewares/roleMiddleWare.js";
import { validate } from "../middlewares/validate.js";
import {
  createSubscriptionPlanSchema,
  updateSubscriptionPlanSchema,
} from "../validators/subscriptionPlan.validator.js";

const router = Router();
const subscriptionPlanController = container.resolve(SubscriptionPlanController);

// Public / Active plans
router.get("/active", subscriptionPlanController.getActivePlans);
router.get("/code/:code", subscriptionPlanController.getPlanByCode);

// Admin-only endpoints
router.get("/", authMiddleware, roleMiddleware("admin"), subscriptionPlanController.getAllPlans);
router.post(
  "/",
  authMiddleware,
  roleMiddleware("admin"),
  validate(createSubscriptionPlanSchema),
  subscriptionPlanController.createPlan
);
router.put(
  "/:id",
  authMiddleware,
  roleMiddleware("admin"),
  validate(updateSubscriptionPlanSchema),
  subscriptionPlanController.updatePlan
);
router.patch(
  "/:id/deactivate",
  authMiddleware,
  roleMiddleware("admin"),
  subscriptionPlanController.deactivatePlan
);

// Get by ID (after specific routes)
router.get("/:id", subscriptionPlanController.getPlanById);

export default router;
