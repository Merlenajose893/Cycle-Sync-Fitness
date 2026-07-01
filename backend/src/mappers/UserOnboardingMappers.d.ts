import type { UpdateBodyDetailsDTO, UpdateCycleSetUpDTO, UpdateGoals } from "../dtos/useronboarding.dto.js";
export declare class UserOnboardingMapper {
    static toBodyDetails(dto: UpdateBodyDetailsDTO): {
        height: number;
        weight: number;
        dateOfBirth: Date;
        biologicalSex: string;
    };
    static toCycleSetUp(dto: UpdateCycleSetUpDTO): {
        birthControl?: string;
        lastPeriodStart?: Date;
        averagePeriodLength?: number;
        averageCycleLength?: number;
    };
    static toGoals(dto: UpdateGoals): {
        activityLevel?: "sedentary" | "lightActive" | "moderatelyActive";
        targetWeight?: number;
        primaryGoal?: "weight_loss" | "muscle_gain" | "hormone_balance" | "general_health";
    };
}
//# sourceMappingURL=UserOnboardingMappers.d.ts.map