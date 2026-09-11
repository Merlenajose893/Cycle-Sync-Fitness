export type SlotStatus = 'available' | 'booked' | 'blocked';
export type SlotMode = 'online' | 'offline';

export interface TrainerSlot {
  id: string;
  date: string;
  startTime: string;
  endTime: string;
  status: SlotStatus;
  mode: SlotMode;
  clientName?: string;
  notes?: string;
}

export interface SlotFormValues {
  date: string;
  startTime: string;
  endTime: string;
  mode: SlotMode;
  status: SlotStatus;
  clientName?: string;
  notes?: string;
}
