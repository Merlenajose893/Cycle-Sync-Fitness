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
  import { RefreshTokenRepository }
from "../repositories/RefreshTokenRepository.js";

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

export { container };