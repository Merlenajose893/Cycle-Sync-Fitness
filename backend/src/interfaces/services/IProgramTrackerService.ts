import type { ProgramTrackerResponseDTO } from "../../dtos/programtracker.dto.ts";

export interface IProgramTrackerService{
    getMyProgram(userId:string):Promise<ProgramTrackerResponseDTO>;
}