import { TrainerAssignmentStatus } from "../constants/trainerassign.ts";
import type { ITrainerAssignmentRepository } from "../interfaces/repositories/ITrainerAssignmentRepository.ts";
import { TrainerAssignment, type ITrainerAssignment } from "../models/TrainerAssignment.ts";
import { BaseRepository } from "./BaseRepository.ts";

export class TrainerAssignmentRepository extends BaseRepository<ITrainerAssignment> implements ITrainerAssignmentRepository {
    constructor() {
        super(TrainerAssignment);
    }

    async findActiveByUser(userId: string): Promise<ITrainerAssignment | null> {
        return this.model.findOne({ userId, assignmentStatus: TrainerAssignmentStatus.ACTIVE });
    }

    async findActiveByTrainer(trainerId: string): Promise<ITrainerAssignment[]> {
        return this.model.find({ trainerId, assignmentStatus: TrainerAssignmentStatus.ACTIVE })
            .populate("userId", "firstName lastName email avatar")
            .populate("packageId", "packageName durationDays price");
    }

    async findExpired(): Promise<ITrainerAssignment[]> {
        return this.model.find({
            assignmentStatus: TrainerAssignmentStatus.ACTIVE,
            endDate: { $lte: new Date() }
        });
    }

    async updateAssignmentStatus(assignmentId: string, status: TrainerAssignmentStatus): Promise<ITrainerAssignment | null> {
        return this.model.findByIdAndUpdate(
            assignmentId,
            { assignmentStatus: status },
            { new: true }
        );
    }
}