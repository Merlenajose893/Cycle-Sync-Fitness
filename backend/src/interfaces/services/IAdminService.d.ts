import type { AdminLoginDto, PaginationDto, InviteTrainerDTO } from "../../dtos/admin.dto.js";
import type { Response } from "express";
import type { IUser } from "../../models/User.js";
import type { ITrainer } from "../../models/Trainer.js";
export interface IAdminService {
    adminLogin(data: AdminLoginDto, res: Response): Promise<void>;
    listUsers(pagination: PaginationDto): Promise<IUser[]>;
    listTrainer(pagination: PaginationDto): Promise<ITrainer[]>;
    blockUser(userId: string): Promise<IUser | null>;
    unblockUser(userId: string): Promise<IUser | null>;
    blockTrainer(trainerId: string): Promise<ITrainer | null>;
    unblockTrainer(trainerId: string): Promise<ITrainer | null>;
    inviteTrainer(data: InviteTrainerDTO): Promise<void>;
    getPendingTrainers(): Promise<ITrainer[]>;
    approveTrainer(trainerId: string): Promise<ITrainer>;
    rejectTrainer(trainerId: string, reason: string): Promise<void>;
}
//# sourceMappingURL=IAdminService.d.ts.map