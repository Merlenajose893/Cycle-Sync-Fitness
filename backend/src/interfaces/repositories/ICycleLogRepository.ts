import type { ICycleLog } from "../../models/CycleLog.js";
import type { IBaseRepository } from "./IBaseRepository.js";

export interface ICycleLogRepository extends IBaseRepository<ICycleLog>{
findByUser(userId:string):Promise<ICycleLog[]>;
findByLatest(userId:string):Promise<ICycleLog|null>;
findRecentCycles(userId:string,limit:number):Promise<ICycleLog[]>;
countByUser(userId:string):Promise<number>;
}