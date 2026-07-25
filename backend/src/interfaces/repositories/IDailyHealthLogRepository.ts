import type { IDailyHealthLog } from "../../models/DailyHealthLog.js";
import type { IBaseRepository } from "./IBaseRepository.js";

export interface IDailyHealthLogRepository extends IBaseRepository<IDailyHealthLog>{
findByDate(userId:string,date:Date):Promise<IDailyHealthLog|null>;
findHistory(userId:string):Promise<IDailyHealthLog[]>;
}