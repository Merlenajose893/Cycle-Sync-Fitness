import { z } from "zod";
import { FlowIntensity } from "../constants/health.constant.ts";

export const createCycleLogSchema = z.object({
  startDate: z.string().or(z.date()),
  flowIntensity: z.nativeEnum(FlowIntensity),
  notes: z.string().max(500).optional(),
});

export const updateCycleLogSchema = z.object({
  endDate: z.string().or(z.date()).optional(),
  flowIntensity: z.nativeEnum(FlowIntensity).optional(),
  notes: z.string().max(500).optional(),
});
