import { HttpStatus } from "../constants/HttpStatus.js";
export class AppError extends Error {
    statuscode;
    constructor(message, statuscode) {
        super(message);
        this.statuscode = statuscode;
        Error.captureStackTrace(this, this.constructor);
    }
}
export class BadRequestError extends AppError {
    constructor(message) {
        super(message, HttpStatus.BAD_REQUEST);
    }
}
export class UnauthorizedError extends AppError {
    constructor(message) {
        super(message, HttpStatus.UNAUTHORIZED);
    }
}
export class ForbiddenError extends AppError {
    constructor(message) {
        super(message, HttpStatus.FORBIDDEN);
    }
}
export class NotFoundError extends AppError {
    constructor(message) {
        super(message, HttpStatus.NOT_FOUND);
    }
}
export class ConflictError extends AppError {
    constructor(message) {
        super(message, HttpStatus.CONFLICT);
    }
}
//# sourceMappingURL=index.js.map