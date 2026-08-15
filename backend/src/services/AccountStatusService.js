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
import { ForbiddenError, NotFoundError, UnauthorizedError, } from "../errors/index.js";
let AccountStatusService = class AccountStatusService {
    userRepository;
    trainerRepository;
    constructor(userRepository, trainerRepository) {
        this.userRepository = userRepository;
        this.trainerRepository = trainerRepository;
    }
    async verifyAccount(userId, role) {
        if (role === "user") {
            await this.verifyUser(userId);
            return;
        }
        if (role === "trainer") {
            await this.verifyTrainer(userId);
            return;
        }
        throw new UnauthorizedError("Invalid role");
    }
    async verifyUser(userId) {
        const user = await this.userRepository.findById(userId);
        if (!user) {
            throw new NotFoundError("User not found");
        }
        if (user.isDeleted) {
            throw new ForbiddenError("Your account has been blocked.");
        }
    }
    async verifyTrainer(trainerId) {
        const trainer = await this.trainerRepository.findById(trainerId);
        if (!trainer) {
            throw new NotFoundError("Trainer not found");
        }
        if (trainer.isDeleted) {
            throw new ForbiddenError("Your account has been blocked.");
        }
    }
};
AccountStatusService = __decorate([
    injectable(),
    __param(0, inject(TOKENS.IUserRepository)),
    __param(1, inject(TOKENS.ITrainerRepository)),
    __metadata("design:paramtypes", [Object, Object])
], AccountStatusService);
export { AccountStatusService };
//# sourceMappingURL=AccountStatusService.js.map