import type { NextFunction,Request,Response } from "express";
import { AppError } from "../errors/index.js";
import { HttpStatus } from "../constants/HttpStatus.js";
import { errorResponse } from "../dtos/response.dto.js";
export const errorHandler=(
    err:Error,
    req:Request,
    res:Response,
    next:NextFunction
):void=>{
    if(err instanceof AppError)
    {
        res.status(err.statuscode).json(errorResponse(err.message));
        return;
    }
    console.error(err);

    res.status(HttpStatus.INTERNAL_SERVER_ERROR).json(errorResponse("Internal Server Error"))
    
}