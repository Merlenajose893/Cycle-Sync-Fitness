import { z } from "zod";
import { FlowIntensity } from "../constants/health.constant.js";
export declare const createCycleLogSchema: z.ZodObject<{
    startDate: z.ZodUnion<[z.ZodString, z.ZodDate]>;
    flowIntensity: z.ZodEnum<typeof FlowIntensity>;
    notes: z.ZodOptional<z.ZodString>;
}, z.core.$strip>;
export declare const updateCycleLogSchema: z.ZodObject<{
    endDate: z.ZodOptional<z.ZodUnion<[z.ZodString, z.ZodDate]>>;
    flowIntensity: z.ZodOptional<z.ZodEnum<typeof FlowIntensity>>;
    notes: z.ZodOptional<z.ZodString>;
}, z.core.$strip>;
//# sourceMappingURL=cycleLog.validator.d.ts.map