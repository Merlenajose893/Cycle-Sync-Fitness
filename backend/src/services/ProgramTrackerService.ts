import { inject, injectable } from "tsyringe";
import type { ProgramTrackerResponseDTO } from "../dtos/programtracker.dto.ts";
import type { IProgramTrackerService } from "../interfaces/services/IProgramTrackerService.ts";
import { TOKENS } from "../container/tokens.ts";
import type { ITrainerAssignmentRepository } from "../interfaces/repositories/ITrainerAssignmentRepository.ts";
import type { ITrainerPackageService } from "../interfaces/services/ITrainerPackageService.ts";
import type { IRecipeService } from "../interfaces/services/IRecipeService.ts";
import type { IWorkoutProgramService } from "../interfaces/services/IWorkoutProgramService.ts";
@injectable()
export class ProgramTrackerService implements IProgramTrackerService{
    constructor(@inject(TOKENS.ITrainerAssignmentRepository) private assignmentService:ITrainerAssignmentRepository ,@inject(TOKENS.ITrainerPackageService) private packageService:ITrainerPackageService,@inject(TOKENS.IRecipeService) private recipeService:IRecipeService,@inject(TOKENS.IWorkoutProgramService) private workoutprogramservice:IWorkoutProgramService)
    {

    }
    getMyProgram = async (userId: string): Promise<ProgramTrackerResponseDTO> => {
        throw new Error("Method not implemented.");
    }
}