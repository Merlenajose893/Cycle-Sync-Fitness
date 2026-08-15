import type { Request, Response, NextFunction } from "express";
import type { ITrainerOnboardingService } from "../interfaces/services/ITrainerOnboardingService.js";
export declare class TrainerOnboardingController {
    private trainerOnboardingService;
    constructor(trainerOnboardingService: ITrainerOnboardingService);
    getTrainerOnboardingStatus(req: Request, res: Response, next: NextFunction): Promise<void>;
    updateTrainerProfile(req: Request, res: Response, next: NextFunction): Promise<void>;
    updateTrainerCertifications(req: Request, res: Response, next: NextFunction): Promise<void>;
    updateTrainerPackages(req: Request, res: Response, next: NextFunction): Promise<void>;
    completeTrainerOnboarding(req: Request, res: Response, next: NextFunction): Promise<void>;
    uploadAvatar: (req: Request, res: Response, next: NextFunction) => Promise<void>;
    uploadDocuments: (req: Request, res: Response, next: NextFunction) => Promise<void>;
}
//# sourceMappingURL=TrainerOnboardingController.d.ts.map