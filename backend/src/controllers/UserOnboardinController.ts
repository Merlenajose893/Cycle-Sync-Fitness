import { inject,injectable } from "tsyringe";
import type { Request,Response,NextFunction } from "express";
import type  { IUserOnboardingService } from "../interfaces/services/IUserOnboardingService.js";
import { TOKENS } from "../container/tokens.js";
import { successResponse ,} from "../utils/response.js";
@injectable()
export class UserOnboardingControlling{
    constructor(@inject(TOKENS.IUserOnboardingService) private useronboardingService:IUserOnboardingService)
    {

    }
    async getOnboardingStatus(req:Request,res:Response,next:NextFunction):Promise<void>
    {
        try {
            const userId=req.user?.userId!;
            console.log(userId);
            
            const result=await this.useronboardingService.getOnboardingStatus(userId);
            successResponse(res,"Onboarding status fetched success",result)
        } catch (error) {
            next(error)
            console.log("message",error);
            
        }
    }
    async updateBodyDetails(req:Request,res:Response,next:NextFunction)
    {
        try {
            const userId=req.user?.userId!;
            const result=await this.useronboardingService.updateBodyDetails(userId,req.body);
            successResponse(res,"Body details are updated",result);
        } catch (error) {
            next(error);
            console.log(error);
            
        }
    }

    async updateCycleDetails(req:Request,res:Response,next:NextFunction)
    {
        try {
            const userId=req.user?.userId!;
            const result=await this.useronboardingService.updateCycleSetUp(userId,req.body);
            successResponse(res,"Cycle details are updated",result)
        } catch (error) {
            next(error);
            console.log(error);
            
        }
    }

    async updateGoals(req:Request,res:Response,next:NextFunction){
        try {
            
            const userId=req.user?.userId!;
            const result=await this.useronboardingService.updateGoals(userId,req.body);
            successResponse(res,"Goals are updated",result)
        } catch (error) {
            next(error)
            console.log(error);
            
        }


    }

    async completeOnboarding(req:Request,res:Response,next:NextFunction)
    {
        const userId=req.user?.userId
        const result=await this.useronboardingService.completeOnboarding(userId!)
        successResponse(res,"Completed Onboarding",result)
    }
}