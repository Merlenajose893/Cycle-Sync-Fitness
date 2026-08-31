import {inject,injectable} from "tsyringe";
import type { Request,Response,NextFunction } from "express";
import type { ITrainerOnboardingService } from "../interfaces/services/ITrainerOnboardingService.ts";
import { TOKENS } from "../container/tokens.ts";
import { successResponse } from "../utils/response.ts";
import { HttpStatus } from "../constants/HttpStatus.ts";
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
            console.log(result);
            
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

    uploadAvatar = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        console.log("hi");
        
        const trainerId = req.user?.userId;
        const file = req.file!;
        console.log(trainerId);
        console.log(file);
        
        

        const trainer = await this.trainerOnboardingService.uploadAvatar(
            trainerId!,
            file
        );

        successResponse(
            res,
            "Avatar uploaded successfully",
            trainer,
            HttpStatus.OK
        );
    } catch (error) {
        next(error);
    }
};

    uploadDocuments = async (
        req: Request,
        res: Response,
        next: NextFunction
    ) => {
        try {
            const trainerId = req.user?.userId;
            const files = req.files as Express.Multer.File[];
            
            const trainer = await this.trainerOnboardingService.uploadDocuments(
                trainerId!,
                files
            );

            successResponse(
                res,
                "Documents uploaded successfully",
                trainer,
                HttpStatus.OK
            );
        } catch (error) {
            next(error);
        }
    };
}