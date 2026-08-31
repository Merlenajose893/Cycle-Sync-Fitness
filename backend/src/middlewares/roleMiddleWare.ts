import type { Request,Response,NextFunction } from "express";
import { ForbiddenError,UnauthorizedError } from "../errors/index.ts";
import type { UserRole } from "../types/auth.types.ts";
export const roleMiddleware = (...allowedroles: string[]) => {
    return (req: Request, res: Response, next: NextFunction): void => {
        if (!req.user) {
            throw new UnauthorizedError("User not authenticated");
        }
        const userRole = (req.user.role || "").toLowerCase();
        const allowed = allowedroles.map((r) => r.toLowerCase());
        if (!allowed.includes(userRole)) {
            throw new ForbiddenError("Access denied");
        }

        next();
    };
};