import type { AdminLoginDto, PaginationDto } from "../dtos/admin.dto.js";
import type { IAdminService } from "../interfaces/services/IAdminService.js";
import type { ITokenService } from "../interfaces/services/ITokenService.js";
import type { IUserRepository } from "../interfaces/repositories/IUserRepository.js";
import type { ITrainerRepository } from "../interfaces/repositories/ITrainerRepository.js";
import type { Response } from "express";
import type { IUser } from "../models/User.js";
import type { ITrainer } from "../models/Trainer.js";
export declare class AdminService implements IAdminService {
    private userRepository;
    private trainerRepository;
    private tokenService;
    constructor(userRepository: IUserRepository, trainerRepository: ITrainerRepository, tokenService: ITokenService);
    adminLogin: (data: AdminLoginDto, res: Response) => Promise<void>;
    listUsers(pagination: PaginationDto): Promise<IUser[]>;
    listTrainer(pagination: PaginationDto): Promise<ITrainer[]>;
}
//# sourceMappingURL=AdminService.d.ts.map