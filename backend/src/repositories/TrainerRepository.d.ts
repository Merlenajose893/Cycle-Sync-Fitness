import type { ITrainer } from "../models/Trainer.js";
import type { ITrainerRepository } from "../interfaces/repositories/ITrainerRepository.js";
import { BaseRepository } from "./BaseRepository.js";
import { TrainerStatus } from "../constants/TrainerStatus.js";
export declare class TrainerRepository extends BaseRepository<ITrainer> implements ITrainerRepository {
    constructor();
    findByEmail(email: string): Promise<ITrainer | null>;
    blockTrainer(trainerId: string): Promise<ITrainer | null>;
    unblockTrainer(trainerId: string): Promise<ITrainer | null>;
    findByInviteToken(token: string): Promise<ITrainer | null>;
    updateTrainerInvite(trainerId: string, inviteToken: string, inviteExpiresAt: Date): Promise<ITrainer | null>;
    acceptTrainer(trainerId: string, hashedPassword: string): Promise<ITrainer | null>;
    findByStatus(status: TrainerStatus): Promise<ITrainer[]>;
    findApprovedTrainers(): Promise<ITrainer[]>;
}
//# sourceMappingURL=TrainerRepository.d.ts.map