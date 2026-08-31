import type { TrainerAssignmentStatus } from "../constants/trainerassign.ts";

export interface CreateAssignmentDTO {
    userId: string;
    trainerId:string;
    packageId: string;
    paymentId: string;
}

export interface UpdateAssignmentDTO {
    assignmentStatus: TrainerAssignmentStatus;
}