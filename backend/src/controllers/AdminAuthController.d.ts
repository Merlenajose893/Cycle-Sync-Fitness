import type { Request, Response, NextFunction } from "express";
import type { IAdminService } from "../interfaces/services/IAdminService.js";
export declare class AdminController {
    private adminService;
    constructor(adminService: IAdminService);
    adminLogin: (req: Request, res: Response, next: NextFunction) => Promise<void>;
    listUsers: (req: Request, res: Response, next: NextFunction) => Promise<void>;
    listTrainers: (req: Request, res: Response, next: NextFunction) => Promise<void>;
    blockUser: (req: Request, res: Response, next: NextFunction) => Promise<void>;
    unblockUser: (req: Request, res: Response, next: NextFunction) => Promise<void>;
    blockTrainer: (req: Request, res: Response, next: NextFunction) => Promise<void>;
    unblockTrainer: (req: Request, res: Response, next: NextFunction) => Promise<void>;
    inviteTrainerController: (req: Request, res: Response, next: NextFunction) => Promise<void>;
    getPendingTrainers: (req: Request, res: Response, next: NextFunction) => Promise<void>;
    approveTrainer: (req: Request, res: Response, next: NextFunction) => Promise<void>;
    rejectTrainer: (req: Request, res: Response, next: NextFunction) => Promise<void>;
}
//# sourceMappingURL=AdminAuthController.d.ts.map