import type { ITrainer } from "../../models/Trainer.js";
export interface ITrainerBrowserService {
    getApprovedTrainers(): Promise<ITrainer[]>;
    getTrainerProfile(trainerId: string): Promise<ITrainer | null>;
}
//# sourceMappingURL=ITrainerBrowserService.d.ts.map