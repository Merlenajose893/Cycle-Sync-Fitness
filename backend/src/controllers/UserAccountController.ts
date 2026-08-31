import { inject } from "tsyringe";
import { TOKENS } from "../container/tokens.ts";
import type { Request,Response,NextFunction } from "express";
import type { IUserStatusService } from "../interfaces/services/IUserAccountService.ts";
import { successResponse } from "../utils/response.ts";
import { HttpStatus } from "../constants/HttpStatus.ts";

export class UserAccountController{
    constructor(@inject(TOKENS.IUserStatusService) private userstatusservice:IUserStatusService)
    {

    }

    changePassword=async (req:Request,res:Response,next:NextFunction) => {
        try {
            const userId=req.user?.userId || "";
            const result=await this.userstatusservice.changePassword(userId,req.body);
            successResponse(res,"Password is changed successfully",result,HttpStatus.OK);
        } catch (error) {
            next(error)
        }
       

    }

    deleteAccount=async (req:Request,res:Response,next:NextFunction) => {
        try {
            const userId=req.user?.userId || "";
            const result=await this.userstatusservice.deleteAccount(userId,req.body);
            successResponse(res,"Account deleted successfully",result,HttpStatus.OK);
        } catch (error) {
            next(error)
        }
    }
}