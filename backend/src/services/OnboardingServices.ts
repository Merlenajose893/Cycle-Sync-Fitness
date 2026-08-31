import { UserModel } from "../models/User.ts";
import type { IUser } from "../models/User.ts";
import { UserRepository } from "../repositories/UserRepository.ts";

export class Onboardingservice{
    private userRepository:UserRepository

    constructor()
    {
        this.userRepository=new UserRepository();
    }


    async updateBodyDetails(userId:string,data:any)
    {
        const user=await this.userRepository.findById(userId);
            if(!user)
            {
                throw new Error("User Not Found")
            }

            user.bodyDetails={
                height:data.height,
                weight:data.weight,
                dateOfBirth:data.dateOfBirth,
                biologicalSex:data.biologicalSex
            }

            await this.userRepository.save(user)


            return {message:"Boidy updated successfully "}
        
    }


    async updateCycleDetails(userId:string,data:any)
    {
        const user= await this.userRepository.findById(userId)
        if(!user)
        {
            throw new Error("User Not found")
        }

        user.cycleSetUp={
            averageCycleLength:data.averageCycleLength,
            averagePeriodLength:data.averagePeriodLength,
            birthControl:data.birthControl,
            lastPeriodStart:data.lastPeriodStart

        }

        await this.userRepository.save(user);

        return {message:"Cycle Updated Successfully"}
    }


    async updateGoals(userId:string,data:any)
    {
        const user=await this.userRepository.findById(userId);
        if(!user)
        {
            throw new Error("User Not found")
        }

        user.goals={
            primaryGoal:data.primaryGoal,
            activityLevel:data.activityLevel,
            targetWeight:data.targetWeight
        }

        await this.userRepository.save(user);

        return {message:"Goals updated"}
    }

  async  onboardingComplete(userId:string)
  {
    const user=await this.userRepository.findById(userId);
    if(!user)
    {
        throw new Error("No User Found")
    }

    user.onboardingComplete=true;
    await this.userRepository.save(user);

    return {message:"Onboarding Completed"}
  }
}