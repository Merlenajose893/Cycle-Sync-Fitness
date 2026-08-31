import type { IHealthMilestone } from "../../models/HealthMilestone.ts";

export interface IHealthMilestoneService{
    getUserMilestones(userId:string):Promise<IHealthMilestone[]>;
    checkAndAwardMilestones(userId:string):Promise<IHealthMilestone[]>;
}