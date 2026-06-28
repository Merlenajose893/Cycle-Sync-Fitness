import type { Response } from "express";
export const successResponse=(res:Response,message:string,data:unknown=null,statusCode:number=200):Response=>{
    return res.status(statusCode).json({
        success:true,
        message,
        data
    })
}

export const errorResponse=(res:Response,message:string,statusCode:number=500,errors:unknown=null):Response=>{
    return res.status(statusCode).json({
        success:false,
        message,
        errors
    })
}