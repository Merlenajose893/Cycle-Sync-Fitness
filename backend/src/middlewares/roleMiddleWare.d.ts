import type { Request, Response, NextFunction } from "express";
import type { UserRole } from "../types/auth.types.js";
export declare const roleMiddleware: (...allowedroles: UserRole[]) => (req: Request, res: Response, next: NextFunction) => void;
//# sourceMappingURL=roleMiddleWare.d.ts.map