import type { Types } from "mongoose";
import type { ITrainerSlot } from "../../models/TrainerSlot.js";
import type { TrainerSlotStatus } from "../../constants/trainerSlot.js";

export interface TrainerSlotFilters {
  from?: Date;
  to?: Date;
  status?: TrainerSlotStatus;
}

export type CreateTrainerSlotData = Pick<
  ITrainerSlot,
  "trainerId" | "startAt" | "endAt"
> &
  Partial<Pick<ITrainerSlot, "status" | "notes" | "bookingId">>;

export type UpdateTrainerSlotData = Partial<
  Pick<ITrainerSlot, "startAt" | "endAt" | "notes" | "status" | "bookingId">
>;

export interface ITrainerSlotRepository {
  create(data: CreateTrainerSlotData): Promise<ITrainerSlot>;

  findById(id: string): Promise<ITrainerSlot | null>;

  findByTrainer(
    trainerId: string,
    filters?: TrainerSlotFilters
  ): Promise<ITrainerSlot[]>;

  findOverlapping(
    trainerId: string,
    startAt: Date,
    endAt: Date,
    excludedSlotId?: string
  ): Promise<ITrainerSlot | null>;

  update(
    id: string,
    data: UpdateTrainerSlotData
  ): Promise<ITrainerSlot | null>;

  delete(id: string): Promise<void>;
}