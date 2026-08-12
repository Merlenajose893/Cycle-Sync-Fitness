import { inject, injectable } from "tsyringe";
import type { ProgramTrackerResponseDTO } from "../dtos/programtracker.dto.js";
import type { IProgramTrackerService } from "../interfaces/services/IProgramTrackerService.js";
import { TOKENS } from "../container/tokens.js";
import type { ITrainerAssignmentRepository } from "../interfaces/repositories/ITrainerAssignmentRepository.js";
import type { ITrainerPackageService } from "../interfaces/services/ITrainerPackageService.js";
import type { IRecipeService } from "../interfaces/services/IRecipeService.js";
import type { IWorkoutProgramService } from "../interfaces/services/IWorkoutProgramService.js";
@injectable()
export class ProgramTrackerService implements IProgramTrackerService{
    constructor(@inject(TOKENS.ITrainerAssignmentRepository) private assignmentService:ITrainerAssignmentRepository ,@inject(TOKENS.ITrainerPackageService) private packageService:ITrainerPackageService,@inject(TOKENS.IRecipeService) private recipeService:IRecipeService,@inject(TOKENS.IWorkoutProgramService) private workoutprogramservice:IWorkoutProgramService)
    {

    }
    getMyProgram = async (userId: string): Promise<ProgramTrackerResponseDTO> => {
        throw new Error("Method not implemented.");
    }
}