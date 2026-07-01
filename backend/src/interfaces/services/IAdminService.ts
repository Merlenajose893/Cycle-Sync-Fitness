import type { AdminLoginDto,PaginationDto } from "../../dtos/admin.dto.js";
import type { Response } from "express";
import type { IUser } from "../../models/User.js";
import type { ITrainer } from "../../models/Trainer.js";
export interface IAdminService{
    adminLogin(data:AdminLoginDto,res:Response):Promise<void>;
    listUsers(pagination:PaginationDto):Promise<IUser[]>;
    listTrainer(pagination:PaginationDto):Promise<ITrainer[]>;
}