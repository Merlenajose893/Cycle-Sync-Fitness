import type { Request, Response, NextFunction } from "express";
import type { IAIPlanService } from "../interfaces/services/IAIPlanService.js";
export declare class AIPlanController {
    private aiplanservice;
    constructor(aiplanservice: IAIPlanService);
    generatePlan: (req: Request, res: Response, next: NextFunction) => Promise<void>;
    createDraftPlan: (req: Request, res: Response, next: NextFunction) => Promise<void>;
    getActivePlan: (req: Request, res: Response, next: NextFunction) => Promise<void>;
    getPlanHistory: (req: Request, res: Response, next: NextFunction) => Promise<void>;
    updatePlanStatus: (req: Request, res: Response, next: NextFunction) => Promise<void>;
    editPlan: (req: Request, res: Response, next: NextFunction) => Promise<void>;
    deletePlan: (req: Request, res: Response, next: NextFunction) => Promise<void>;
}
//# sourceMappingURL=AIPlanController.d.ts.map