import type { Request,Response,NextFunction } from "express";
import type { IDashboardService } from "../interfaces/services/IDashboardService.js";
import { successResponse } from "../utils/response.js";
import { HttpStatus } from "../constants/HttpStatus.js";
export class DashboardController{
    constructor(private dashboardService:IDashboardService)
    {

    }

    getDashboard=async(req:Request,res:Response,next:NextFunction)=>{
        try {
            const userId=req.user?.userId;
            const dashboard=await this.dashboardService.getDashboard(userId!);
            successResponse(res,"Dashboard fetched successfully",dashboard,HttpStatus.OK);

        } catch (error) {
            next(error)
        }
    }
}