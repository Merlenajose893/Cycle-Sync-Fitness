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
import { HealthMilestoneType } from "../constants/health.constant.js";
let HealthMilestoneService = class HealthMilestoneService {
    milestoneRepository;
    cycleLogRepository;
    dailyHealthLogRepository;
    constructor(milestoneRepository, cycleLogRepository, dailyHealthLogRepository) {
        this.milestoneRepository = milestoneRepository;
        this.cycleLogRepository = cycleLogRepository;
        this.dailyHealthLogRepository = dailyHealthLogRepository;
    }
    async getUserMilestones(userId) {
        return await this.milestoneRepository.findByUser(userId);
    }
    async checkAndAwardMilestones(userId) {
        const newlyAwarded = [];
        const awardIfEligible = async (type, eligible, title, description, badgeIcon) => {
            if (!eligible)
                return;
            const alreadyHas = await this.milestoneRepository.hasMileStone(userId, type);
            if (!alreadyHas) {
                const milestone = await this.milestoneRepository.create({
                    userId: userId,
                    milestoneType: type,
                    title,
                    description,
                    badgeIcon,
                    achievedAt: new Date(),
                });
                newlyAwarded.push(milestone);
            }
        };
        // 1. Cycle log milestones
        const cycleCount = await this.cycleLogRepository.countByUser(userId);
        await awardIfEligible(HealthMilestoneType.CYCLE_LOGGED_FIRST_TIME, cycleCount >= 1, "First Cycle Logged", "Logged your cycle for the first time!", "droplet");
        await awardIfEligible(HealthMilestoneType.CYCLE_LOGGED_3_MONTHS, cycleCount >= 3, "Cycle Tracking Veteran", "Successfully logged cycles over 3 months!", "calendar_check");
        // 2. Health logging consistency
        const healthLogCount = await this.dailyHealthLogRepository.countByUser(userId);
        await awardIfEligible(HealthMilestoneType.CONSISTENT_LOGGER_7_DAYS, healthLogCount >= 7, "Habit Builder", "Logged your health daily for 7 days!", "flame");
        // 3. Water goal milestone
        const history = await this.dailyHealthLogRepository.findHistory(userId);
        const hydratedDays = history.filter(h => (h.waterIntakeMl || 0) >= (h.waterTargetMl || 2000)).length;
        await awardIfEligible(HealthMilestoneType.WATER_LOGGED_7_DAYS, hydratedDays >= 7, "Hydration Hero", "Hit your daily water target on 7 different days!", "glass_water");
        return newlyAwarded;
    }
};
HealthMilestoneService = __decorate([
    injectable(),
    __param(0, inject(TOKENS.IHealthMilestoneRepository)),
    __param(1, inject(TOKENS.ICycleLogRepository)),
    __param(2, inject(TOKENS.IDailyHealthLogRepository)),
    __metadata("design:paramtypes", [Object, Object, Object])
], HealthMilestoneService);
export { HealthMilestoneService };
//# sourceMappingURL=HealthMilestoneService.js.map