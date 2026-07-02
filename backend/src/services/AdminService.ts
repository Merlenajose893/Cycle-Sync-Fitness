import { inject,injectable } from "tsyringe";
import bcrypt from "bcryptjs";
import type { AdminLoginDto,PaginationDto } from "../dtos/admin.dto.js";
import type { IAdminService } from "../interfaces/services/IAdminService.js";
import type { ITokenService } from "../interfaces/services/ITokenService.js";
import type { IUserRepository } from "../interfaces/repositories/IUserRepository.js";
import type { ITrainerRepository } from "../interfaces/repositories/ITrainerRepository.js";
import { TOKENS } from "../container/tokens.js";
import { UnauthorizedError } from "../errors/index.js";
import type { Response } from "express";
import type { IUser } from "../models/User.js";
import type { ITrainer } from "../models/Trainer.js";

@injectable()
export class AdminService implements IAdminService{

    constructor(@inject(TOKENS.IUserRepository)private userRepository:IUserRepository,@inject(TOKENS.ITrainerRepository) private trainerRepository:ITrainerRepository,@inject(TOKENS.ITokenService) private tokenService:ITokenService)

    // constructor(@inject(TOKENS.UserRepository)private userRepository:IUserRepository,@inject(TOKENS.TrainerRepository) private trainerRepository:ITrainerRepository,@inject(TOKENS.TokenService) private tokenService:ITokenService)

    {

        
    }
    adminLogin=async(data: AdminLoginDto, res: Response): Promise<void> =>{
        const admin=await this.userRepository.findByEmail(data.email);
        if(!admin)
        {
            throw new UnauthorizedError("Invalid credentials")
        }

        if(admin.role!=="admin")
        {
            throw new UnauthorizedError("Access Denied")
        }
        const isPasswordValid=await bcrypt.compare(data.password,admin.password!);
        if(!isPasswordValid)
        {
            throw new UnauthorizedError("Invalid credentials")
        }

        await this.tokenService.generateAndSetAccessToken({userId:admin._id.toString(),role:"admin"},res)
        await this.tokenService.generateAndSetRefreshToken({userId:admin._id.toString(),role:"admin"},res)

    }

    listUsers(pagination: PaginationDto): Promise<IUser[]> {
        return this.userRepository.findAll(pagination.page,pagination.limit)
    }
    listTrainer(pagination: PaginationDto): Promise<ITrainer[]> {
        return this.trainerRepository.findAll(pagination.page,pagination.limit)
    }
}