import "reflect-metadata";

import { container } from "tsyringe";
import { TOKENS } from "./tokens.js";

import { UserRepository } from "../repositories/UserRepository.js";
import { OtpRepository } from "../repositories/OtpRepository.js";
import { TokenService } from "../services/TokenService.js";
import { OtpService } from "../services/OtpService.js";
import { EmailService } from "../services/EmailService.js";
import { UserAuthService } from "../services/UserAuthService.js";
import { AdminService } from "../services/AdminService.js";
import { RefreshTokenRepository } from "../repositories/RefreshTokenRepository.js";
import { TrainerAuthService } from "../services/TrainerAuthService.js";
import { TrainerRepository } from "../repositories/TrainerRepository.js";
import { UserOnboardingService } from "../services/UserOnboardingService.js";
import { TrainerOnboardingService } from "../services/TrainerOnbaordingService.js";
import { ImageService } from "../services/ImageService.js";
import { AccountStatusService } from "../services/AccountStatusService.js";
import { UserProfileService } from "../services/UserProfileService.js";
import { UserAccountStatusService } from "../services/UserAccountService.js";
import { GeminiProvider } from "../services/providers/GeminiProvider.js";
import { AIPlanRepository } from "../repositories/AIPlanRepository.js";
import { AIGeneratedService } from "../services/AIGeneratedService.js";
import { AIPlanService } from "../services/AIPlanService.js";
import { MealLogRepository } from "../repositories/MealLogRepository.js";
import { RecipeRepository } from "../repositories/RecipeRepository.js";
import { MealLogService } from "../services/MeallogService.js";
import { RecipeService } from "../services/RecipeService.js";

import { WorkoutLogRepository } from "../repositories/WorkoutLogRepository.js";
import { WorkoutProgramRepository } from "../repositories/WorkoutProgramRepository.js";
import { WorkoutLogService } from "../services/WorkoutLogService.js";
import { WorkoutProgramService } from "../services/WorkoutProgramService.js";
import { TrainerPackageRepository } from "../repositories/TrainerPackageRepository.js";
import { TrainerPackageService } from "../services/TrainerPackageService.js";
import { PaymentRepository } from "../repositories/PaymentRepository.js";
import { PaymentService } from "../services/PaymentService.js";
import { TrainerAssignmentRepository } from "../repositories/TrainerAssignmentRepository.js";
import { TrainerAssignmentService } from "../services/TrainerAssignmentService.js";
import { AssignmentExpiryScheduler } from "../jobs/assignmentExpiry.job.js";
import { TrainerBrowserService } from "../services/TrainerBrowserService.js";

container.register(TOKENS.IUserRepository, { useClass: UserRepository });
container.register(TOKENS.IUserProfileService, { useClass: UserProfileService });
container.register(TOKENS.IOtpRepository, { useClass: OtpRepository });
container.register(TOKENS.ITokenService, { useClass: TokenService });
container.register(TOKENS.IEmailService, { useClass: EmailService });
container.register(TOKENS.IUserAuthService, { useClass: UserAuthService });
container.register(TOKENS.IRefreshTokenRepository, { useClass: RefreshTokenRepository });
container.register(TOKENS.IOtpService, { useClass: OtpService });
container.register(TOKENS.ITrainerAuthService, { useClass: TrainerAuthService });
container.register(TOKENS.ITrainerRepository, { useClass: TrainerRepository });
container.register(TOKENS.IUserOnboardingService, { useClass: UserOnboardingService });
container.register(TOKENS.ITrainerOnboardingService, { useClass: TrainerOnboardingService });
container.register(TOKENS.IAdminService, { useClass: AdminService });
container.register(TOKENS.IImageService, { useClass: ImageService });
container.register(TOKENS.IAccountStatusService, { useClass: AccountStatusService });
container.register(TOKENS.IUserStatusService, { useClass: UserAccountStatusService });
container.register(TOKENS.IAIProvider, { useClass: GeminiProvider });
container.register(TOKENS.IAIPlanRepository, { useClass: AIPlanRepository });
container.register(TOKENS.IAIGeneratorService, { useClass: AIGeneratedService });
container.register(TOKENS.IAIPlanService, { useClass: AIPlanService });
container.register(TOKENS.IMealLogRepository, { useClass: MealLogRepository });
container.register(TOKENS.IRecipeRepository, { useClass: RecipeRepository });
container.register(TOKENS.IMealLogService, { useClass: MealLogService });
container.register(TOKENS.IRecipeService, { useClass: RecipeService });

container.register(TOKENS.IWorkoutLogRepository, { useClass: WorkoutLogRepository });
container.register(TOKENS.IWorkoutProgramRepository, { useClass: WorkoutProgramRepository });
container.register(TOKENS.IWorkoutLogService, { useClass: WorkoutLogService });
container.register(TOKENS.IWorkoutProgramService, { useClass: WorkoutProgramService });

container.register(TOKENS.ITrainerPackageRepository,{useClass:TrainerPackageRepository})
container.register(TOKENS.ITrainerPackageService,{useClass:TrainerPackageService})
container.register(TOKENS.IPaymentRepository,{useClass:PaymentRepository});
container.register(TOKENS.IPaymentService,{useClass:PaymentService});
container.register(TOKENS.ITrainerAssignmentRepository,{useClass:TrainerAssignmentRepository});
container.register(TOKENS.ITrainerAssignmentService,{useClass:TrainerAssignmentService});
container.register(TOKENS.IAssignmentExpiryScheduler,{useClass:AssignmentExpiryScheduler});
container.register(TOKENS.ITrainerBrowserService,{useClass:TrainerBrowserService})

export { container };