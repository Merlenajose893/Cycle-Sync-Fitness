import type { TrainerAssignmentStatus } from "../../constants/trainerassign.js";
import type { CreateAssignmentDTO } from "../../dtos/trainerAssignment.dto.js";
import type { ITrainerAssignment } from "../../models/TrainerAssignment.js";

export interface ITrainerAssignmentService {
    createAssignment(data: CreateAssignmentDTO): Promise<ITrainerAssignment>;
    getAssignmentById(assignmentId: string): Promise<ITrainerAssignment | null>;
    getActiveAssignmentByUser(userId: string): Promise<ITrainerAssignment | null>;
    getTrainerClients(trainerId: string): Promise<ITrainerAssignment[]>;
    updateAssignmentStatus(assignmentId: string, status: TrainerAssignmentStatus): Promise<ITrainerAssignment | null>;
    processExpiredAssignments(): Promise<number>;
    
}