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

container.register(
  TOKENS.IUserRepository,
  {
    useClass: UserRepository,
  }
);

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


export { container };