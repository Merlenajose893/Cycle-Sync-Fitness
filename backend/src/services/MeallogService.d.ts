import type { IMealLogService } from "../interfaces/services/IMealLogService.js";
import type { IMealLog } from "../models/MealLog.js";
import type { IMealLogRepository } from "../interfaces/repositories/IMealLogRepository.js";
export declare class MealLogService implements IMealLogService {
    private mealRepository;
    constructor(mealRepository: IMealLogRepository);
    logMeal: (userId: string, date: Date, mealData: any) => Promise<IMealLog>;
    getDayLog: (userId: string, date: Date) => Promise<IMealLog | null>;
    getWeekLogs: (userId: string, startDate: Date, endDate: Date) => Promise<IMealLog[]>;
    removeMeal: (userId: string, mealType: string) => Promise<IMealLog | null>;
    setDailyTarget: (userId: string, date: Date, target: any) => Promise<IMealLog>;
    private calculateMealTotals;
}
//# sourceMappingURL=MeallogService.d.ts.map