import type { TrainerSlots } from "../constants/TrainerSlots.ts";

export interface CreateSlotDTO{
startAt:string;
endAt:string;
notes?:string;
}

export interface UpdateTrainerSlotDTO{
    startAt?:string;
    endAt?:string;
    notes?:string;

}


export interface ListTrainerSlotDTOQuery{
    from?:string;
    to?:string;
    status?:TrainerSlots
}