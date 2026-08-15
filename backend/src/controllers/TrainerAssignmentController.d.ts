import type { ITrainerAssignmentService } from "../interfaces/services/ITrainerAssignmentService.js";
import type { NextFunction, Request, Response } from "express";
export declare class TrainerAssignmentController {
    private trainerassignService;
    constructor(trainerassignService: ITrainerAssignmentService);
    getActiveAssignmentByUser: (req: Request, res: Response, next: NextFunction) => Promise<void>;
    getAssignmentById: (req: Request, res: Response, next: NextFunction) => Promise<void>;
    getTrainerClients: (req: Request, res: Response, next: NextFunction) => Promise<void>;
    updateAssignmentStatus: (req: Request, res: Response, next: NextFunction) => Promise<void>;
}
//# sourceMappingURL=TrainerAssignmentController.d.ts.map