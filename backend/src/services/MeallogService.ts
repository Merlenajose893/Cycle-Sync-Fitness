import { inject,injectable } from "tsyringe";
import type { IMealLogService } from "../interfaces/services/IMealLogService.js";
import { TOKENS } from "../container/tokens.js";
import type { IMealLog } from "../models/MealLog.js";
import type { LogMealDTO } from "../dtos/meal.log.dto.js";
import type { IMealLogRepository } from "../interfaces/repositories/IMealLogRepository.js";
import { NotFoundError } from "../errors/index.js";
@injectable()
export class MealLogService implements IMealLogService{
    constructor(@inject(TOKENS.IMealLogRepository) private mealRepository:IMealLogRepository)

    {

    }

    
    getDayLog=async(userId: string, date: Date): Promise<IMealLog | null> {
        const mealLog=await this.mealRepository.findByUserAndDate(userId,date);
        if(!mealLog)
        {
            throw new NotFoundError("Meal Log Not Found");
        }
        return mealLog;
    }

    getWeekLogs=async(userId: string, startDate: Date,endDate:Date): Promise<IMealLog[]> {
        const mealLog=await this.mealRepository.findByUserDateRange(userId,startDate,endDate);

    }
    
}