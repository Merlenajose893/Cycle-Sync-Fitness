import type { ProgramTrackerResponseDTO } from "../dtos/programtracker.dto.js";
import type { IProgramTrackerService } from "../interfaces/services/IProgramTrackerService.js";
import type { ITrainerAssignmentRepository } from "../interfaces/repositories/ITrainerAssignmentRepository.js";
import type { ITrainerPackageService } from "../interfaces/services/ITrainerPackageService.js";
import type { IRecipeService } from "../interfaces/services/IRecipeService.js";
import type { IWorkoutProgramService } from "../interfaces/services/IWorkoutProgramService.js";
export declare class ProgramTrackerService implements IProgramTrackerService {
    private assignmentService;
    private packageService;
    private recipeService;
    private workoutprogramservice;
    constructor(assignmentService: ITrainerAssignmentRepository, packageService: ITrainerPackageService, recipeService: IRecipeService, workoutprogramservice: IWorkoutProgramService);
    getMyProgram: (userId: string) => Promise<ProgramTrackerResponseDTO>;
}
//# sourceMappingURL=ProgramTrackerService.d.ts.map