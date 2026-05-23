import type { Request,Response,NextFunction } from "express";
import type { AnyZodObject } from "zod/v3";
import { BadRequestError } from "../errors/index.js";
export const validate=(schema:AnyZodObject)=>{
    return(req:Request,res:Response,next:NextFunction):void=>{
        const result=schema.safeParse(req.body)
        if(!result.success)
        {
            const errors=result.error.errors.map((err)=>({
                field:err.path.join("."),
                message:err.message,
            }))

            throw new BadRequestError(JSON.stringify(errors))
        }
        req.body=result.data;
        next();
    }
}