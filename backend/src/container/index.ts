
import "reflect-metadata";

import { container } from "tsyringe";
import { TOKENS } from "./tokens.ts";

import { UserRepository } from "../repositories/UserRepository.ts";
import { OtpRepository } from "../repositories/OtpRepository.ts";
import { TokenService } from "../services/TokenService.ts";
import { OtpService } from "../services/OtpService.ts";
import { EmailService } from "../services/EmailService.ts";
import { UserAuthService } from "../services/UserAuthService.ts";
import { AdminService } from "../services/AdminService.ts";
import { RefreshTokenRepository } from "../repositories/RefreshTokenRepository.ts";
import { TrainerAuthService } from "../services/TrainerAuthService.ts";
import { TrainerRepository } from "../repositories/TrainerRepository.ts";
import { UserOnboardingService } from "../services/UserOnboardingService.ts";
import { TrainerOnboardingService } from "../services/TrainerOnbaordingService.ts";
import { ImageService } from "../services/ImageService.ts";
import { AccountStatusService } from "../services/AccountStatusService.ts";
import { UserProfileService } from "../services/UserProfileService.ts";
import { UserAccountStatusService } from "../services/UserAccountService.ts";
import { GeminiProvider } from "../services/providers/GeminiProvider.ts";
import { AIPlanRepository } from "../repositories/AIPlanRepository.ts";
import { AIGeneratedService } from "../services/AIGeneratedService.ts";
import { AIPlanService } from "../services/AIPlanService.ts";
import { MealLogRepository } from "../repositories/MealLogRepository.ts";
import { RecipeRepository } from "../repositories/RecipeRepository.ts";
import { MealLogService } from "../services/MeallogService.ts";
import { RecipeService } from "../services/RecipeService.ts";

import { WorkoutLogRepository } from "../repositories/WorkoutLogRepository.ts";
import { WorkoutProgramRepository } from "../repositories/WorkoutProgramRepository.ts";
import { WorkoutLogService } from "../services/WorkoutLogService.ts";
import { WorkoutProgramService } from "../services/WorkoutProgramService.ts";
import { TrainerPackageRepository } from "../repositories/TrainerPackageRepository.ts";
import { TrainerPackageService } from "../services/TrainerPackageService.ts";
import { PaymentRepository } from "../repositories/PaymentRepository.ts";
import { PaymentService } from "../services/PaymentService.ts";
import { TrainerAssignmentRepository } from "../repositories/TrainerAssignmentRepository.ts";
import { TrainerAssignmentService } from "../services/TrainerAssignmentService.ts";
import { AssignmentExpiryScheduler } from "../jobs/assignmentExpiry.job.ts";
import { TrainerBrowserService } from "../services/TrainerBrowserService.ts";
import { CycleLogRepository } from "../repositories/CycleLogRepository.ts";
import { DailyHealthLogRepository } from "../repositories/DailyHealthLogRepository.ts";
import { HealthMilestoneRepository } from "../repositories/HealthMilestoneRepository.ts";
import { CycleLogService } from "../services/CycleLogService.ts";
import { CyclePredictionService } from "../services/CyclePredictionService.ts";
import { DailyHealthLogService } from "../services/DailyHealthLogService.ts";
import { HealthMilestoneService } from "../services/HealthMilestoneService.ts";
import { SubscriptionPlanRepository } from "../repositories/SubscriptionPlanRepository.ts";
import { StripeBillingGateway } from "../gateways/StripeBillingGateway.ts";
import { SubscriptionPlanService } from "../services/SubscriptionPlanService.ts";
import { ReportService } from "../services/ReportService.ts";
import { ReportController } from "../controllers/ReportController.ts";


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

container.register(TOKENS.IMealLogRepository, { useClass: MealLogRepository });
container.register(TOKENS.IRecipeRepository, { useClass: RecipeRepository });

container.register(TOKENS.ICycleLogRepository, { useClass: CycleLogRepository });
container.register(TOKENS.IDailyHealthLogRepository, { useClass: DailyHealthLogRepository });
container.register(TOKENS.IHealthMilestoneRepository, { useClass: HealthMilestoneRepository });

container.register(TOKENS.ICycleLogService, { useClass: CycleLogService });
container.register(TOKENS.ICyclePredictionService, { useClass: CyclePredictionService });
container.register(TOKENS.IDailyHealthLogService, { useClass: DailyHealthLogService });
container.register(TOKENS.IHealthMilestoneService, { useClass: HealthMilestoneService });
container.register(TOKENS.ISubscriptionPlanRepository,{useClass:SubscriptionPlanRepository});
container.register(TOKENS.IStripeBillingGateway,{useClass:StripeBillingGateway});
container.register(TOKENS.ISubscriptionplanService,{useClass:SubscriptionPlanService});
container.register(TOKENS.IReportService, { useClass: ReportService });
container.register(TOKENS.IReportController, { useClass: ReportController });
export { container };