import { inject, injectable } from "tsyringe";
import type { ITrainerAssignmentService } from "../interfaces/services/ITrainerAssignmentService.js";
import { TOKENS } from "../container/tokens.js";
import type { ITrainerAssignmentRepository } from "../interfaces/repositories/ITrainerAssignmentRepository.js";
import type { IPaymentRepository } from "../interfaces/repositories/IPaymentRepository.js";
import type { CreateAssignmentDTO } from "../dtos/trainerAssignment.dto.js";
import type { ITrainerAssignment } from "../models/TrainerAssignment.js";
import { TrainerAssignmentStatus } from "../constants/trainerassign.js";
import { PaymentStatus } from "../constants/payment.js";
import { ConflictError, NotFoundError } from "../errors/index.js";
import type { ITrainerPackageRepository } from "../interfaces/repositories/ITrainerPackageRepository.js";

@injectable()
export class TrainerAssignmentService implements ITrainerAssignmentService{
    constructor(
        @inject(TOKENS.ITrainerAssignmentRepository) private trainerassignrepository:ITrainerAssignmentRepository,
        @inject(TOKENS.ITrainerPackageRepository) private trainerpackagerepository:ITrainerPackageRepository,
        @inject(TOKENS.IPaymentRepository) private paymentRepository:IPaymentRepository
    )
    {

    }
    createAssignment=async(data: CreateAssignmentDTO): Promise<ITrainerAssignment> =>{
        const trainerPackage=await this.trainerpackagerepository.findById(data.packageId);
        if(!trainerPackage)
        {
            throw new NotFoundError("Trainer Package not found")
        }
        const existingAssignment=await this.trainerassignrepository.findActiveByUser(data.userId);
        if(existingAssignment)
        {
            return existingAssignment;
        }
        const startDate=new Date();
        const endDate=new Date(startDate);
        endDate.setDate(endDate.getDate()+trainerPackage.durationDays);
        const assignment=await this.trainerassignrepository.create({
            userId:data.userId,
            trainerId:trainerPackage.trainerId,
            paymentId:data.paymentId,
            packageId:trainerPackage._id,
            startDate,
            endDate,
            assignmentStatus:TrainerAssignmentStatus.ACTIVE

        })
        return assignment;
    }
    getAssignmentById=async(assignmentId: string): Promise<ITrainerAssignment | null>=> {
        const assignment=await this.trainerassignrepository.findById(assignmentId);
        if(!assignment)
        {
            throw new NotFoundError("Trainer assignment not found");
        }
        return assignment;
    }
    getActiveAssignmentByUser=async(userId: string): Promise<ITrainerAssignment | null> =>{
        const assignment=await this.trainerassignrepository.findActiveByUser(userId);
        if(!assignment)
        {
            throw new NotFoundError("No active trainer assignment not found");
        }
        return assignment;
    }
    getTrainerClients=async(trainerId: string): Promise<ITrainerAssignment[]> =>{
        try {
            const payments = await this.paymentRepository.findByTrainer(trainerId);
            if (payments && payments.length > 0) {
                for (const payment of payments) {
                    if (payment.paymentStatus === PaymentStatus.COMPLETED) {
                        const existing = await this.trainerassignrepository.findActiveByUser(payment.userId.toString());
                        if (!existing) {
                            try {
                                await this.createAssignment({
                                    userId: payment.userId.toString(),
                                    packageId: payment.packageId.toString(),
                                    paymentId: payment._id.toString()
                                });
                            } catch (e) {
                                // ignore
                            }
                        }
                    }
                }
            }
        } catch (err) {
            console.error("Error auto-syncing trainer client assignments:", err);
        }

        return await this.trainerassignrepository.findActiveByTrainer(trainerId);
    }
    processExpiredAssignments=async(): Promise<number> =>{
        const expiredAssignments=await this.trainerassignrepository.findExpired();
        for(const assignment of expiredAssignments)
        {
            await this.trainerassignrepository.updateAssignmentStatus(assignment._id,TrainerAssignmentStatus.EXPIRED)
        }
        return expiredAssignments.length;
    }
    updateAssignmentStatus=async(assignmentId: string, status: TrainerAssignmentStatus): Promise<ITrainerAssignment | null> =>{
        const assignment=await this.trainerassignrepository.findById(assignmentId);
        if(!assignment)
        {
            throw new NotFoundError("Trainer assignment not Found");
        }
        return await this.trainerassignrepository.updateAssignmentStatus(assignmentId,status);
    }

}