import type { Request,Response,NextFunction } from "express";
import { ForbiddenError,UnauthorizedError } from "../errors/index.js";
import type { UserRole } from "../types/auth.types.js";
export const roleMiddleware=(...allowedroles:UserRole[])=>{
    return(req:Request,res:Response,next:NextFunction):void=>{
        if(!req.user)
        {
            throw new UnauthorizedError("User not authenticated")
        }
        if(!allowedroles.includes(req.user.role))
        {
            throw new ForbiddenError("Access denied")
        }

        next();
    }


}