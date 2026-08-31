import { Router } from "express";
import { container } from "tsyringe";
import { MealLogController } from "../controllers/MealLogController.ts";
import { authMiddleware } from "../middlewares/authMiddleware.ts";
import {validate } from "../middlewares/validate.ts"
import {logMealSchema,dailyTargetSchema} from "../validators/meallog.validator.ts"
const router=Router();
const mealLogController=container.resolve(MealLogController);

router.post("/log",authMiddleware,validate(logMealSchema),mealLogController.logMeal)
router.get("/day/:date",authMiddleware,mealLogController.getDayLog);
router.get("/week/:startDate",authMiddleware,mealLogController.getWeekLogs);
router.delete("/:mealType",authMiddleware,mealLogController.removeMeal);
router.put("/target",authMiddleware,validate(dailyTargetSchema),mealLogController.setDailyTarget);

export default router;