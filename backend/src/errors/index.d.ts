export declare class AppError extends Error {
    statuscode: number;
    constructor(message: string, statuscode: number);
}
export declare class BadRequestError extends AppError {
    constructor(message: string);
}
export declare class UnauthorizedError extends AppError {
    constructor(message: string);
}
export declare class ForbiddenError extends AppError {
    constructor(message: string);
}
export declare class NotFoundError extends AppError {
    constructor(message: string);
}
export declare class ConflictError extends AppError {
    constructor(message: string);
}
export declare class ServiceUnavailableError extends AppError {
    constructor(message: string);
}
//# sourceMappingURL=index.d.ts.map