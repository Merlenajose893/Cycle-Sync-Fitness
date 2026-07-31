import type { Request,Response,NextFunction } from "express";
import type { ITrainerPackageService } from "../interfaces/services/ITrainerPackageService.js";
import { successResponse } from "../utils/response.js";
import { HttpStatus } from "../constants/HttpStatus.js";
export class TrainerPackageController {
    constructor(private trainerpackageservice:ITrainerPackageService)
    
    {

    }

    createPackage=async (req:Request,res:Response,next:NextFunction) => {
        try {
            const trainerId=req.user?.userId;
            const result=await this.trainerpackageservice.createPackage(trainerId,req.body);
            successResponse(res,"Packages are created successfully",HttpStatus.OK,result);
        } catch (error) {
            next(error)
        }
    }

    updatePackage=async (req:Request,res:Response,next:NextFunction) => {
        try {
            const trainerId=req.user?.userId;
            const result=await this.trainerpackageservice.updatePackage(trainerId,req.body);
            successResponse(res,"Packages are updated successfully",HttpStatus.OK,result)
        } catch (error) {
            next(error)
        }
    }

    deletePackage=async (req:Request,res:Response,next:NextFunction) => {
        try {
            const trainerId=req.user?.userId;
            const packageId=req.params.id;
            const result=await this.trainerpackageservice.deletePackage(trainerId,packageId);
            successResponse(res,"Packages are deleted successfully",HttpStatus.OK,result);
        } catch (error) {
            next(error)
        }

    }

    getTrainerPackages=async (req:Request,res:Response,next:NextFunction) => {
        try {
            const trainerId=req.user?.userId;
            const result=await this.trainerpackageservice.getTrainerPackages(trainerId);
            successResponse(res,"Trainer packages are fetched",HttpStatus.OK,result);
        } catch (error) {
            next(error)
        }
    }

    getActivePackages=async (req:Request,res:Response,next:NextFunction) => {
        try {
            const trainerId=req.user?.userId;
            const result=await this.trainerpackageservice.getActivePackages(trainerId);
            successResponse(res,"Active packages fetched successfully",HttpStatus.OK,result);

        } catch (error) {
            next(error)
        }
    }

    getPackageById=async (req:Request,res:Response,next:NextFunction) => {
        try {
            const packageId=req.params.id;
            const result=await this.trainerpackageservice.getPackageBtId(packageId);
            successResponse(res,"Package fetched successfully",HttpStatus.OK,result);

        } catch (error) {
            next(error)
        }
    }
    


}