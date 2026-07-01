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
import { TrainerOnboardingMapper } from "../mappers/TrainerOnboardingMapper.js";
import { NotFoundError } from "../errors/index.js";
let TrainerOnboardingService = class TrainerOnboardingService {
    trainerRepository;
    constructor(trainerRepository) {
        this.trainerRepository = trainerRepository;
    }
    getTrainerOnboardingStatus = async (trainerId) => {
        const trainer = await this.trainerRepository.findById(trainerId);
        if (!trainer) {
            throw new NotFoundError("Trainer Not found");
        }
        return trainer;
    };
    updateTrainerProfile = async (trainerId, data) => {
        const trainer = await this.trainerRepository.findById(trainerId);
        if (!trainer) {
            throw new NotFoundError("Trainer not found");
        }
        Object.assign(trainer, TrainerOnboardingMapper.toTrainerProfile(data));
        trainer.onboardingSteps = 2;
        return this.trainerRepository.save(trainer);
    };
    updateTrainerCertifications = async (trainerId, data) => {
        const trainer = await this.trainerRepository.findById(trainerId);
        if (!trainer) {
            throw new NotFoundError("Trainer not found");
        }
        trainer.certifications = TrainerOnboardingMapper.toTrainerCertifications(data).certifications;
        trainer.onboardingSteps = 3;
        return this.trainerRepository.save(trainer);
    };
    updateTrainerPackages = async (trainerId, data) => {
        const trainer = await this.trainerRepository.findById(trainerId);
        if (!trainer) {
            throw new NotFoundError("Trainer not found");
        }
        trainer.packages = TrainerOnboardingMapper.toTrainerPackages(data).packages;
        return this.trainerRepository.save(trainer);
    };
    completeTrainerOnboardingStatus = async (trainerId) => {
        const trainer = await this.trainerRepository.findById(trainerId);
        if (!trainer) {
            throw new NotFoundError("Trainer Not found");
        }
        trainer.onboardingCompleted = true;
        return this.trainerRepository.save(trainer);
    };
};
TrainerOnboardingService = __decorate([
    injectable(),
    __param(0, inject(TOKENS.ITrainerRepository)),
    __metadata("design:paramtypes", [Object])
], TrainerOnboardingService);
export { TrainerOnboardingService };
//# sourceMappingURL=TrainerOnbaordingService.js.map