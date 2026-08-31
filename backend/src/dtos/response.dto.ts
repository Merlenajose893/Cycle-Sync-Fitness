import type { string } from "zod";
import { HttpStatus } from "../constants/HttpStatus.ts";

export interface CommonResponse<T=null>{
success:boolean;
message:string;
data?:T|null;
statusCode:HttpStatus
}

export const successResponse=<T>(
message:string,
    data:T|null=null,
    statusCode:HttpStatus=HttpStatus.OK
):CommonResponse <T>=>
{
return{
    success:true,
    statusCode,
    message,
    data,
};
}

export const errorResponse=<T>(
    message:string,
    data?:T|null,
    statusCode:HttpStatus=HttpStatus.INTERNAL_SERVER_ERROR,

):CommonResponse<null>=>{
    return{
        success:true,
        statusCode,
        message,
        data:null
    }
}
    
