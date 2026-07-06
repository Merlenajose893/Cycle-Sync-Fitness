import type { Request,Response,NextFunction } from "express";

import { container, inject,injectable } from "tsyringe";
import { successResponse } from "../utils/response.js";
import type { IAdminService } from "../interfaces/services/IAdminService.js";
import { TOKENS } from "../container/tokens.js";
import { HttpStatus } from "../constants/HttpStatus.js";
import type { InviteTrainerDTO } from "../dtos/admin.dto.js";
@injectable()

    export class AdminController{
        constructor(@inject(TOKENS.IAdminService) private adminService:IAdminService){}
        adminLogin=async (req:Request,res:Response,next:NextFunction):Promise<void> => {
            try {
               const result= await this.adminService.adminLogin(req.body,res);
                successResponse(res,"Admin Login Successfully",result,HttpStatus.OK)
            } catch (error) {
                next(error)
            }
        }

        listUsers=async (req:Request,res:Response,next:NextFunction):Promise<void> => {
            try {
                const result=await this.adminService.listUsers({page:Number(req.query.page)||1,limit:Number(req.query.limit||10)});
                successResponse(res,"Users are retrieved successfully",result,HttpStatus.OK)
            } catch (error) {
                next(error)
            }
        }

        listTrainers=async (req:Request,res:Response,next:NextFunction) => {
            try {
                const result=await this.adminService.listTrainer({
                    page:Number(req.query.page)||1,
                    limit:Number(req.query.limit)||10
                });
                successResponse(res,"Trainers are retrieved successfully",result,HttpStatus.OK)
            } catch (error) {
                next(error)
            }
        }


        blockUser=async (req:Request,res:Response,next:NextFunction) => {
            try {
                const userId=req.params.id as string;
                const result=await this.adminService.blockUser(userId);
                successResponse(res,"User is blocked Successfully",result,HttpStatus.OK);

            } catch (error) {
                next(error)
            }
        }

        unblockUser=async (req:Request,res:Response,next:NextFunction) => {
            try {
               const userId=req.params.id as string;
               const result=await this.adminService.unblockUser(userId);
               successResponse(res,"User is unblocked successfully",result,HttpStatus.OK) 
            } catch (error) {
                next(error)
            }
        }

        blockTrainer=async (req:Request,res:Response,next:NextFunction) => {
            try {
                const trainerId=req.params.id as string;
                const result=await this.adminService.blockTrainer(trainerId);
                successResponse(res,"Trainer blocked successfully",result,HttpStatus.OK);
            } catch (error) {
                next(error)
            }
        }

        unblockTrainer=async (req:Request,res:Response,next:NextFunction) => {
            try {
                const trainerId=req.params.id as string;
                const result=await this.adminService.unblockTrainer(trainerId);
                successResponse(res,"Trainer unblocked successfully",result,HttpStatus.OK)
            } catch (error) {
                
            }
        }

        inviteTrainerController=async (req:Request,res:Response,next:NextFunction) => {
            try {
                const data:InviteTrainerDTO=req.body;
                const result=await this.adminService.inviteTrainer(data);
                successResponse(res,"Trainer is invited",result,HttpStatus.OK);
            } catch (error) {
                next(error)
            }
        }
    }
