import type { Request, Response, NextFunction } from "express";
import type { IUserStatusService } from "../interfaces/services/IUserAccountService.js";
export declare class UserAccountController {
    private userstatusservice;
    constructor(userstatusservice: IUserStatusService);
    changePassword: (req: Request, res: Response, next: NextFunction) => Promise<void>;
    deleteAccount: (req: Request, res: Response, next: NextFunction) => Promise<void>;
}
//# sourceMappingURL=UserAccountController.d.ts.map