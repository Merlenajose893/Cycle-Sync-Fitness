import { inject,injectable } from "tsyringe";
import bcrypt from "bcryptjs";
import type { AdminLoginDto,PaginationDto ,InviteTrainerDTO} from "../dtos/admin.dto.js";
import type { IAdminService } from "../interfaces/services/IAdminService.js";
import type { ITokenService } from "../interfaces/services/ITokenService.js";
import type { IEmailService } from "../interfaces/services/IEmailService.js";
import type { IUserRepository } from "../interfaces/repositories/IUserRepository.js";
import type { ITrainerRepository } from "../interfaces/repositories/ITrainerRepository.js";
import { TOKENS } from "../container/tokens.js";
import { BadRequestError, ConflictError, NotFoundError, UnauthorizedError } from "../errors/index.js";
import type { Response } from "express";
import type { IUser } from "../models/User.js";
import type { ITrainer } from "../models/Trainer.js";
import crypto from "crypto"

@injectable()
export class AdminService implements IAdminService{

    constructor(@inject(TOKENS.IUserRepository)private userRepository:IUserRepository,@inject(TOKENS.ITrainerRepository) private trainerRepository:ITrainerRepository,@inject(TOKENS.ITokenService) private tokenService:ITokenService,@inject(TOKENS.IEmailService) private emailService:IEmailService)

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

    blockUser=async(userId: string): Promise<IUser | null> =>{
    const user=await this.userRepository.blockUser(userId);
    if(!user)
    {
        throw new NotFoundError("User not found")
    }
    return user;
    }

    unblockUser=async(userId: string): Promise<IUser | null>=> {
        const user=await this.userRepository.unblockUser(userId);
        if(!user)
        {
            throw new NotFoundError("User not found")
        }

        return user;
    }


    blockTrainer=async(trainerId: string): Promise<ITrainer | null> =>{
        const trainer=await this.trainerRepository.blockTrainer(trainerId);
        if(!trainer)
        {
            throw new NotFoundError("Trainer not found")
        }

        return trainer;
    }


    unblockTrainer=async(trainerId: string): Promise<ITrainer | null> =>{
        const trainer=await this.trainerRepository.unblockTrainer(trainerId);
        if(!trainer)
        {
            throw new NotFoundError("Trainer not Found")
        }
        return trainer
    }

   inviteTrainer = async (data: InviteTrainerDTO): Promise<void> => {
    const existingTrainer = await this.trainerRepository.findByEmail(data.email);

    if (existingTrainer) {
        throw new BadRequestError("Trainer with this email already exists.");
    }

    const inviteToken = crypto.randomBytes(32).toString("hex");

    const inviteExpiresAt = new Date(
        Date.now() + 24 * 60 * 60 * 1000
    );

    const trainer = await this.trainerRepository.create({
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
        speciality: data.specialization,
        experience: data.experience,
        inviteToken,
        inviteExpiresAt,
        inviteAccepted: false,
        onboardingCompleted: false,
        isEmailVerified: false,
        isDeleted: false
    });

    if (!trainer) {
        throw new Error("Failed to create trainer.");
    }

    const inviteLink = `${process.env.FRONTEND_URL}/trainer/register?token=${inviteToken}`;

    await this.emailService.sendTrainerInvitation(
        trainer.email,
        trainer.firstName,
        inviteLink
    );
};
}