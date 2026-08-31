import type { HealthMilestoneType } from "../constants/health.constant.ts";

export interface HealthMilestoneResponseDTO{
    milestoneType:HealthMilestoneType;
    title:string;
    description:string;
    badgeIcon:string;
    achievedAt:Date;
}