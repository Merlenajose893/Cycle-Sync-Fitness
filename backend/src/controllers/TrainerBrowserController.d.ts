import type { ITrainerBrowserService } from "../interfaces/services/ITrainerBrowserService.js";
import type { NextFunction, Request, Response } from "express";
export declare class TrainerBrowserController {
    private trainerbrowserservice;
    constructor(trainerbrowserservice: ITrainerBrowserService);
    browseTrainers: (req: Request, res: Response, next: NextFunction) => Promise<void>;
    getTrainerProfile: (req: Request, res: Response, next: NextFunction) => Promise<void>;
}
//# sourceMappingURL=TrainerBrowserController.d.ts.map