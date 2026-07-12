import { container } from "tsyringe";
import type { Request,Response,NextFunction } from "express";
import { TOKENS } from "../container/tokens.js";
import { UnauthorizedError } from "../errors/index.js";
// import type { NextFunction } from "express";
const accountStatusService=container.resolve(TOKENS.IAccountStatusService)
export const blockMiddleWare=async (req:Request,res:Response,next:NextFunction)=>{
    try {
        const user=req.user;
        if(!user)
        {
            throw new UnauthorizedError("User is missing")
        }
        await accountStatusService.verifyAccount(req.user?.userId,req.user?.role);
        next();
    } catch (error) {
        
    }
}
