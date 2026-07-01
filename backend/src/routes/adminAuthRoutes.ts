import { Router } from "express";
import { container } from "tsyringe";
import { AdminController } from "../controllers/AdminAuthController.js";
const router=Router();
const adminController=container.resolve(AdminController);
router.post("/admin-login",adminController.adminLogin);
router.get("/users",adminController.listUsers);
router.get("/trainers",adminController.listTrainers);
export default router;