import type { CreateCycleLogDTO, UpdateCycleLogDTO } from "../../dtos/cycleLog.dto.js";
import type { ICycleLog } from "../../models/CycleLog.js";

export interface ICycleLogService{
    startPeriodDate(userId:string,data:CreateCycleLogDTO):Promise<ICycleLog>;
    endPeriod(userId:string,logId:string,data:UpdateCycleLogDTO):Promise<ICycleLog>;
    getCycleLogs(userId:string):Promise<ICycleLog[]>;
    getLatestCycle(userId:string):Promise<ICycleLog|null>;
    deleteCycleLog(userId:string,logId:string):Promise<void>;
}