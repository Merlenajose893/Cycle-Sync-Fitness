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
let DailyHealthLogService = class DailyHealthLogService {
    dailyHealthLogRepository;
    constructor(dailyHealthLogRepository) {
        this.dailyHealthLogRepository = dailyHealthLogRepository;
    }
    getMidnightDate(dateInput) {
        const d = dateInput ? new Date(dateInput) : new Date();
        d.setHours(0, 0, 0, 0);
        return d;
    }
    async logHealth(userId, data) {
        const targetDate = this.getMidnightDate(data.date);
        return await this.dailyHealthLogRepository.upsertByDate(userId, targetDate, {
            ...data,
            userId: userId,
            date: targetDate,
        });
    }
    async updateLog(userId, logId, data) {
        const log = await this.dailyHealthLogRepository.findById(logId);
        if (!log || log.userId.toString() !== userId) {
            throw new Error("Health log not found");
        }
        Object.assign(log, data);
        return await this.dailyHealthLogRepository.save(log);
    }
    async getTodayLog(userId) {
        const today = this.getMidnightDate();
        return await this.dailyHealthLogRepository.findByDate(userId, today);
    }
    async getHistory(userId, page = 1, limit = 10) {
        const allLogs = await this.dailyHealthLogRepository.findHistory(userId);
        const total = allLogs.length;
        const startIndex = (page - 1) * limit;
        const logs = allLogs.slice(startIndex, startIndex + limit);
        return { logs, total };
    }
    async addWaterIntake(userId, data) {
        const today = this.getMidnightDate();
        let log = await this.dailyHealthLogRepository.findByDate(userId, today);
        if (!log) {
            log = await this.dailyHealthLogRepository.upsertByDate(userId, today, {
                userId: userId,
                date: today,
                waterIntakeMl: data.amountMl,
                waterTargetMl: 2500, // Default daily goal: 2.5L
            });
        }
        else {
            log.waterIntakeMl = (log.waterIntakeMl || 0) + data.amountMl;
            log = await this.dailyHealthLogRepository.save(log);
        }
        return log;
    }
};
DailyHealthLogService = __decorate([
    injectable(),
    __param(0, inject(TOKENS.IDailyHealthLogRepository)),
    __metadata("design:paramtypes", [Object])
], DailyHealthLogService);
export { DailyHealthLogService };
//# sourceMappingURL=DailyHealthLogService.js.map