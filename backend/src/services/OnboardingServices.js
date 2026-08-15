import { UserModel } from "../models/User.js";
import { UserRepository } from "../repositories/UserRepository.js";
export class Onboardingservice {
    userRepository;
    constructor() {
        this.userRepository = new UserRepository();
    }
    async updateBodyDetails(userId, data) {
        const user = await this.userRepository.findById(userId);
        if (!user) {
            throw new Error("User Not Found");
        }
        user.bodyDetails = {
            height: data.height,
            weight: data.weight,
            dateOfBirth: data.dateOfBirth,
            biologicalSex: data.biologicalSex
        };
        await this.userRepository.save(user);
        return { message: "Boidy updated successfully " };
    }
    async updateCycleDetails(userId, data) {
        const user = await this.userRepository.findById(userId);
        if (!user) {
            throw new Error("User Not found");
        }
        user.cycleSetUp = {
            averageCycleLength: data.averageCycleLength,
            averagePeriodLength: data.averagePeriodLength,
            birthControl: data.birthControl,
            lastPeriodStart: data.lastPeriodStart
        };
        await this.userRepository.save(user);
        return { message: "Cycle Updated Successfully" };
    }
    async updateGoals(userId, data) {
        const user = await this.userRepository.findById(userId);
        if (!user) {
            throw new Error("User Not found");
        }
        user.goals = {
            primaryGoal: data.primaryGoal,
            activityLevel: data.activityLevel,
            targetWeight: data.targetWeight
        };
        await this.userRepository.save(user);
        return { message: "Goals updated" };
    }
    async onboardingComplete(userId) {
        const user = await this.userRepository.findById(userId);
        if (!user) {
            throw new Error("No User Found");
        }
        user.onboardingComplete = true;
        await this.userRepository.save(user);
        return { message: "Onboarding Completed" };
    }
}
//# sourceMappingURL=OnboardingServices.js.map