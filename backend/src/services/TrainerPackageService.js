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
import { NotFoundError, UnauthorizedError } from "../errors/index.js";
let TrainerPackageService = class TrainerPackageService {
    trainerpackagerepository;
    trainerRepository;
    constructor(trainerpackagerepository, trainerRepository) {
        this.trainerpackagerepository = trainerpackagerepository;
        this.trainerRepository = trainerRepository;
    }
    createPackage = async (trainerId, data) => {
        const pkg = await this.trainerpackagerepository.create({
            trainerId,
            ...data
        });
        return pkg;
    };
    updatePackage = async (trainerId, data, packageId) => {
        const pkg = await this.trainerpackagerepository.findPackageById(packageId);
        if (!pkg) {
            throw new NotFoundError("Package Not Found");
        }
        if (pkg.trainerId.toString() !== trainerId) {
            throw new UnauthorizedError("You Cannot Edit this package");
        }
        const updatedPackage = await this.trainerpackagerepository.updatePackage(packageId, data);
        return updatedPackage;
    };
    deletePackage = async (trainerId, packageId) => {
        const pkg = await this.trainerpackagerepository.findPackageById(packageId);
        if (!pkg) {
            throw new NotFoundError("Package Not Found");
        }
        if (pkg.trainerId.toString() !== trainerId) {
            throw new UnauthorizedError("Not Authorized");
        }
        pkg.isActive = false;
        await this.trainerpackagerepository.save(pkg);
    };
    getActivePackages = async (trainerId) => {
        let packages = await this.trainerpackagerepository.findActiveByTrainer(trainerId);
        if (!packages || packages.length === 0) {
            const trainer = await this.trainerRepository.findById(trainerId);
            if (trainer && trainer.packages && trainer.packages.length > 0) {
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
                    await this.trainerpackagerepository.create({
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
                packages = await this.trainerpackagerepository.findActiveByTrainer(trainerId);
            }
        }
        return packages;
    };
    getPackageById = async (packageId) => {
        const pkg = await this.trainerpackagerepository.findPackageById(packageId);
        if (!pkg) {
            throw new NotFoundError("Package Not Found");
        }
        return pkg;
    };
    getTrainerPackages = async (trainerId) => {
        const trainer = await this.trainerpackagerepository.findPackageByTrainer(trainerId);
        return trainer;
    };
};
TrainerPackageService = __decorate([
    injectable(),
    __param(0, inject(TOKENS.ITrainerPackageRepository)),
    __param(1, inject(TOKENS.ITrainerRepository)),
    __metadata("design:paramtypes", [Object, Object])
], TrainerPackageService);
export { TrainerPackageService };
//# sourceMappingURL=TrainerPackageService.js.map