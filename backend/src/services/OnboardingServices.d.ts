export declare class Onboardingservice {
    private userRepository;
    constructor();
    updateBodyDetails(userId: string, data: any): Promise<{
        message: string;
    }>;
    updateCycleDetails(userId: string, data: any): Promise<{
        message: string;
    }>;
    updateGoals(userId: string, data: any): Promise<{
        message: string;
    }>;
    onboardingComplete(userId: string): Promise<{
        message: string;
    }>;
}
//# sourceMappingURL=OnboardingServices.d.ts.map