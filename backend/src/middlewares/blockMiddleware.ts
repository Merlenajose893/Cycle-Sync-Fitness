import { container } from "tsyringe";
import type { Request, Response, NextFunction } from "express";
import { TOKENS } from "../container/tokens.ts";
import { UnauthorizedError } from "../errors/index.ts";
import type { IAccountStatusService } from "../interfaces/services/IAccountStatusService.ts";
import type { TokenPayload } from "../types/auth.types.ts";

const accountStatusService = container.resolve(TOKENS.IAccountStatusService) as IAccountStatusService;

export const blockMiddleWare = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const requestWithUser = req as Request & { user?: TokenPayload };
        const user = requestWithUser.user;

        if (!user || !user.userId || !user.role) {
            throw new UnauthorizedError("User is missing");
        }

        await accountStatusService.verifyAccount(user.userId, user.role);
        next();
    } catch (error) {
        next(error);
    }
};
