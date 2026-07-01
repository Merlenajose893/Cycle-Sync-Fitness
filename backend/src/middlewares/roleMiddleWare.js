import { ForbiddenError, UnauthorizedError } from "../errors/index.js";
export const roleMiddleware = (...allowedroles) => {
    return (req, res, next) => {
        if (!req.user) {
            throw new UnauthorizedError("User not authenticated");
        }
        if (!allowedroles.includes(req.user.role)) {
            throw new ForbiddenError("Access denied");
        }
        next();
    };
};
//# sourceMappingURL=roleMiddleWare.js.map