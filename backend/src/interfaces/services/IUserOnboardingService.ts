import  type { UpdateBodyDetailsDTO,UpdateCycleSetUpDTO,UpdateGoals } from "../../dtos/useronboarding.dto.ts";
import type { IUser } from "../../models/User.ts";

export interface IUserOnboardingService{
    getOnboardingStatus(userId:string):Promise<IUser>;
    updateBodyDetails(userId:string,data:UpdateBodyDetailsDTO):Promise<IUser>;
    updateCycleSetUp(userId:string,data:UpdateCycleSetUpDTO):Promise<IUser>;
    updateGoals(userId:string,data:UpdateGoals):Promise<IUser>;
    completeOnboarding(userId:string):Promise<IUser>
}