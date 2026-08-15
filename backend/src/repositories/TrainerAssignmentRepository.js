import { TrainerAssignmentStatus } from "../constants/trainerassign.js";
import { TrainerAssignment } from "../models/TrainerAssignment.js";
import { BaseRepository } from "./BaseRepository.js";
export class TrainerAssignmentRepository extends BaseRepository {
    constructor() {
        super(TrainerAssignment);
    }
    async findActiveByUser(userId) {
        return this.model.findOne({ userId, assignmentStatus: TrainerAssignmentStatus.ACTIVE });
    }
    async findActiveByTrainer(trainerId) {
        return this.model.find({ trainerId, assignmentStatus: TrainerAssignmentStatus.ACTIVE })
            .populate("userId", "firstName lastName email avatar")
            .populate("packageId", "packageName durationDays price");
    }
    async findExpired() {
        return this.model.find({
            assignmentStatus: TrainerAssignmentStatus.ACTIVE,
            endDate: { $lte: new Date() }
        });
    }
    async updateAssignmentStatus(assignmentId, status) {
        return this.model.findByIdAndUpdate(assignmentId, { assignmentStatus: status }, { new: true });
    }
}
//# sourceMappingURL=TrainerAssignmentRepository.js.map