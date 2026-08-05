import express from "express";
import { container } from "tsyringe";
import { TrainerBrowserController } from "../controllers/TrainerBrowserController.js";
const router=express.Router();
const trainerbrowsercontroler=container.resolve(TrainerBrowserController)
router.get("/",trainerbrowsercontroler.browseTrainers);
router.get("/:trainerId",trainerbrowsercontroler.getTrainerProfile);
export default router;