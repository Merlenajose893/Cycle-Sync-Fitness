import type { HealthMilestoneType } from "../constants/health.constant.js";
export interface HealthMilestoneResponseDTO {
    milestoneType: HealthMilestoneType;
    title: string;
    description: string;
    badgeIcon: string;
    achievedAt: Date;
}
//# sourceMappingURL=healthMilestone.dto.d.ts.map