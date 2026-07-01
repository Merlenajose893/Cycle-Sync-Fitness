export class UserOnboardingMapper {
    static toBodyDetails(dto) {
        return {
            height: dto.height,
            weight: dto.weight,
            dateOfBirth: dto.dateOfBirth,
            biologicalSex: dto.biologicalSex
        };
    }
    static toCycleSetUp(dto) {
        return {
            ...(dto.averageCycleLength !== undefined && { averageCycleLength: dto.averageCycleLength }),
            ...(dto.averagePeriodLength !== undefined && { averagePeriodLength: dto.averagePeriodLength }),
            ...(dto.lastPeriodStart !== undefined && { lastPeriodStart: dto.lastPeriodStart }),
            ...(dto.birthControl !== undefined && { birthControl: dto.birthControl })
        };
    }
    static toGoals(dto) {
        return {
            ...(dto.primaryGoal !== undefined && { primaryGoal: dto.primaryGoal }),
            ...(dto.targetWeight !== undefined && { targetWeight: dto.targetWeight }),
            ...(dto.activityLevel !== undefined && { activityLevel: dto.activityLevel })
        };
    }
}
//# sourceMappingURL=UserOnboardingMappers.js.map