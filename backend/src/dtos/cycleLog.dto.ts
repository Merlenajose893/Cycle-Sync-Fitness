import type { FlowIntensity } from "../constants/health.constant.js";

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