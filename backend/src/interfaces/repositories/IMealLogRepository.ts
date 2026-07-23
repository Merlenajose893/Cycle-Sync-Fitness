import type { IMealLog } from "../../models/MealLog.js";
import type { IBaseRepository } from "./IBaseRepository.js";

export interface IMealLogRepository extends IBaseRepository<IMealLog>{
findByUserAndDate(userId:string,date:Date):Promise<IMealLog|null>;
findByUserDateRange(userId:string,startDate:Date,endDate:Date):Promise<IMealLog[]>
}