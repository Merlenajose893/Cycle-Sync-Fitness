import { inject, injectable } from "tsyringe";
import { TOKENS } from "../container/tokens.ts";
import type { IUserRepository } from "../interfaces/repositories/IUserRepository.ts";
import type { ITrainerRepository } from "../interfaces/repositories/ITrainerRepository.ts";
import type { IAccountStatusService } from "../interfaces/services/IAccountStatusService.ts";
import type { UserRole } from "../types/auth.types.ts";
import {
  ForbiddenError,
  NotFoundError,
  UnauthorizedError,
} from "../errors/index.ts";

@injectable()
export class AccountStatusService implements IAccountStatusService {
  constructor(
    @inject(TOKENS.IUserRepository)
    private userRepository: IUserRepository,

    @inject(TOKENS.ITrainerRepository)
    private trainerRepository: ITrainerRepository
  ) {}

  async verifyAccount(userId: string, role: UserRole): Promise<void> {
    if (role === "user") {
      await this.verifyUser(userId);
      return;
    }

    if (role === "trainer") {
      await this.verifyTrainer(userId);
      return;
    }

    throw new UnauthorizedError("Invalid role");
  }

  private async verifyUser(userId: string): Promise<void> {
    const user = await this.userRepository.findById(userId);

    if (!user) {
      throw new NotFoundError("User not found");
    }

    if (user.isDeleted) {
      throw new ForbiddenError("Your account has been blocked.");
    }
  }

  private async verifyTrainer(trainerId: string): Promise<void> {
    const trainer = await this.trainerRepository.findById(trainerId);

    if (!trainer) {
      throw new NotFoundError("Trainer not found");
    }

    if (trainer.isDeleted) {
      throw new ForbiddenError("Your account has been blocked.");
    }
  }
}