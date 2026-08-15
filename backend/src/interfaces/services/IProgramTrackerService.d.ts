import type { ProgramTrackerResponseDTO } from "../../dtos/programtracker.dto.js";
export interface IProgramTrackerService {
    getMyProgram(userId: string): Promise<ProgramTrackerResponseDTO>;
}
//# sourceMappingURL=IProgramTrackerService.d.ts.map