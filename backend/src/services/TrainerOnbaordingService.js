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
import { BadRequestError, NotFoundError } from "../errors/index.js";
import { TrainerStatus } from "../constants/TrainerStatus.js";
let TrainerOnboardingService = class TrainerOnboardingService {
    trainerRepository;
    imageService;
    trainerPackageRepository;
    constructor(trainerRepository, imageService, trainerPackageRepository) {
        this.trainerRepository = trainerRepository;
        this.imageService = imageService;
        this.trainerPackageRepository = trainerPackageRepository;
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
        const savedTrainer = await this.trainerRepository.save(trainer);
        try {
            const existingPackages = await this.trainerPackageRepository.findPackageByTrainer(trainerId);
            for (const pkg of existingPackages) {
                await this.trainerPackageRepository.deletePackage(pkg._id.toString());
            }
            for (const pkg of trainer.packages) {
                let durationDays = 30;
                if (pkg.duration === "1_week")
                    durationDays = 7;
                else if (pkg.duration === "1_month")
                    durationDays = 30;
                else if (pkg.duration === "3_months")
                    durationDays = 90;
                else if (pkg.duration === "6_months")
                    durationDays = 180;
                else if (typeof pkg.durationDays === "number")
                    durationDays = pkg.durationDays;
                await this.trainerPackageRepository.create({
                    trainerId: trainer._id,
                    packageName: pkg.name,
                    description: `${pkg.sessions || 1} Sessions included (${pkg.mode || 'online'})`,
                    durationDays,
                    price: pkg.price,
                    features: [
                        `${pkg.sessions || 1} Sessions included`,
                        `Mode: ${(pkg.mode || 'online').toUpperCase()}`,
                        `Personalized workout & nutrition plan`
                    ],
                    isActive: true
                });
            }
        }
        catch (err) {
            console.error("Error syncing trainer packages to repository:", err);
        }
        return savedTrainer;
    };
    completeTrainerOnboardingStatus = async (trainerId) => {
        const trainer = await this.trainerRepository.findById(trainerId);
        if (!trainer) {
            throw new NotFoundError("Trainer Not found");
        }
        if (trainer.status !== TrainerStatus.ONBOARDING && trainer.status !== TrainerStatus.REJECTED) {
            throw new BadRequestError("Trainer cannot submit onboarding");
        }
        trainer.status = TrainerStatus.PENDING_APPROVAL;
        trainer.rejectionReason = null;
        trainer.onboardingCompleted = true;
        return this.trainerRepository.save(trainer);
    };
    uploadDocuments = async (trainerId, files) => {
        const trainer = await this.trainerRepository.findById(trainerId);
        if (!trainer) {
            throw new NotFoundError("Trainer Not found");
        }
        if (!files || files.length === 0) {
            throw new BadRequestError("No files uploaded");
        }
        const newDocuments = [];
        for (const file of files) {
            const image = await this.imageService.uploadImage(file);
            newDocuments.push({
                type: file.originalname.toLowerCase().includes('cert') ? 'CERTIFICATE' : 'ID',
                url: image.url,
                name: file.originalname
            });
        }
        trainer.documents = [...(trainer.documents || []), ...newDocuments];
        await this.trainerRepository.save(trainer);
        return trainer;
    };
    uploadAvatar = async (trainerId, file) => {
        const trainer = await this.trainerRepository.findById(trainerId);
        console.log(trainer);
        if (!trainer) {
            throw new NotFoundError("Trainer Not found");
        }
        if (file === undefined) {
            throw new BadRequestError("File is Undefined");
        }
        const image = await this.imageService.uploadImage(file);
        trainer.avatar = image.url;
        trainer.avatarPublicId = image.publicId;
        await this.trainerRepository.save(trainer);
        return trainer;
    };
};
TrainerOnboardingService = __decorate([
    injectable(),
    __param(0, inject(TOKENS.ITrainerRepository)),
    __param(1, inject(TOKENS.IImageService)),
    __param(2, inject(TOKENS.ITrainerPackageRepository)),
    __metadata("design:paramtypes", [Object, Object, Object])
], TrainerOnboardingService);
export { TrainerOnboardingService };
//# sourceMappingURL=TrainerOnbaordingService.js.map