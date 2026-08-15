import type { ICycleLogRepository } from "../interfaces/repositories/ICycleLogRepository.js";
import type { ICycleLogService } from "../interfaces/services/ICycleLogService.js";
import type { CreateCycleLogDTO, UpdateCycleLogDTO } from "../dtos/cycleLog.dto.js";
import type { ICycleLog } from "../models/CycleLog.js";
export declare class CycleLogService implements ICycleLogService {
    private cycleLogRepository;
    constructor(cycleLogRepository: ICycleLogRepository);
    startPeriod(userId: string, dto: CreateCycleLogDTO): Promise<ICycleLog>;
    endPeriod(userId: string, logId: string, dto: UpdateCycleLogDTO): Promise<ICycleLog>;
    getCycleLogs(userId: string): Promise<ICycleLog[]>;
    getLatestCycle(userId: string): Promise<ICycleLog | null>;
    deleteCycleLog(userId: string, logId: string): Promise<void>;
}
//# sourceMappingURL=CycleLogService.d.ts.map