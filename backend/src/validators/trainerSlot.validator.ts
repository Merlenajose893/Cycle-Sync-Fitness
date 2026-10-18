import { z } from "zod";
import { TrainerSlotStatus } from "../constants/trainerSlot.js";

const isoDateSchema = z.string().datetime({ offset: true });

export const createTrainerSlotSchema = z
  .object({
    startAt: isoDateSchema,
    endAt: isoDateSchema,
    notes: z.string().trim().optional(),
  })
  .refine(
    (data) => new Date(data.endAt) > new Date(data.startAt),
    {
      message: "endAt must be after startAt",
      path: ["endAt"],
    }
  );

export const updateTrainerSlotSchema = z
  .object({
    startAt: isoDateSchema.optional(),
    endAt: isoDateSchema.optional(),
    notes: z.string().trim().optional(),
  })
  .refine((data) => Object.keys(data).length > 0, {
    message: "At least one field must be provided",
  })
  .refine(
    (data) =>
      !data.startAt ||
      !data.endAt ||
      new Date(data.endAt) > new Date(data.startAt),
    {
      message: "endAt must be after startAt",
      path: ["endAt"],
    }
  );

export const listTrainerSlotsQuerySchema = z
  .object({
    from: isoDateSchema.optional(),
    to: isoDateSchema.optional(),
    status: z.nativeEnum(TrainerSlotStatus).optional(),
  })
  .refine(
    (data) =>
      !data.from ||
      !data.to ||
      new Date(data.to) >= new Date(data.from),
    {
      message: "to must be greater than or equal to from",
      path: ["to"],
    }
  );