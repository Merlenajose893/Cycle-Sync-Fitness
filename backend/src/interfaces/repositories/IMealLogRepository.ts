import type { IMealLog } from "../../models/MealLog.ts";
import type { IBaseRepository } from "./IBaseRepository.ts";

export interface IMealLogRepository extends IBaseRepository<IMealLog>{
findByUserAndDate(userId:string,date:Date):Promise<IMealLog|null>;
findByUserDateRange(userId:string,startDate:Date,endDate:Date):Promise<IMealLog[]>
}