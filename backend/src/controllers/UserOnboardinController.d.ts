import { Request, Response, NextFunction } from "express";
import { IUserOnboardingService } from "../interfaces/services/IUserOnboardingService.js";
export declare class UserOnboardingControlling {
    private useronboardingService;
    constructor(useronboardingService: IUserOnboardingService);
    getOnboardingStatus(req: Request, res: Response, next: NextFunction): Promise<void>;
    updateBodyDetails(req: Request, res: Response, next: NextFunction): Promise<void>;
    updateCycleDetails(req: Request, res: Response, next: NextFunction): Promise<void>;
    updateGoals(req: Request, res: Response, next: NextFunction): Promise<void>;
    completeOnboarding(req: Request, res: Response, next: NextFunction): Promise<void>;
}
//# sourceMappingURL=UserOnboardinController.d.ts.map