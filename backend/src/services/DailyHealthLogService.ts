import { inject, injectable } from "tsyringe";
import { TOKENS } from "../container/tokens.ts";
import type { IDailyHealthLogRepository } from "../interfaces/repositories/IDailyHealthLogRepository.ts";
import type { IDailyHealthLogService } from "../interfaces/services/IDailyHealthLogService.ts";
import type { AddWaterDTO, CreateHealthLogDTO, UpdateDailyHealthLogDTO } from "../dtos/healthLog.dto.ts";
import type { IDailyHealthLog } from "../models/DailyHealthLog.ts";

@injectable()
export class DailyHealthLogService implements IDailyHealthLogService {
  constructor(
    @inject(TOKENS.IDailyHealthLogRepository)
    private dailyHealthLogRepository: IDailyHealthLogRepository
  ) {}

  private getMidnightDate(dateInput?: Date | string): Date {
    const d = dateInput ? new Date(dateInput) : new Date();
    d.setHours(0, 0, 0, 0);
    return d;
  }

  async logHealth(userId: string, data: CreateHealthLogDTO): Promise<IDailyHealthLog> {
    const targetDate = this.getMidnightDate(data.date);
    return await this.dailyHealthLogRepository.upsertByDate(userId, targetDate, {
      ...data,
      userId: userId as any,
      date: targetDate,
    });
  }

  async updateLog(userId: string, logId: string, data: UpdateDailyHealthLogDTO): Promise<IDailyHealthLog> {
    const log = await this.dailyHealthLogRepository.findById(logId);
    if (!log || log.userId.toString() !== userId) {
      throw new Error("Health log not found");
    }

    Object.assign(log, data);
    return await this.dailyHealthLogRepository.save(log);
  }

  async getTodayLog(userId: string): Promise<IDailyHealthLog | null> {
    const today = this.getMidnightDate();
    return await this.dailyHealthLogRepository.findByDate(userId, today);
  }

  async getHistory(userId: string, page: number = 1, limit: number = 10): Promise<{ logs: IDailyHealthLog[]; total: number }> {
    const allLogs = await this.dailyHealthLogRepository.findHistory(userId);
    const total = allLogs.length;
    const startIndex = (page - 1) * limit;
    const logs = allLogs.slice(startIndex, startIndex + limit);

    return { logs, total };
  }

  async addWaterIntake(userId: string, data: AddWaterDTO): Promise<IDailyHealthLog> {
    const today = this.getMidnightDate();
    let log = await this.dailyHealthLogRepository.findByDate(userId, today);

    if (!log) {
      log = await this.dailyHealthLogRepository.upsertByDate(userId, today, {
        userId: userId as any,
        date: today,
        waterIntakeMl: data.amountMl,
        waterTargetMl: 2500, // Default daily goal: 2.5L
      });
    } else {
      log.waterIntakeMl = (log.waterIntakeMl || 0) + data.amountMl;
      log = await this.dailyHealthLogRepository.save(log);
    }

    return log;
  }
}