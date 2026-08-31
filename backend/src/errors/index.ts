import { HttpStatus } from "../constants/HttpStatus.ts";

export class AppError extends Error{
    public statuscode:number;
    constructor(message:string,statuscode:number)
    {
        super(message)
        this.statuscode=statuscode;
        Error.captureStackTrace(this,this.constructor)
    }
}

export class BadRequestError extends AppError{
    constructor(message:string)
    {
        super(message,HttpStatus.BAD_REQUEST);
    }
}

export class UnauthorizedError extends AppError{
    constructor(message:string)
    {
        super(message,HttpStatus.UNAUTHORIZED);
    }
}

export class ForbiddenError extends AppError{
    constructor(message:string)
    {
        super(message,HttpStatus.FORBIDDEN)
    }
}

export class NotFoundError extends AppError{
    constructor(message:string)
    {
        super(message,HttpStatus.NOT_FOUND)
    }
}
export class ConflictError extends AppError{
    constructor(message:string)
    {
        super(message,HttpStatus.CONFLICT)
    }
}

export class ServiceUnavailableError extends AppError{
    constructor(message:string)
    {
        super(message,HttpStatus.SERVICE_UNAVAILABLE)
    }
}