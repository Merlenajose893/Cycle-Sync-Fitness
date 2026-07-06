import type { ITrainer } from "../models/Trainer.js";
import type { ITrainerRepository } from "../interfaces/repositories/ITrainerRepository.js";
import { BaseRepository } from "./BaseRepository.js";
export declare class TrainerRepository extends BaseRepository<ITrainer> implements ITrainerRepository {
    constructor();
    findByEmail(email: string): Promise<ITrainer | null>;
    
}
//# sourceMappingURL=TrainerRepository.d.ts.map