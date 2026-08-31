import { container } from "tsyringe";
import express from "express"
import { TrainerAssignmentController } from "../controllers/TrainerAssignmentController.ts";
import { authMiddleware } from "../middlewares/authMiddleware.ts";
import { roleMiddleware } from "../middlewares/roleMiddleWare.ts";
const router=express.Router();
const trainerassignmentcontroller=container.resolve(TrainerAssignmentController)
router.get("/me",authMiddleware,roleMiddleware("user"),trainerassignmentcontroller.getActiveAssignmentByUser);
router.get("/trainer/clients",authMiddleware,roleMiddleware("trainer"),trainerassignmentcontroller.getTrainerClients);
router.get("/:assignmentId",trainerassignmentcontroller.getAssignmentById);
router.patch("/:assignmentId/status",authMiddleware,roleMiddleware("admin"),trainerassignmentcontroller.updateAssignmentStatus)
export default router;
