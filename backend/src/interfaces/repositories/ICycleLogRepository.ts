import type { ICycleLog } from "../../models/CycleLog.ts";
import type { IBaseRepository } from "./IBaseRepository.ts";

export interface ICycleLogRepository extends IBaseRepository<ICycleLog>{
findByUser(userId:string):Promise<ICycleLog[]>;
findByLatest(userId:string):Promise<ICycleLog|null>;
findRecentCycles(userId:string,limit:number):Promise<ICycleLog[]>;
countByUser(userId:string):Promise<number>;
}