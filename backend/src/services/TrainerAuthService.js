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
import { UnauthorizedError, BadRequestError, ConflictError, NotFoundError } from "../errors/index.js";
import { TOKENS } from "../container/tokens.js";
import { email } from "zod";
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
            speciality: data.speciality
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
        await this.tokenService.generateAndSetAccessToken({
            userId: trainer._id.toString(),
            role: "trainer"
        }, res);
        await this.tokenService.generateAndSetRefreshToken({ userId: trainer._id.toString(), role: "trainer" }, res);
    };
    verifyTrainerOtp = async (data, res) => {
        await this.otpService.verifyOtp(data.trainerId, "email-verification", data.otp);
        const trainer = await this.trainerRepository.findById(data.trainerId);
        if (!trainer) {
            throw new NotFoundError("Trainer not found");
        }
        trainer.isEmailVerified = true;
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
    logoutTrainer = async (trainerId, res) => {
        await this.tokenService.clearTokens(trainerId, res);
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