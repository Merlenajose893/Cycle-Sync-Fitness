import type { TrainerAssignmentStatus } from "../../constants/trainerassign.js";
import type { ITrainerAssignment } from "../../models/TrainerAssignment.js";
import type { IBaseRepository } from "./IBaseRepository.js";

export interface ITrainerAssignmentRepository extends IBaseRepository<ITrainerAssignment>{
findActiveByUser(userId:string):Promise<ITrainerAssignment>;
findActiveByTrainer(trainerId:string):Promise<ITrainerAssignment[]>;
findExpired():Promise<ITrainerAssignment[]>;
updateAssignmentStatus(assignmentId:string,status:TrainerAssignmentStatus):Promise<ITrainerAssignment|null>;
}