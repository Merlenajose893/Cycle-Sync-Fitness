import type { TrainerAssignmentStatus } from "../../constants/trainerassign.ts";
import type { ITrainerAssignment } from "../../models/TrainerAssignment.ts";
import type { IBaseRepository } from "./IBaseRepository.ts";

export interface ITrainerAssignmentRepository extends IBaseRepository<ITrainerAssignment> {
    findActiveByUser(userId: string): Promise<ITrainerAssignment | null>;
    findActiveByTrainer(trainerId: string): Promise<ITrainerAssignment[]>;
    findExpired(): Promise<ITrainerAssignment[]>;
    updateAssignmentStatus(assignmentId: string, status: TrainerAssignmentStatus): Promise<ITrainerAssignment | null>;
}