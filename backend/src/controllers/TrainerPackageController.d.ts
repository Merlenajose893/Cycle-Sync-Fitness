import type { Request, Response, NextFunction } from "express";
import type { ITrainerPackageService } from "../interfaces/services/ITrainerPackageService.js";
export declare class TrainerPackageController {
    private trainerpackageservice;
    constructor(trainerpackageservice: ITrainerPackageService);
    createPackage: (req: Request, res: Response, next: NextFunction) => Promise<void>;
    updatePackage: (req: Request, res: Response, next: NextFunction) => Promise<void>;
    deletePackage: (req: Request, res: Response, next: NextFunction) => Promise<void>;
    getTrainerPackages: (req: Request, res: Response, next: NextFunction) => Promise<void>;
    getActivePackages: (req: Request, res: Response, next: NextFunction) => Promise<void>;
    getPackageById: (req: Request, res: Response, next: NextFunction) => Promise<void>;
}
//# sourceMappingURL=TrainerPackageController.d.ts.map