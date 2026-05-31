import type { Request,Response,NextFunction } from "express";
import type { ZodSchema } from "zod/v3";
import { BadRequestError } from "../errors/index.js";
export const validate=(schema:ZodSchema)=>{
    return(req:Request,res:Response,next:NextFunction):void=>{
        const result=schema.safeParse(req.body)
        if(!result.success)
        {
            const errors=result.error.issues.map((err)=>({
                field:err.path.join("."),
                message:err.message,
            }))

            throw new BadRequestError(JSON.stringify(errors))
        }
        req.body=result.data;
        next();
    }
}