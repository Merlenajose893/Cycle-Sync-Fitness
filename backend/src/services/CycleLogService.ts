import { inject, injectable } from "tsyringe";
import { TOKENS } from "../container/tokens.ts";
import type { ICycleLogRepository } from "../interfaces/repositories/ICycleLogRepository.ts";
import type { ICycleLogService } from "../interfaces/services/ICycleLogService.ts";
import type { CreateCycleLogDTO, UpdateCycleLogDTO } from "../dtos/cycleLog.dto.ts";
import type { ICycleLog } from "../models/CycleLog.ts";

@injectable()
export class CycleLogService implements ICycleLogService {
  constructor(
    @inject(TOKENS.ICycleLogRepository)
    private cycleLogRepository: ICycleLogRepository
  ) {}

  async startPeriodDate(userId: string, dto: CreateCycleLogDTO): Promise<ICycleLog> {
    const latest = await this.cycleLogRepository.findByLatest(userId);
    if (latest && !latest.endDate) {
      throw new Error("An active period is already logged. Please end it before starting a new one.");
    }

    return await this.cycleLogRepository.create({
      userId: userId as any,
      startDate: new Date(dto.startDate),
      flowIntensity: dto.flowIntensity,
      notes: dto.notes,
    } as Partial<ICycleLog>);
  }

  async endPeriod(userId: string, logId: string, dto: UpdateCycleLogDTO): Promise<ICycleLog> {
    const log = await this.cycleLogRepository.findById(logId);
    if (!log || log.userId.toString() !== userId) {
      throw new Error("Cycle log not found");
    }

    if (dto.endDate && new Date(dto.endDate) < new Date(log.startDate)) {
      throw new Error("End date cannot be before start date");
    }

    if (dto.endDate) log.endDate = new Date(dto.endDate);
    if (dto.flowIntensity) log.flowIntensity = dto.flowIntensity;
    if (dto.notes !== undefined) log.notes = dto.notes;

    return await this.cycleLogRepository.save(log);
  }

  async getCycleLogs(userId: string): Promise<ICycleLog[]> {
    return await this.cycleLogRepository.findByUser(userId);
  }

  async getLatestCycle(userId: string): Promise<ICycleLog | null> {
    return await this.cycleLogRepository.findByLatest(userId);
  }

  async deleteCycleLog(userId: string, logId: string): Promise<void> {
    const log = await this.cycleLogRepository.findById(logId);
    if (!log || log.userId.toString() !== userId) {
      throw new Error("Cycle log not found");
    }

    await this.cycleLogRepository.deleteById(logId);
  }
}