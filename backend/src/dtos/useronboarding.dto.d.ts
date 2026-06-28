export interface UpdateBodyDetailsDTO {
    height: number;
    weight: number;
    dateOfBirth: Date;
    biologicalSex: string;
}
export interface UpdateCycleSetUpDTO {
    averageCycleLength?: number;
    averagePeriodLength?: number;
    lastPeriodStart?: Date;
    birthControl?: string;
}
export interface UpdateGoals {
    primaryGoal?: 'weight_loss' | 'muscle_gain' | 'hormone_balance' | 'general_health';
    targetWeight?: number;
    activityLevel?: 'sedentary' | 'lightActive' | 'moderatelyActive';
}
//# sourceMappingURL=useronboarding.dto.d.ts.map