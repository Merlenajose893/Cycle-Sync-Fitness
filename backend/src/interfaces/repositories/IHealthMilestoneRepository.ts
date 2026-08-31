import type { HealthMilestoneType } from "../../constants/health.constant.ts";
import type { IHealthMilestone } from "../../models/HealthMilestone.ts";
import type { IBaseRepository } from "./IBaseRepository.ts";

export interface IHealthMilestoneRepository extends IBaseRepository<IHealthMilestone>{
    findByUser(userId:string):Promise<IHealthMilestone[]>;
    hasMileStone(userId:string,milestone:HealthMilestoneType):Promise<boolean>
}