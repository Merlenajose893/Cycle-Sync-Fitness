import type { ITrainerAssignment } from "../../models/TrainerAssignment.js";
import type { IBaseRepository } from "./IBaseRepository.js";
import type { TrainerAssignmentStatus } from "../../constants/trainerassign.js";

export interface ITrainerAssignmentRepository extends IBaseRepository<ITrainerAssignment> {
    findActiveAssignmentByUserId(userId: string): Promise<ITrainerAssignment | null>;
    findAllAssignmentsByUser(userId: string, status?: TrainerAssignmentStatus | string): Promise<ITrainerAssignment[]>;
    hasActiveAssignment(userId: string): Promise<boolean>;
    findClientsByTrainerId(trainerId: string): Promise<ITrainerAssignment[]>;
    countActiveClientsByTrainerId(trainerId: string): Promise<number>;
    findByPaymentId(paymentId: string): Promise<ITrainerAssignment | null>;
    findByPackageId(packageId: string): Promise<ITrainerAssignment[]>;
    findExpiredActiveAssignments(currentDate?: Date): Promise<ITrainerAssignment[]>;
    updateStatus(assignmentId: string, newStatus: TrainerAssignmentStatus | string): Promise<ITrainerAssignment | null>;
    findAssignmentWithDetails(assignmentId: string): Promise<ITrainerAssignment | null>;
}