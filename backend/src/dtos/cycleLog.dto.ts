import type { FlowIntensity } from "../constants/health.constant.ts";

export interface CreateCycleLogDTO{
    startDate:Date;
    flowIntensity:FlowIntensity;
    notes?:string;

}
export interface UpdateCycleLogDTO{
    endDate?:Date;
    flowIntensity?:FlowIntensity;
    notes?:string;
}