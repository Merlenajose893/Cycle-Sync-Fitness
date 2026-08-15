import type { IMealLogRepository } from "../interfaces/repositories/IMealLogRepository.js";
import { type IMealLog } from "../models/MealLog.js";
import { BaseRepository } from "./BaseRepository.js";
export declare class MealLogRepository extends BaseRepository<IMealLog> implements IMealLogRepository {
    constructor();
    findByUserAndDate(userId: string, date: Date): Promise<IMealLog | null>;
    findByUserDateRange(userId: string, startDate: Date, endDate: Date): Promise<IMealLog[]>;
}
//# sourceMappingURL=MealLogRepository.d.ts.map