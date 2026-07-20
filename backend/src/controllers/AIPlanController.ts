import type {Request,Response, NextFunction } from "express";
import { inject, injectable } from "tsyringe";
import { TOKENS } from "../container/tokens.js";
import type { IAIPlanService } from "../interfaces/services/IAIPlanService.js";
import { successResponse } from "../utils/response.js";
import { HttpStatus } from "../constants/HttpStatus.js";

@injectable()
export class AIPlanController{
    constructor(@inject(TOKENS.IAIPlanService) private aiplanservice:IAIPlanService)
    {

    }

    generatePlan=async (req:Request,res:Response,next:NextFunction) => {
        try {
            const userId=req.user?.userId!;
            const result=await this.aiplanservice.generatePlans(userId,req.body);
            successResponse(res,"Plan is generated",result,HttpStatus.OK)
        } catch (error) {
            next(error)
        }
    }

    getActivePlan=async (req:Request,res:Response,next:NextFunction) => {
        try {
            const userId=req.user?.userId;
            const result=await this.aiplanservice.getActivePlan(userId);
            successResponse(res,"Avtive Plans are fetched",result,HttpStatus.OK)
        } catch (error) {
            next(error)
        }
    }
    getPlanHistory=async (req:Request,res:Response,next:NextFunction) => {
        try {
            const userId=req.user?.userId;
            const result=await this.aiplanservice.getPlanHistory(userId);
            successResponse(res,"Plan History is fetched",result,HttpStatus.OK)
        } catch (error) {
            next(error)
        }
    }

    updatePlanStatus=async (req:Request,res:Response,next:NextFunction) => {
        try {
            const planId=req.params.id!;
            const { status }=req.body;
            const result=await this.aiplanservice.updatePlanStatus(planId,status);
            successResponse(res,"Plan status updated",result,HttpStatus.OK)

        } catch (error) {
            next(error)
        }
    }

    deletePlan=async (req:Request,res:Response,next:NextFunction) => {
        try {
            const planId=req.params.id;
            const result=await this.aiplanservice.deletePlan(planId);
            successResponse(res,"Plans are deleted",result,HttpStatus.OK)
        } catch (error) {
            next(error)
        }
    }

}