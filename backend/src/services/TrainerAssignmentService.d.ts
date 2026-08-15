import type { ITrainerAssignmentService } from "../interfaces/services/ITrainerAssignmentService.js";
import type { ITrainerAssignmentRepository } from "../interfaces/repositories/ITrainerAssignmentRepository.js";
import type { IPaymentRepository } from "../interfaces/repositories/IPaymentRepository.js";
import type { CreateAssignmentDTO } from "../dtos/trainerAssignment.dto.js";
import type { ITrainerAssignment } from "../models/TrainerAssignment.js";
import { TrainerAssignmentStatus } from "../constants/trainerassign.js";
import type { ITrainerPackageRepository } from "../interfaces/repositories/ITrainerPackageRepository.js";
export declare class TrainerAssignmentService implements ITrainerAssignmentService {
    private trainerassignrepository;
    private trainerpackagerepository;
    private paymentRepository;
    constructor(trainerassignrepository: ITrainerAssignmentRepository, trainerpackagerepository: ITrainerPackageRepository, paymentRepository: IPaymentRepository);
    createAssignment: (data: CreateAssignmentDTO) => Promise<ITrainerAssignment>;
    getAssignmentById: (assignmentId: string) => Promise<ITrainerAssignment | null>;
    getActiveAssignmentByUser: (userId: string) => Promise<ITrainerAssignment | null>;
    getTrainerClients: (trainerId: string) => Promise<ITrainerAssignment[]>;
    processExpiredAssignments: () => Promise<number>;
    updateAssignmentStatus: (assignmentId: string, status: TrainerAssignmentStatus) => Promise<ITrainerAssignment | null>;
}
//# sourceMappingURL=TrainerAssignmentService.d.ts.map