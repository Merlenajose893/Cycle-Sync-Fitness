import type { AddWaterDTO, CreateHealthLogDTO, UpdateDailyHealthLogDTO } from "../../dtos/healthLog.dto.js";
import type { IDailyHealthLog } from "../../models/DailyHealthLog.js";
export interface IDailyHealthLogService {
    logHealth(userId: string, data: CreateHealthLogDTO): Promise<IDailyHealthLog>;
    updateLog(userId: string, logId: string, data: UpdateDailyHealthLogDTO): Promise<IDailyHealthLog>;
    getTodayLog(userId: string): Promise<IDailyHealthLog | null>;
    getHistory(userId: string, page: number, limit: number): Promise<{
        logs: IDailyHealthLog[];
        total: number;
    }>;
    addWaterIntake(userId: string, data: AddWaterDTO): Promise<IDailyHealthLog>;
}
//# sourceMappingURL=IDailyHealthLogService.d.ts.map