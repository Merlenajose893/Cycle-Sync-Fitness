import type { IDailyHealthLogRepository } from "../interfaces/repositories/IDailyHealthLogRepository.js";
import type { IDailyHealthLogService } from "../interfaces/services/IDailyHealthLogService.js";
import type { AddWaterDTO, CreateHealthLogDTO, UpdateDailyHealthLogDTO } from "../dtos/healthLog.dto.js";
import type { IDailyHealthLog } from "../models/DailyHealthLog.js";
export declare class DailyHealthLogService implements IDailyHealthLogService {
    private dailyHealthLogRepository;
    constructor(dailyHealthLogRepository: IDailyHealthLogRepository);
    private getMidnightDate;
    logHealth(userId: string, data: CreateHealthLogDTO): Promise<IDailyHealthLog>;
    updateLog(userId: string, logId: string, data: UpdateDailyHealthLogDTO): Promise<IDailyHealthLog>;
    getTodayLog(userId: string): Promise<IDailyHealthLog | null>;
    getHistory(userId: string, page?: number, limit?: number): Promise<{
        logs: IDailyHealthLog[];
        total: number;
    }>;
    addWaterIntake(userId: string, data: AddWaterDTO): Promise<IDailyHealthLog>;
}
//# sourceMappingURL=DailyHealthLogService.d.ts.map