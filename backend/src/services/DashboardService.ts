import { injectable,inject } from "tsyringe";
import { TOKENS } from "../container/tokens.js";
import type { IUserRepository } from "../interfaces/repositories/IUserRepository.js";
import type  { IDashboardService } from "../interfaces/services/IDashboardService.js";
import { NotFoundError } from "../errors/index.js";
import type { DashboardResponseDTO } from "../dtos/dashboard.dto.js";
@injectable()
export class DashboardService implements IDashboardService{
    constructor(@inject(TOKENS.IUserRepository) private userRepository:IUserRepository)
    {}
    getDashboard=async(userId: string): Promise<DashboardResponseDTO> =>{
        const user=await this.userRepository.findById(userId);
        if(!user)
        {
            throw new NotFoundError("User not Found");
        }

        return {
            firstName:user.firstName
        };
    }
}