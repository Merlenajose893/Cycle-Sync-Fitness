import { ForbiddenError, UnauthorizedError } from "../errors/index.js";
export const roleMiddleware = (...allowedroles) => {
    return (req, res, next) => {
        if (!req.user) {
            throw new UnauthorizedError("User not authenticated");
        }
        const userRole = (req.user?.role || "").toLowerCase();
        const allowed = allowedroles.map((r) => String(r).toLowerCase());
        if (!allowed.includes(userRole)) {
            throw new ForbiddenError("Access denied");
        }
        next();
    };
};
//# sourceMappingURL=roleMiddleWare.js.map