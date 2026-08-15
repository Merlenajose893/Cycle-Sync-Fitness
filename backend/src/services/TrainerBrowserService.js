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
import { NotFoundError } from "../errors/index.js";
let TrainerBrowserService = class TrainerBrowserService {
    trainerrepository;
    constructor(trainerrepository) {
        this.trainerrepository = trainerrepository;
    }
    getApprovedTrainers = async () => {
        const trainer = await this.trainerrepository.findApprovedTrainers();
        return trainer;
    };
    getTrainerProfile = async (trainerId) => {
        const trainer = await this.trainerrepository.findById(trainerId);
        if (!trainer) {
            throw new NotFoundError("Trainer Not Found");
        }
        // Strip sensitive fields before returning to public API
        const { password, inviteToken, inviteExpiresAt, inviteAccepted, isDeleted, ...safeTrainer } = trainer.toObject();
        return safeTrainer;
    };
};
TrainerBrowserService = __decorate([
    injectable(),
    __param(0, inject(TOKENS.ITrainerRepository)),
    __metadata("design:paramtypes", [Object])
], TrainerBrowserService);
export { TrainerBrowserService };
//# sourceMappingURL=TrainerBrowserService.js.map