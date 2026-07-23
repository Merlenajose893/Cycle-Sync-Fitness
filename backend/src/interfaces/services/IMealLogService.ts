import type { DailyTargetDTO, LogMealDTO } from "../../dtos/meal.log.dto.js";
import type { IMealLog } from "../../models/MealLog.js";

export interface IMealLogService{
    logMeal(userId:string,date:Date,mealData:LogMealDTO):Promise<IMealLog>;
    getDayLog(userId:string,date:Date):Promise<IMealLog|null>;
    getWeekLogs(userId:string,startDate:Date):Promise<IMealLog[]>;
    removeMeal(userId:string,mealType:string):Promise<IMealLog|null>;
    setDailyTarget(userId:string,date:Date,target:DailyTargetDTO):Promise<IMealLog>;
}