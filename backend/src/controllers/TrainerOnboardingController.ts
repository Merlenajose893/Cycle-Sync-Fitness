import {inject,injectable} from "tsyringe";
import type { Request,Response,NextFunction } from "express";
import type { ITrainerOnboardingService } from "../interfaces/services/ITrainerOnboardingService.js";
import { TOKENS } from "../container/tokens.js";
import { successResponse } from "../utils/response.js";
@injectable()
export class TrainerOnboardingController{
    constructor(
        @inject(TOKENS.ITrainerOnboardingService) private trainerOnboardingService:ITrainerOnboardingService
    ){}

    async getTrainerOnboardingStatus(req:Request,res:Response,next:NextFunction) {
    try {
        const trainerId=req.user?.userId;
        const result=await this.trainerOnboardingService.getTrainerOnboardingStatus(trainerId!);
        successResponse(res,"Trainer onboarding status fetched successfully",result);

    } catch (error) {
        next(error)
    }        
    }
    async updateTrainerProfile(req:Request,res:Response,next:NextFunction)
    {
        try {
            const trainerId=req.user?.userId;
            const result=await this.trainerOnboardingService.updateTrainerProfile(trainerId!,req.body);
            successResponse(res,"Trainer profile updated successfully",result);
        } catch (error) {
            next(error)
        }
    }

    async updateTrainerCertifications(req:Request,res:Response,next:NextFunction)
    {
        try {
            const trainerId=req.user?.userId;
            const result=await this.trainerOnboardingService.updateTrainerCertifications(trainerId!,req.body);
            successResponse(res,"Trainer certifications updated successfully",result)
        } catch (error) {
            next(error);
        }
    }

    async updateTrainerPackages(req:Request,res:Response,next:NextFunction)
    {
        try {
            const trainerId=req.user?.userId;
            const result=await this.trainerOnboardingService.updateTrainerPackages(trainerId!,req.body);
            successResponse(res,"Trainer Packages updated successfully",result);
        } catch (error) {
            next(error)
        }
    }

    async completeTrainerOnboarding(req:Request,res:Response,next:NextFunction)
    {
        try {
            const trainerId=req.user?.userId;
            const result=await this.trainerOnboardingService.completeTrainerOnboardingStatus(trainerId!);
            successResponse(res,"Trainer onboarding completed successfully",result)
        } catch (error) {
            next(error)
        }
    }
}