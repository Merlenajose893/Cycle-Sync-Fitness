import { container } from "tsyringe";
import { TOKENS } from "../container/tokens.js";
import { UnauthorizedError } from "../errors/index.js";
const accountStatusService = container.resolve(TOKENS.IAccountStatusService);
export const blockMiddleWare = async (req, res, next) => {
    try {
        const requestWithUser = req;
        const user = requestWithUser.user;
        if (!user || !user.userId || !user.role) {
            throw new UnauthorizedError("User is missing");
        }
        await accountStatusService.verifyAccount(user.userId, user.role);
        next();
    }
    catch (error) {
        next(error);
    }
};
//# sourceMappingURL=blockMiddleware.js.map