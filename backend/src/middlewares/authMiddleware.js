import jwt from "jsonwebtoken";
import { UnauthorizedError } from "../errors/index.js";
export const authMiddleware = (req, res, next) => {
    const token = req.cookies.access_token;
    if (!token) {
        throw new UnauthorizedError("Access token missing");
    }
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    }
    catch (error) {
        console.log(error);
        throw new UnauthorizedError("Invalid access token");
    }
};
//# sourceMappingURL=authMiddleware.js.map