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
import { UserOnboardingMapper } from "../mappers/UserOnboardingMappers.js";
let UserOnboardingService = class UserOnboardingService {
    userRepository;
    constructor(userRepository) {
        this.userRepository = userRepository;
    }
    getOnboardingStatus = async (userId) => {
        const user = await this.userRepository.findById(userId);
        if (!user) {
            throw new NotFoundError("User not Found");
        }
        return user;
    };
    updateBodyDetails = async (userId, data) => {
        const user = await this.userRepository.findById(userId);
        if (!user) {
            throw new NotFoundError("User not found");
        }
        user.bodyDetails = UserOnboardingMapper.toBodyDetails(data);
        user.onboardingStep = 2;
        return this.userRepository.save(user);
    };
    updateCycleSetUp = async (userId, data) => {
        const user = await this.userRepository.findById(userId);
        if (!user) {
            throw new NotFoundError("User Not Found");
        }
        user.cycleSetUp = UserOnboardingMapper.toCycleSetUp(data);
        user.onboardingStep = 3;
        return this.userRepository.save(user);
    };
    updateGoals = async (userId, data) => {
        const user = await this.userRepository.findById(userId);
        console.log(user);
        if (!user) {
            throw new NotFoundError("User not found");
        }
        user.goals = UserOnboardingMapper.toGoals(data);
        console.log(user.goals.primaryGoal);
        user.onboardingStep = 4;
        return this.userRepository.save(user);
    };
    completeOnboarding = async (userId) => {
        const user = await this.userRepository.findById(userId);
        console.log(user);
        if (!user) {
            throw new NotFoundError("User Not found");
        }
        user.onboardingComplete = true;
        return this.userRepository.save(user);
    };
};
UserOnboardingService = __decorate([
    injectable(),
    __param(0, inject(TOKENS.IUserRepository)),
    __metadata("design:paramtypes", [Object])
], UserOnboardingService);
export { UserOnboardingService };
//# sourceMappingURL=UserOnboardingService.js.map