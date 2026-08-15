import type { Request, Response, NextFunction } from "express";
import type { ITrainerAuthService } from "../interfaces/services/ITrainerAuthService.js";
export declare class TrainerAuthController {
    private trainerAuthService;
    constructor(trainerAuthService: ITrainerAuthService);
    registerTrainer: (req: Request, res: Response, next: NextFunction) => Promise<void>;
    verifyTrainerOTP: (req: Request, res: Response) => Promise<void>;
    resendTrainerOTP: (req: Request, res: Response) => Promise<void>;
    loginTrainer: (req: Request, res: Response) => Promise<void>;
    logoutTrainer: (req: Request, res: Response) => Promise<void>;
    verifyTrainer: (req: Request, res: Response, next: NextFunction) => Promise<void>;
    registerFromInvite: (req: Request, res: Response, next: NextFunction) => Promise<void>;
    getCurrentTrainer: (req: Request, res: Response, next: NextFunction) => Promise<void>;
    forgotPassword: (req: Request, res: Response, next: NextFunction) => Promise<void>;
    resetPassword: (req: Request, res: Response, next: NextFunction) => Promise<void>;
}
//# sourceMappingURL=TrainerAuthController.d.ts.map