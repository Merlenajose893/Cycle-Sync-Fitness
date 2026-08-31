import type { UpdateBodyDetailsDTO, UpdateCycleSetUpDTO, UpdateGoals } from "../dtos/useronboarding.dto.ts";

/**
 * Mapper for converting user onboarding DTOs into domain model fields.
 */
export class UserOnboardingMapper {
    /**
     * Maps body details DTO to model parameters.
     * @param dto - Body details data transfer object
     */
    static toBodyDetails(dto: UpdateBodyDetailsDTO) {
        return {
            height: dto.height,
            weight: dto.weight,
            dateOfBirth: dto.dateOfBirth,
            biologicalSex: dto.biologicalSex
        };
    }

    /**
     * Maps cycle setup DTO to model parameters.
     * @param dto - Cycle setup data transfer object
     */
    static toCycleSetUp(dto: UpdateCycleSetUpDTO) {
        return {
            ...(dto.averageCycleLength !== undefined && { averageCycleLength: dto.averageCycleLength }),
            ...(dto.averagePeriodLength !== undefined && { averagePeriodLength: dto.averagePeriodLength }),
            ...(dto.lastPeriodStart !== undefined && { lastPeriodStart: dto.lastPeriodStart }),
            ...(dto.birthControl !== undefined && { birthControl: dto.birthControl })
        };
    }

    /**
     * Maps goals DTO to model parameters.
     * @param dto - Goals data transfer object
     */
    static toGoals(dto: UpdateGoals) {
        return {
            ...(dto.primaryGoal !== undefined && { primaryGoal: dto.primaryGoal }),
            ...(dto.targetWeight !== undefined && { targetWeight: dto.targetWeight }),
            ...(dto.activityLevel !== undefined && { activityLevel: dto.activityLevel })
        };
    }
}