import { inject, injectable } from "tsyringe";
import { TOKENS } from "../container/tokens.js";
import type { ITrainerAssignmentService } from "../interfaces/services/ITrainerAssignmentService.js";
import type { NextFunction, Request, Response } from "express";
import { successResponse } from "../utils/response.js";
import { HttpStatus } from "../constants/HttpStatus.js";

@injectable()
export class TrainerAssignmentController{
constructor(@inject(TOKENS.ITrainerAssignmentService) private trainerassignService:ITrainerAssignmentService)
{

}
getActiveAssignmentByUser=async (req:Request,res:Response,next:NextFunction) => {
    try {
        const userId=req.user?.userId || "";
        const result=await this.trainerassignService.getActiveAssignmentByUser(userId);
        successResponse(res,"Active users are fetched",result,HttpStatus.OK)
    } catch (error) {
        next(error)
    }
}
getAssignmentById=async (req:Request,res:Response,next:NextFunction) => {
    try {
        const assignmentId=req.params.id as string;
        const result=await this.trainerassignService.getAssignmentById(assignmentId);
        successResponse(res,"Fetched by the id",result,HttpStatus.OK)
    } catch (error) {
        next(error)
    }
}
getTrainerClients=async (req:Request,res:Response,next:NextFunction) => {
    try {
        const trainerId=req.user?.userId!;
        const result=await this.trainerassignService.getTrainerClients(trainerId);
        successResponse(res, "Trainer clients fetched successfully", result,HttpStatus.OK);
    } catch (error) {
        next(error)
    }
}
updateAssignmentStatus=async (req:Request,res:Response,next:NextFunction) => {
    try {
        const assignmentId=req.params.id as string;
        const status=req.body.status;
        const result=await this.trainerassignService.updateAssignmentStatus(assignmentId,status);
        successResponse(res,"Updated the status",result,HttpStatus.OK)
    } catch (error) {
        next(error)
    }
}

}