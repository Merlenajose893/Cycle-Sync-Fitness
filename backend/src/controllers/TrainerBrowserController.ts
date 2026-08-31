import { inject, injectable } from "tsyringe";
import { TOKENS } from "../container/tokens.ts";
import type { ITrainerBrowserService } from "../interfaces/services/ITrainerBrowserService.ts";
import type { NextFunction, Request, Response } from "express";
import { successResponse } from "../utils/response.ts";
import { HttpStatus } from "../constants/HttpStatus.ts";

@injectable()
export class TrainerBrowserController{
    constructor(@inject(TOKENS.ITrainerBrowserService) private trainerbrowserservice:ITrainerBrowserService)
    {

    }
    browseTrainers=async (req:Request,res:Response,next:NextFunction) => {
        try {
            const result=await this.trainerbrowserservice.getApprovedTrainers();
            successResponse(res,"Trainers Fetched",result,HttpStatus.OK);
        } catch (error) {
            next(error)
        }

    }

    getTrainerProfile=async (req:Request,res:Response,next:NextFunction) => {
        try {
           const trainerId=(req.params.trainerId || req.params.id || "") as string;
           const result=await this.trainerbrowserservice.getTrainerProfile(trainerId);
           successResponse(res,"Trainer profile fetched",result,HttpStatus.OK); 
        } catch (error) {
            next(error)
        }
    }
}