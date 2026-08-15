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
let CycleLogService = class CycleLogService {
    cycleLogRepository;
    constructor(cycleLogRepository) {
        this.cycleLogRepository = cycleLogRepository;
    }
    async startPeriod(userId, dto) {
        const latest = await this.cycleLogRepository.findByLatest(userId);
        if (latest && !latest.endDate) {
            throw new Error("An active period is already logged. Please end it before starting a new one.");
        }
        return await this.cycleLogRepository.create({
            userId: userId,
            startDate: new Date(dto.startDate),
            flowIntensity: dto.flowIntensity,
            notes: dto.notes,
        });
    }
    async endPeriod(userId, logId, dto) {
        const log = await this.cycleLogRepository.findById(logId);
        if (!log || log.userId.toString() !== userId) {
            throw new Error("Cycle log not found");
        }
        if (dto.endDate && new Date(dto.endDate) < new Date(log.startDate)) {
            throw new Error("End date cannot be before start date");
        }
        if (dto.endDate)
            log.endDate = new Date(dto.endDate);
        if (dto.flowIntensity)
            log.flowIntensity = dto.flowIntensity;
        if (dto.notes !== undefined)
            log.notes = dto.notes;
        return await this.cycleLogRepository.save(log);
    }
    async getCycleLogs(userId) {
        return await this.cycleLogRepository.findByUser(userId);
    }
    async getLatestCycle(userId) {
        return await this.cycleLogRepository.findByLatest(userId);
    }
    async deleteCycleLog(userId, logId) {
        const log = await this.cycleLogRepository.findById(logId);
        if (!log || log.userId.toString() !== userId) {
            throw new Error("Cycle log not found");
        }
        await this.cycleLogRepository.deleteById(logId);
    }
};
CycleLogService = __decorate([
    injectable(),
    __param(0, inject(TOKENS.ICycleLogRepository)),
    __metadata("design:paramtypes", [Object])
], CycleLogService);
export { CycleLogService };
//# sourceMappingURL=CycleLogService.js.map