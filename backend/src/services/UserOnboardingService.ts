
import { inject,injectable } from "tsyringe";
import type { IUserOnboardingService } from "../interfaces/services/IUserOnboardingService.ts";
import { TOKENS } from "../container/tokens.ts";
import type { IUserRepository } from "../interfaces/repositories/IUserRepository.ts";
import type { IUser } from "../models/User.ts";
import { NotFoundError } from "../errors/index.ts";
import type { UpdateBodyDetailsDTO, UpdateCycleSetUpDTO, UpdateGoals } from "../dtos/useronboarding.dto.ts";
import { UserOnboardingMapper } from "../mappers/UserOnboardingMappers.ts";
@injectable()
export class UserOnboardingService implements IUserOnboardingService{
constructor(@inject(TOKENS.IUserRepository) private userRepository:IUserRepository)
{}
getOnboardingStatus=async(userId: string): Promise<IUser>=> {
    const user=await this.userRepository.findById(userId);
    if(!user)
    {
        throw new NotFoundError("User not Found")
    }
    return user;
}

updateBodyDetails=async(userId: string, data: UpdateBodyDetailsDTO): Promise<IUser> =>{
    const user=await this.userRepository.findById(userId);
    if(!user)
    {
        throw new NotFoundError("User not found");
    }


    user.bodyDetails=UserOnboardingMapper.toBodyDetails(data);
    user.onboardingStep=2;
    return this.userRepository.save(user)

    
}

updateCycleSetUp=async(userId: string, data: UpdateCycleSetUpDTO): Promise<IUser>=> {
    const user=await this.userRepository.findById(userId);
    if(!user)
    {
        throw new NotFoundError("User Not Found");
    }

    user.cycleSetUp=UserOnboardingMapper.toCycleSetUp(data);
    user.onboardingStep=3;
    return this.userRepository.save(user);
}

updateGoals=async (userId: string, data: UpdateGoals): Promise<IUser> =>{
    const user=await this.userRepository.findById(userId);
    console.log(user);
    
    if(!user)
    {
        throw new NotFoundError("User not found")
    }
    user.goals=UserOnboardingMapper.toGoals(data);
    console.log(user.goals.primaryGoal);
    
    user.onboardingStep=4;
    return this.userRepository.save(user);

}

completeOnboarding=async (userId: string): Promise<IUser>=> {

    const user=await this.userRepository.findById(userId);
    console.log(user);

    
    if(!user)
    {
        throw new NotFoundError("User Not found");
    }
    user.onboardingComplete=true;
    return this.userRepository.save(user);
}
}