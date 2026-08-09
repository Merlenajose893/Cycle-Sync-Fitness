import type { AddWaterDTO, CreateHealthLogDTO, UpdateDailyHealthLogDTO } from "../dtos/healthLog.dto.js";
import { NotFoundError } from "../errors/index.js";
import type { IDailyHealthLogRepository } from "../interfaces/repositories/IDailyHealthLogRepository.js";
import type { IDailyHealthLogService } from "../interfaces/services/IDailyHealthLogService.js";
import type { IDailyHealthLog } from "../models/DailyHealthLog.js";

export class DailyHealthLogService implements IDailyHealthLogService{
    constructor(private dailyHealthRepository:IDailyHealthLogRepository)
    {

    }

    private getMidNightDate(dateInput?:Date|string):Date{
        const d=dateInput?new Date(dateInput):new Date();
        d.setHours(0,0,0,0);
        return d;
    }
    logHealth=async(userId: string, data: CreateHealthLogDTO): Promise<IDailyHealthLog> {
        const targetDate=this.getMidNightDate(data.date);
        return await this.dailyHealthRepository.upsertByDate(userId,targetDate,{...data,userId:userId,date:targetDate})
    }
    updateLog=async(userId: string, logId: string, data: UpdateDailyHealthLogDTO): Promise<IDailyHealthLog> {
        const log=await this.dailyHealthRepository.findById(logId);
        if(!log||log.userId.toString()!==userId)
        {
            throw new NotFoundError("Health Log Not Found")
        }
        Object.assign(log,data);
        return await this.dailyHealthRepository.save(log);
    }
    getTodayLog=async(userId: string): Promise<IDailyHealthLog | null> {
        const today=this.getMidNightDate();
        return await this.dailyHealthRepository.findByDate(userId,today);
    }
    getHistory=async(userId: string, page: number, limit: number): Promise<{ logs: IDailyHealthLog[]; total: number; }> {
        const allLogs=await this.dailyHealthRepository.findHistory(userId);
        const total=allLogs.length;
        const startIndex=(page-1)*limit;
        const logs=allLogs.slice(startIndex,startIndex+limit);
        return {logs,total}
    }
    addWaterIntake=async(userId: string, data: AddWaterDTO): Promise<IDailyHealthLog> {
        const today=this.getMidNightDate()
        let log=await this.dailyHealthRepository.findByDate(userId,today);
        if(!log)
        {
            log=await this.dailyHealthRepository.upsertByDate(userId,today,{userId,date:today,waterIntakeMl:data.amountMl,waterTargetMl:2500});

        }
        else{
            log.waterIntakeMl=(log.waterIntakeMl||0)+data.amountMl;
            log=await this.dailyHealthRepository.save(log);
        }
    }
}