import type { ITrainerRepository } from "../interfaces/repositories/ITrainerRepository.js";
import type { ITrainerBrowserService } from "../interfaces/services/ITrainerBrowserService.js";
import type { ITrainer } from "../models/Trainer.js";
export declare class TrainerBrowserService implements ITrainerBrowserService {
    private trainerrepository;
    constructor(trainerrepository: ITrainerRepository);
    getApprovedTrainers: () => Promise<ITrainer[]>;
    getTrainerProfile: (trainerId: string) => Promise<ITrainer | null>;
}
//# sourceMappingURL=TrainerBrowserService.d.ts.map