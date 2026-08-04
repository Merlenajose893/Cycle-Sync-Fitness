import type { TrainerAssignmentStatus } from "../constants/trainerassign.js";

export interface CreateAssignmentDTO {
    userId: string;
    packageId: string;
    paymentId: string;
}

export interface UpdateAssignmentDTO {
    assignmentStatus: TrainerAssignmentStatus;
}