import { TrainerAssignmentStatus } from "../constants/trainerassign.js";
import type { ITrainerAssignmentRepository } from "../interfaces/repositories/ITrainerAssignmentRepository.js";
import { type ITrainerAssignment } from "../models/TrainerAssignment.js";
import { BaseRepository } from "./BaseRepository.js";
export declare class TrainerAssignmentRepository extends BaseRepository<ITrainerAssignment> implements ITrainerAssignmentRepository {
    constructor();
    findActiveByUser(userId: string): Promise<ITrainerAssignment | null>;
    findActiveByTrainer(trainerId: string): Promise<ITrainerAssignment[]>;
    findExpired(): Promise<ITrainerAssignment[]>;
    updateAssignmentStatus(assignmentId: string, status: TrainerAssignmentStatus): Promise<ITrainerAssignment | null>;
}
//# sourceMappingURL=TrainerAssignmentRepository.d.ts.map