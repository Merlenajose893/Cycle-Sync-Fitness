import type { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { UnauthorizedError } from "../errors/index.js";
import type { TokenPayload } from "../types/auth.types.js";

export const trainerAuthMiddleware = (req: Request, res: Response, next: NextFunction): void => {
    const token = req.cookies.access_token;

    if (!token) {
        throw new UnauthorizedError("Access token missing");
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as TokenPayload;
        if (decoded.role !== "trainer") {
            throw new UnauthorizedError("Insufficient Permissions");
        }
        req.user = decoded;
        next();
    } catch (error) {
        console.log(error);
        throw new UnauthorizedError("Invalid access token");
    }
};
