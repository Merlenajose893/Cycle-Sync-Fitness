import { inject, injectable } from "tsyringe";
import { TOKENS } from "../container/tokens.js";
import { IUserRepository } from "../interfaces/repositories/IUserRepository.js";
import { ITrainerRepository } from "../interfaces/repositories/ITrainerRepository.js";
import type { IAccountStatusService } from "../interfaces/services/IAccountStatusService.js";
import type { UserRole } from "../types/auth.types.js";
import { ForbiddenError, NotFoundError } from "../errors/index.js";


export class AccountStatusService implements IAccountStatusService{
    constructor(@inject(TOKENS.IUserRepository) private userRepository:IUserRepository,@inject(TOKENS.ITrainerRepository) private trainerRepository:ITrainerRepository)
    {

    }

    verifyAccount(userId: string, role: UserRole): Promise<void> {
        
    }

    private verifyUser=async(userId:string):Promise<void>=>
    {
    const user=await this.userRepository.findById(userId);
    if(!user)
    {
        throw new NotFoundError("User not found");
    }
    if(user.isDeleted)
    {
        throw new ForbiddenError("User is Blocked")
    }
    return;
    }
    private verifyTrainer=async(trainerId:string):Promise<void>=>
    {
        const trainer=await this.trainerRepository.findById(trainerId);
        if(!trainer)
        {
            throw new NotFoundError("Trainer Not Found");
        }
        if(trainer.isDeleted)
        {
            throw new ForbiddenError("Trainer is Blocked")
        }
        return;
    }
}