import type { DailyTargetDTO, LogMealDTO } from "../../dtos/meal.log.dto.ts";
import type { IMealLog } from "../../models/MealLog.ts";

export interface IMealLogService{
    logMeal(userId:string,date:Date,mealData:LogMealDTO):Promise<IMealLog>;
    getDayLog(userId:string,date:Date):Promise<IMealLog|null>;
    getWeekLogs(userId:string,startDate:Date,endDate:Date):Promise<IMealLog[]>;
    removeMeal(userId:string,mealType:string):Promise<IMealLog|null>;
    setDailyTarget(userId:string,date:Date,target:DailyTargetDTO):Promise<IMealLog>;
}