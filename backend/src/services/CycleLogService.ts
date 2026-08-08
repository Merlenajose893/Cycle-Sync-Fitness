import { injectable } from "tsyringe";
import type { ICycleLogService } from "../interfaces/services/ICycleLogService.js";
import type { ICycleLogRepository } from "../interfaces/repositories/ICycleLogRepository.js";
import type { CreateCycleLogDTO, UpdateCycleLogDTO } from "../dtos/cycleLog.dto.js";
import type { ICycleLog } from "../models/CycleLog.js";
import { BadRequestError, NotFoundError } from "../errors/index.js";
@injectable()
export class CycleLogService implements ICycleLogService{
    constructor(private cycleLogRepository:ICycleLogRepository)
    {

    }
    startPeriodDate=async(userId: string, data: CreateCycleLogDTO): Promise<ICycleLog> {
        const latest=await this.cycleLogRepository.findByLatest(userId);
        if(latest && !latest.endDate)
        {
            throw new NotFoundError("An active period is already logged.Please end it before starting a new one")
        }
        return await this.cycleLogRepository.create({
            userId,
            startDate:new Date(data.startDate),
            flowIntensity:data.flowIntensity,
            notes:data.notes
        }as unknown as  Partial<ICycleLog>);
    }
    endPeriod=async(userId: string, logId: string, data: UpdateCycleLogDTO): Promise<ICycleLog> {
        const log=await this.cycleLogRepository.findById(logId);
        if(!log || log.userId.toString()!==userId)
        {
            throw new NotFoundError("Cycle Log Not found")
        }
        if(data.endDate && new Date(data.endDate)<new Date(log.startDate))
        {
            throw new BadRequestError("End date cannot be before start date")
        }
        if(data.endDate) log.endDate=new Date(data.endDate);
        if(data.flowIntensity) log.flowIntensity=data.flowIntensity;
        if(data.notes!==undefined) log.notes=data.notes;
    }
    getCycleLogs=async(userId: string): Promise<ICycleLog[]> {
        return await this.cycleLogRepository.findByUser(userId);
    }
    getLatestCycle=async(userId: string): Promise<ICycleLog | null> {
        return await this.cycleLogRepository.findByLatest(userId);
    }
    deleteCycleLog=async(userId: string, logId: string): Promise<void> {
        const log=await this.cycleLogRepository.findById(logId);
        if(!log ||log.userId.toString()!==userId)
        {
            throw new NotFoundError("Cycle log not found")
        }
        await this.cycleLogRepository.deleteById(logId)
    }
}