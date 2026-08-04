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
        const userId=req.user?.userId;
        const result=await this.trainerassignService.getActiveAssignmentByUser(userId);
        successResponse(res,"Active users are fetched",HttpStatus.OK,result)
    } catch (error) {
        next(error)
    }
}
getAssignmentById=async (req:Request,res:Response,next:NextFunction) => {
    try {
        const assignmentId=req.params.id;
        const result=await this.trainerassignService.getAssignmentById(assignmentId);
        successResponse(res,"Fetched by the id",HttpStatus.OK,result)
    } catch (error) {
        next(error)
    }
}
getTrainerClients=async (req:Request,res:Response,next:NextFunction) => {
    try {
        const trainerId=req.user?.userId;
        const result=await this.trainerassignService.getTrainerClients(trainerId);
    } catch (error) {
        next(error)
    }
}
updateAssignmentStatus=async (req:Request,res:Response,next:NextFunction) => {
    try {
        const assignmentId=req.params.id;
        const status=req.body.status;
        const result=await this.trainerassignService.updateAssignmentStatus(assignmentId,status);
        successResponse(res,"Updated the status",HttpStatus.OK,result)
    } catch (error) {
        next(error)
    }
}

}