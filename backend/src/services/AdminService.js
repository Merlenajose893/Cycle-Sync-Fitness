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
import bcrypt from "bcryptjs";
import { TOKENS } from "../container/tokens.js";
import { BadRequestError, ConflictError, NotFoundError, UnauthorizedError } from "../errors/index.js";
import crypto from "crypto";
import { TrainerStatus } from "../constants/TrainerStatus.js";
// import { tr } from "zod/locales";
let AdminService = class AdminService {
    userRepository;
    trainerRepository;
    tokenService;
    emailService;
    constructor(userRepository, trainerRepository, tokenService, emailService) {
        this.userRepository = userRepository;
        this.trainerRepository = trainerRepository;
        this.tokenService = tokenService;
        this.emailService = emailService;
    }
    adminLogin = async (data, res) => {
        const admin = await this.userRepository.findByEmail(data.email);
        if (!admin) {
            throw new UnauthorizedError("Invalid credentials");
        }
        if (admin.role !== "admin") {
            throw new UnauthorizedError("Access Denied");
        }
        const isPasswordValid = await bcrypt.compare(data.password, admin.password);
        if (!isPasswordValid) {
            throw new UnauthorizedError("Invalid credentials");
        }
        await this.tokenService.generateAndSetAccessToken({ userId: admin._id.toString(), role: "admin" }, res);
        await this.tokenService.generateAndSetRefreshToken({ userId: admin._id.toString(), role: "admin" }, res);
    };
    listUsers(pagination) {
        return this.userRepository.findAll(pagination.page, pagination.limit);
    }
    listTrainer(pagination) {
        return this.trainerRepository.findAll(pagination.page, pagination.limit);
    }
    blockUser = async (userId) => {
        const user = await this.userRepository.blockUser(userId);
        if (!user) {
            throw new NotFoundError("User not found");
        }
        return user;
    };
    unblockUser = async (userId) => {
        const user = await this.userRepository.unblockUser(userId);
        if (!user) {
            throw new NotFoundError("User not found");
        }
        return user;
    };
    blockTrainer = async (trainerId) => {
        const trainer = await this.trainerRepository.blockTrainer(trainerId);
        if (!trainer) {
            throw new NotFoundError("Trainer not found");
        }
        return trainer;
    };
    unblockTrainer = async (trainerId) => {
        const trainer = await this.trainerRepository.unblockTrainer(trainerId);
        if (!trainer) {
            throw new NotFoundError("Trainer not Found");
        }
        return trainer;
    };
    inviteTrainer = async (data) => {
        const existingTrainer = await this.trainerRepository.findByEmail(data.email);
        if (existingTrainer) {
            throw new BadRequestError("Trainer with this email already exists.");
        }
        const inviteToken = crypto.randomBytes(32).toString("hex");
        const inviteExpiresAt = new Date(Date.now() + 24 * 60 * 60 * 1000);
        const trainer = await this.trainerRepository.create({
            firstName: data.firstName,
            lastName: data.lastName,
            email: data.email,
            speciality: data.specialization,
            experience: data.experience,
            inviteToken,
            inviteExpiresAt,
            inviteAccepted: false,
            onboardingCompleted: false,
            isEmailVerified: false,
            isDeleted: false
        });
        if (!trainer) {
            throw new Error("Failed to create trainer.");
        }
        const inviteLink = `${process.env.FRONTEND_URL}/trainer/register?token=${inviteToken}`;
        await this.emailService.sendTrainerInvitation(trainer.email, trainer.firstName, inviteLink);
    };
    getPendingTrainers = async () => {
        return this.trainerRepository.findByStatus(TrainerStatus.PENDING_APPROVAL);
    };
    approveTrainer = async (trainerId) => {
        const trainer = await this.trainerRepository.findById(trainerId);
        if (!trainer) {
            throw new NotFoundError("Trainer not found");
        }
        if (trainer.status !== TrainerStatus.PENDING_APPROVAL) {
            throw new BadRequestError("Trainer is not pending approval.");
        }
        trainer.status = TrainerStatus.ACTIVE;
        return await this.trainerRepository.save(trainer);
    };
    rejectTrainer = async (trainerId, reason) => {
        const trainer = await this.trainerRepository.findById(trainerId);
        if (!trainer) {
            throw new NotFoundError("Trainer Not Found");
        }
        if (trainer.status !== TrainerStatus.PENDING_APPROVAL) {
            throw new BadRequestError("Trainer is not in pending");
        }
        trainer.status = TrainerStatus.REJECTED;
        trainer.rejectionReason = reason;
        await this.trainerRepository.save(trainer);
    };
};
AdminService = __decorate([
    injectable(),
    __param(0, inject(TOKENS.IUserRepository)),
    __param(1, inject(TOKENS.ITrainerRepository)),
    __param(2, inject(TOKENS.ITokenService)),
    __param(3, inject(TOKENS.IEmailService)),
    __metadata("design:paramtypes", [Object, Object, Object, Object])
], AdminService);
export { AdminService };
//# sourceMappingURL=AdminService.js.map