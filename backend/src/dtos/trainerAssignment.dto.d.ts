import type { TrainerAssignmentStatus } from "../constants/trainerassign.js";
export interface CreateAssignmentDTO {
    userId: string;
    trainerId: string;
    packageId: string;
    paymentId: string;
}
export interface UpdateAssignmentDTO {
    assignmentStatus: TrainerAssignmentStatus;
}
//# sourceMappingURL=trainerAssignment.dto.d.ts.map