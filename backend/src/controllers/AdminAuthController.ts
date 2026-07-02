import type { Request,Response,NextFunction } from "express";
<<<<<<< HEAD
import { container, inject,injectable } from "tsyringe";
import { successResponse } from "../utils/response.js";
import type { IAdminService } from "../interfaces/services/IAdminService.js";
import { TOKENS } from "../container/tokens.js";
import { HttpStatus } from "../constants/HttpStatus.js";
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
    }
