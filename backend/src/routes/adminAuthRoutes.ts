import { Router } from "express";
import { container } from "tsyringe";
import { AdminController } from "../controllers/AdminAuthController.js";
const router=Router();
const adminController=container.resolve(AdminController);
router.post("/admin-login",adminController.adminLogin);
router.get("/users",adminController.listUsers);
router.get("/trainers",adminController.listTrainers);
router.patch("/users/:id/block",adminController.blockUser);
router.patch("/users/:id/unblock",adminController.unblockUser);
router.patch("/trainers/:id/block",adminController.blockTrainer);
router.patch("/trainers/:id/unblock",adminController.unblockTrainer)
router.post("/trainers/invite",adminController.inviteTrainerController)
export default router;