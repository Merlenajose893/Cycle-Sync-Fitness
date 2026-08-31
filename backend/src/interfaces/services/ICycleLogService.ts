import type { CreateCycleLogDTO, UpdateCycleLogDTO } from "../../dtos/cycleLog.dto.ts";
import type { ICycleLog } from "../../models/CycleLog.ts";

export interface ICycleLogService{
    startPeriodDate(userId:string,data:CreateCycleLogDTO):Promise<ICycleLog>;
    endPeriod(userId:string,logId:string,data:UpdateCycleLogDTO):Promise<ICycleLog>;
    getCycleLogs(userId:string):Promise<ICycleLog[]>;
    getLatestCycle(userId:string):Promise<ICycleLog|null>;
    deleteCycleLog(userId:string,logId:string):Promise<void>;
}