import type { Request, Response, NextFunction } from "express";
import { injectable, inject } from "tsyringe";
import type { ITrainerPackageService } from "../interfaces/services/ITrainerPackageService.js";
import { TOKENS } from "../container/tokens.js";
import { successResponse } from "../utils/response.js";
import { HttpStatus } from "../constants/HttpStatus.js";

@injectable()
export class TrainerPackageController {
    constructor(@inject(TOKENS.ITrainerPackageService) private trainerpackageservice: ITrainerPackageService) {}

    createPackage=async (req:Request,res:Response,next:NextFunction) => {
        try {
            const trainerId=req.user?.userId || "";
            const result=await this.trainerpackageservice.createPackage(trainerId,req.body);
            console.log(result);
            
            successResponse(res,"Packages are created successfully",result,HttpStatus.OK);
        } catch (error) {
            next(error)
        }
    }

    updatePackage=async (req:Request,res:Response,next:NextFunction) => {
        try {
            const trainerId=req.user?.userId || "";
            const packageId=req.params.id as string;
            const result=await this.trainerpackageservice.updatePackage(trainerId,req.body,packageId);
            successResponse(res,"Packages are updated successfully",result,HttpStatus.OK)
        } catch (error) {
            next(error)
        }
    }

    deletePackage=async (req:Request,res:Response,next:NextFunction) => {
        try {
            const trainerId=req.user?.userId || "";
            const packageId=req.params.id as string;
            const result=await this.trainerpackageservice.deletePackage(trainerId,packageId);
            successResponse(res,"Packages are deleted successfully",result,HttpStatus.OK);
        } catch (error) {
            next(error)
        }

    }

    getTrainerPackages=async (req:Request,res:Response,next:NextFunction) => {
        try {
            const trainerId=req.user?.userId || "";
            const result=await this.trainerpackageservice.getTrainerPackages(trainerId);
            successResponse(res,"Trainer packages are fetched",result,HttpStatus.OK);
        } catch (error) {
            next(error)
        }
    }

    getActivePackages=async (req:Request,res:Response,next:NextFunction) => {
        try {
            const trainerId=(req.params.trainerId || req.params.id || "") as string;
            const result=await this.trainerpackageservice.getActivePackages(trainerId);
            successResponse(res,"Active packages fetched successfully",result,HttpStatus.OK);

        } catch (error) {
            next(error)
        }
    }

    getPackageById=async (req:Request,res:Response,next:NextFunction) => {
        try {
            const packageId=req.params.id as string;
            const result=await this.trainerpackageservice.getPackageById(packageId);
            successResponse(res,"Package fetched successfully",result,HttpStatus.OK);

        } catch (error) {
            next(error)
        }
    }
    


}