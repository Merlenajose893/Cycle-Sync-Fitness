import { inject, injectable } from "tsyringe";
import { TOKENS } from "../container/tokens.js";
import type { ITrainerBrowserService } from "../interfaces/services/ITrainerBrowserService.js";
import type { NextFunction, Request, Response } from "express";
import { successResponse } from "../utils/response.js";
import { HttpStatus } from "../constants/HttpStatus.js";

@injectable()
export class TrainerBrowserController{
    constructor(@inject(TOKENS.ITrainerBrowserService) private trainerbrowserservice:ITrainerBrowserService)
    {

    }
    browseTrainers=async (req:Request,res:Response,next:NextFunction) => {
        try {
            const result=await this.trainerbrowserservice.getApprovedTrainers();
            successResponse(res,"Trainers Fetched",HttpStatus.OK,result);
        } catch (error) {
            next(error)
        }

    }

    getTrainerProfile=async (req:Request,res:Response,next:NextFunction) => {
        try {
           const trainerId=req.params.trainerId;
           const result=await this.trainerbrowserservice.getTrainerProfile(trainerId);
           successResponse(res,"Trainer profile fetched",HttpStatus.OK,result); 
        } catch (error) {
            next(error)
        }
    }
}