var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
import { inject, injectable } from "tsyringe";
import { TOKENS } from "../container/tokens.js";
import { TrainerAssignmentStatus } from "../constants/trainerassign.js";
import { PaymentStatus } from "../constants/payment.js";
import { ConflictError, NotFoundError } from "../errors/index.js";
let TrainerAssignmentService = class TrainerAssignmentService {
    trainerassignrepository;
    trainerpackagerepository;
    paymentRepository;
    constructor(trainerassignrepository, trainerpackagerepository, paymentRepository) {
        this.trainerassignrepository = trainerassignrepository;
        this.trainerpackagerepository = trainerpackagerepository;
        this.paymentRepository = paymentRepository;
    }
    createAssignment = async (data) => {
        const trainerPackage = await this.trainerpackagerepository.findById(data.packageId);
        if (!trainerPackage) {
            throw new NotFoundError("Trainer Package not found");
        }
        const existingAssignment = await this.trainerassignrepository.findActiveByUser(data.userId);
        if (existingAssignment) {
            return existingAssignment;
        }
        const startDate = new Date();
        const endDate = new Date(startDate);
        endDate.setDate(endDate.getDate() + trainerPackage.durationDays);
        const assignment = await this.trainerassignrepository.create({
            userId: data.userId,
            trainerId: trainerPackage.trainerId,
            paymentId: data.paymentId,
            packageId: trainerPackage._id,
            startDate,
            endDate,
            assignmentStatus: TrainerAssignmentStatus.ACTIVE
        });
        return assignment;
    };
    getAssignmentById = async (assignmentId) => {
        const assignment = await this.trainerassignrepository.findById(assignmentId);
        if (!assignment) {
            throw new NotFoundError("Trainer assignment not found");
        }
        return assignment;
    };
    getActiveAssignmentByUser = async (userId) => {
        const assignment = await this.trainerassignrepository.findActiveByUser(userId);
        if (!assignment) {
            throw new NotFoundError("No active trainer assignment not found");
        }
        return assignment;
    };
    getTrainerClients = async (trainerId) => {
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
                            }
                            catch (e) {
                                // ignore
                            }
                        }
                    }
                }
            }
        }
        catch (err) {
            console.error("Error auto-syncing trainer client assignments:", err);
        }
        return await this.trainerassignrepository.findActiveByTrainer(trainerId);
    };
    processExpiredAssignments = async () => {
        const expiredAssignments = await this.trainerassignrepository.findExpired();
        for (const assignment of expiredAssignments) {
            await this.trainerassignrepository.updateAssignmentStatus(assignment._id, TrainerAssignmentStatus.EXPIRED);
        }
        return expiredAssignments.length;
    };
    updateAssignmentStatus = async (assignmentId, status) => {
        const assignment = await this.trainerassignrepository.findById(assignmentId);
        if (!assignment) {
            throw new NotFoundError("Trainer assignment not Found");
        }
        return await this.trainerassignrepository.updateAssignmentStatus(assignmentId, status);
    };
};
TrainerAssignmentService = __decorate([
    injectable(),
    __param(0, inject(TOKENS.ITrainerAssignmentRepository)),
    __param(1, inject(TOKENS.ITrainerPackageRepository)),
    __param(2, inject(TOKENS.IPaymentRepository)),
    __metadata("design:paramtypes", [Object, Object, Object])
], TrainerAssignmentService);
export { TrainerAssignmentService };
//# sourceMappingURL=TrainerAssignmentService.js.map