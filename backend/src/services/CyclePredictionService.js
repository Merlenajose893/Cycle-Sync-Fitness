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
import { CyclePhase } from "../constants/health.constant.js";
let CyclePredictionService = class CyclePredictionService {
    cycleLogRepository;
    constructor(cycleLogRepository) {
        this.cycleLogRepository = cycleLogRepository;
    }
    async predictCycle(userId) {
        const recentCycles = await this.cycleLogRepository.findRecentCycles(userId, 6);
        let averageCycleLength = 28; // Default standard length
        let lastPeriodStart = new Date();
        if (recentCycles.length > 0) {
            lastPeriodStart = new Date(recentCycles[0].startDate);
            if (recentCycles.length > 1) {
                let totalDays = 0;
                let intervals = 0;
                for (let i = 0; i < recentCycles.length - 1; i++) {
                    const currentStart = new Date(recentCycles[i].startDate).getTime();
                    const prevStart = new Date(recentCycles[i + 1].startDate).getTime();
                    const diffDays = Math.round((currentStart - prevStart) / (1000 * 60 * 60 * 24));
                    if (diffDays > 15 && diffDays < 45) { // Sanity check for valid cycle range
                        totalDays += diffDays;
                        intervals++;
                    }
                }
                if (intervals > 0) {
                    averageCycleLength = Math.round(totalDays / intervals);
                }
            }
        }
        const today = new Date();
        const diffTime = today.getTime() - lastPeriodStart.getTime();
        const currentCycleDay = Math.max(1, Math.floor(diffTime / (1000 * 60 * 60 * 24)) + 1);
        // Phase detection based on cycle day
        let currentPhase = CyclePhase.MENSTRUAL;
        if (currentCycleDay <= 5) {
            currentPhase = CyclePhase.MENSTRUAL;
        }
        else if (currentCycleDay <= 13) {
            currentPhase = CyclePhase.FOLLICULAR;
        }
        else if (currentCycleDay <= 15) {
            currentPhase = CyclePhase.OVULATORY;
        }
        else {
            currentPhase = CyclePhase.LUTEAL;
        }
        // Calculations for next cycle dates
        const nextPeriodStartDate = new Date(lastPeriodStart);
        nextPeriodStartDate.setDate(nextPeriodStartDate.getDate() + averageCycleLength);
        const nextPeriodEndDate = new Date(nextPeriodStartDate);
        nextPeriodEndDate.setDate(nextPeriodEndDate.getDate() + 5);
        // Ovulation is typically 14 days before next period
        const ovulationDate = new Date(nextPeriodStartDate);
        ovulationDate.setDate(ovulationDate.getDate() - 14);
        const fertileWindowStart = new Date(ovulationDate);
        fertileWindowStart.setDate(fertileWindowStart.getDate() - 4);
        const fertileWindowEnd = new Date(ovulationDate);
        fertileWindowEnd.setDate(fertileWindowEnd.getDate() + 2);
        return {
            currentPhase,
            currentCycleDay,
            averageCycleLength,
            nextPeriodStartDate,
            nextPeriodEndDate,
            fertileWindowStart,
            fertileWindowEnd,
            ovulationDate,
        };
    }
};
CyclePredictionService = __decorate([
    injectable(),
    __param(0, inject(TOKENS.ICycleLogRepository)),
    __metadata("design:paramtypes", [Object])
], CyclePredictionService);
export { CyclePredictionService };
//# sourceMappingURL=CyclePredictionService.js.map