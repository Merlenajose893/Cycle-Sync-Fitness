import "reflect-metadata";

import { container }
  from "tsyringe";

import { TOKENS }
  from "./tokens.js";

import { UserRepository }
  from "../repositories/UserRepository.js";

import { OtpRepository }
  from "../repositories/OtpRepository.js";

import { TokenService }
  from "../services/TokenService.js";
import { OtpService }
from "../services/OtpService.js";
import { EmailService }
  from "../services/EmailService.js";

import { UserAuthService }
  from "../services/UserAuthService.js";

  import { AdminService } from "../services/AdminService.js";

  import { RefreshTokenRepository }
from "../repositories/RefreshTokenRepository.js";

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


container.register(
  TOKENS.IUserRepository,
  {
    useClass: UserRepository,
  }
);
container.register(
  TOKENS.IUserProfileService,
  {
    useClass:UserProfileService
  }
)

container.register(
  TOKENS.IOtpRepository,
  {
    useClass: OtpRepository,
  }
);

container.register(
  TOKENS.ITokenService,
  {
    useClass: TokenService,
  }
);

container.register(
  TOKENS.IEmailService,
  {
    useClass: EmailService,
  }
);

container.register(
  TOKENS.IUserAuthService,
  {
    useClass: UserAuthService,
  }
);
container.register(
  TOKENS.IRefreshTokenRepository,
  {
    useClass: RefreshTokenRepository,
  }
);
container.register(
  TOKENS.IOtpService,
  {
    useClass: OtpService,
  }
);

container.register(
  TOKENS.ITrainerAuthService,
  {
    useClass:TrainerAuthService
  }
)
container.register(
  TOKENS.ITrainerRepository,
  {
    useClass:TrainerRepository
  }
)


container.register(
  TOKENS.IUserOnboardingService,
  {
    useClass:UserOnboardingService
  }
)

container.register(
  TOKENS.ITrainerOnboardingService,
  {
    useClass:TrainerOnboardingService
  }
)
container.register(
  TOKENS.IAdminService,
  {
    useClass:AdminService
  }
)

container.register(
  TOKENS.IImageService,
  {
    useClass:ImageService
  }
)
container.register(
  TOKENS.IAccountStatusService,
  {
    useClass:AccountStatusService
  }
)
container.register(
  TOKENS.IUserStatusService,
  {
    useClass:UserAccountStatusService
  }
)


container.register(
  TOKENS.IAIProvider,
  {
    useClass:GeminiProvider
  }
)

container.register(
  TOKENS.IAIPlanRepository,
  {
    useClass:AIPlanRepository
  }
)


container.register(
  TOKENS.IAIGeneratorService,
  {
    useClass:AIGeneratedService
  }
)


container.register(
  TOKENS.IAIPlanService,
  {
    useClass:AIPlanService
  }
)

import { CycleLogRepository } from "../repositories/CycleLogRepository.js";
import { DailyHealthLogRepository } from "../repositories/DailyHealthLogRepository.js";
import { HealthMilestoneRepository } from "../repositories/HealthMilestoneRepository.js";
import { CycleLogService } from "../services/CycleLogService.js";
import { CyclePredictionService } from "../services/CyclePredictionService.js";
import { DailyHealthLogService } from "../services/DailyHealthLogService.js";
import { HealthMilestoneService } from "../services/HealthMilestoneService.js";

container.register(TOKENS.IMealLogRepository, { useClass: MealLogRepository });
container.register(TOKENS.IRecipeRepository, { useClass: RecipeRepository });

container.register(TOKENS.ICycleLogRepository, { useClass: CycleLogRepository });
container.register(TOKENS.IDailyHealthLogRepository, { useClass: DailyHealthLogRepository });
container.register(TOKENS.IHealthMilestoneRepository, { useClass: HealthMilestoneRepository });

container.register(TOKENS.ICycleLogService, { useClass: CycleLogService });
container.register(TOKENS.ICyclePredictionService, { useClass: CyclePredictionService });
container.register(TOKENS.IDailyHealthLogService, { useClass: DailyHealthLogService });
container.register(TOKENS.IHealthMilestoneService, { useClass: HealthMilestoneService });

export { container };