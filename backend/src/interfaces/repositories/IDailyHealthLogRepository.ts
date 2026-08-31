import type { IDailyHealthLog } from "../../models/DailyHealthLog.ts";
import type { IBaseRepository } from "./IBaseRepository.ts";

export interface IDailyHealthLogRepository extends IBaseRepository<IDailyHealthLog>{
findByDate(userId:string,date:Date):Promise<IDailyHealthLog|null>;
findByDateRange(userId:string,startDate:Date,endDate:Date):Promise<IDailyHealthLog[]>;
countByUser(userId:string):Promise<number>;
findHistory(userId:string):Promise<IDailyHealthLog[]>;
upsertByDate(userId:string,date:Date,data:Partial<IDailyHealthLog>):Promise<IDailyHealthLog>;
}