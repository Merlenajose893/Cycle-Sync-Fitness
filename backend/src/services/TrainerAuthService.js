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
import { UnauthorizedError, BadRequestError, ConflictError, NotFoundError, ForbiddenError } from "../errors/index.js";
import { TOKENS } from "../container/tokens.js";
import { TrainerStatus } from "../constants/TrainerStatus.js";
// import { TRAINER_NEXT_STEP } from "../constants/Trainer-next-step.js";
let TrainerAuthService = class TrainerAuthService {
    trainerRepository;
    otpService;
    tokenService;
    constructor(trainerRepository, otpService, tokenService) {
        this.trainerRepository = trainerRepository;
        this.otpService = otpService;
        this.tokenService = tokenService;
    }
    registerTrainer = async (data) => {
        const existingTrainer = await this.trainerRepository.findByEmail(data.email);
        if (existingTrainer) {
            throw new ConflictError("Trainer already exists");
        }
        const hashedPassword = await bcrypt.hash(data.password, 10);
        const trainer = await this.trainerRepository.create({
            firstName: data.firstName,
            lastName: data.lastName,
            email: data.email,
            password: hashedPassword,
            speciality: data.speciality,
            status: TrainerStatus.REGISTERED,
            onboardingCompleted: false,
            onboardingSteps: 1,
            rejectionReason: null
        });
        await this.otpService.createAndSentOtp(trainer._id.toString(), "trainer", trainer.email, "email-verification");
        return trainer;
    };
    loginTrainer = async (data, res) => {
        const trainer = await this.trainerRepository.findByEmail(data.email);
        if (!trainer) {
            throw new UnauthorizedError("Invalid Credentials");
        }
        const isCompare = await bcrypt.compare(data.password, trainer.password);
        if (!isCompare) {
            throw new UnauthorizedError("Invalid Credentials");
        }
        if (trainer.isDeleted) {
            throw new ForbiddenError("Your account is blocked");
        }
        await this.tokenService.generateAndSetAccessToken({
            userId: trainer._id.toString(),
            role: "trainer"
        }, res);
        await this.tokenService.generateAndSetRefreshToken({ userId: trainer._id.toString(), role: "trainer" }, res);
        return { trainer };
    };
    verifyTrainerOtp = async (data, res) => {
        await this.otpService.verifyOtp(data.trainerId, "email-verification", data.otp);
        const trainer = await this.trainerRepository.findById(data.trainerId);
        if (!trainer) {
            throw new NotFoundError("Trainer not found");
        }
        trainer.isEmailVerified = true;
        trainer.status = TrainerStatus.ONBOARDING;
        await this.trainerRepository.save(trainer);
    };
    resendOTP = async (trainerId) => {
        const trainer = await this.trainerRepository.findById(trainerId);
        console.log(trainer);
        if (!trainer) {
            throw new NotFoundError("Trainer not found");
        }
        if (trainer.isEmailVerified) {
            throw new BadRequestError("Emaol already verified");
        }
        await this.otpService.createAndSentOtp(trainer._id.toString(), "trainer", trainer.email, "email-verification");
    };
    forgotPassword = async (data, res) => {
        const trainer = await this.trainerRepository.findByEmail(data.email);
        if (!trainer) {
            throw new NotFoundError("Trainer Not  found");
        }
        await this.otpService.createAndSentOtp(trainer._id.toString(), "trainer", trainer.email, "password-reset");
        return {
            userId: trainer._id.toString(),
            email: trainer.email,
            message: "Password reset OTP has been sent to your email"
        };
    };
    resetPassword = async (data, res) => {
        let trainerId = data.userId;
        if (data.userId && data.userId.includes("@")) {
            const trainer = await this.trainerRepository.findByEmail(data.userId);
            if (!trainer) {
                throw new NotFoundError("Trainer not found");
            }
            trainerId = trainer._id.toString();
        }
        await this.otpService.verifyOtp(trainerId, "password-reset", data.otp);
        const trainer = await this.trainerRepository.findById(trainerId);
        if (!trainer) {
            throw new NotFoundError("Trainer not Found");
        }
        trainer.password = await bcrypt.hash(data.newPassword, 10);
        await this.trainerRepository.save(trainer);
    };
    logoutTrainer = async (trainerId, res) => {
        await this.tokenService.clearTokens(trainerId, res);
    };
    verifyTrainerInvite = async (token, res) => {
        const trainer = await this.trainerRepository.findByInviteToken(token);
        if (!trainer) {
            throw new BadRequestError("Invalid Token");
        }
        if (trainer.inviteAccepted) {
            throw new BadRequestError("Trainer is already invided");
        }
        if (trainer.inviteExpiresAt && trainer.inviteExpiresAt < new Date()) {
            throw new BadRequestError("Token is expired");
        }
        return trainer;
    };
    registerTrainerInvite = async (data) => {
        const trainer = await this.trainerRepository.findByInviteToken(data.token);
        if (!trainer) {
            throw new BadRequestError("Invalid Invitation");
        }
        if (trainer.inviteAccepted) {
            throw new BadRequestError("Trainer alreafy invided");
        }
        if (trainer.inviteExpiresAt && trainer.inviteExpiresAt < new Date()) {
            throw new BadRequestError("Token is expired");
        }
        const hashedPassword = await bcrypt.hash(data.password, 10);
        await this.trainerRepository.acceptTrainer(trainer._id.toString(), hashedPassword);
    };
    getCurrentTrainer = async (trainerId) => {
        const trainer = await this.trainerRepository.findById(trainerId);
        if (!trainer) {
            throw new NotFoundError("Trainer not found");
        }
        return trainer;
    };
};
TrainerAuthService = __decorate([
    injectable(),
    __param(0, inject(TOKENS.ITrainerRepository)),
    __param(1, inject(TOKENS.IOtpService)),
    __param(2, inject(TOKENS.ITokenService)),
    __metadata("design:paramtypes", [Object, Object, Object])
], TrainerAuthService);
export { TrainerAuthService };
//# sourceMappingURL=TrainerAuthService.js.map