import { injectable,inject } from "tsyringe";
import type { IUserAuthService } from "../interfaces/services/IUserAuthService.js";
import type { IUserRepository } from "../interfaces/repositories/IUserRepository.js";
import type { IOtpRepository } from "../interfaces/repositories/IOtpRepository.js";
import type { IEmailService } from "../interfaces/services/IEmailService.js";
import type { ITokenService } from "../interfaces/services/ITokenService.js";
import { TOKENS } from "../container/tokens.js";
import bcrypt from "bcryptjs";
import { ConflictError, NotFoundError } from "../errors/index.js";
import type { LogoutDTO, RegisterUserDTO, VerifyOtpDTO } from "../dtos/auth.dto.js";
import type { IUser } from "../models/User.js";
import type { IOtpService } from "../interfaces/services/IOtpService.js";
import type { LoginDTO } from "../dtos/auth.dto.js";
// import type { IUser } from "../models/User.js";
import { UnauthorizedError,BadRequestError } from "../errors/index.js";
@injectable()
export class UserAuthService implements IUserAuthService{
    constructor(@inject(TOKENS.UserRepository) private userRepository:IUserRepository,
    @inject(TOKENS.OtpRepository)
    private otpRepository:IOtpRepository,
    @inject(TOKENS.EmailService)
    private emailService:IEmailService,
    @inject(TOKENS.TokenService)
    private tokenService:ITokenService,
    @inject(TOKENS.OtpService)
    private otpService:IOtpService

){}

async registerUser(data: RegisterUserDTO,res:Response): Promise<IUser> {
    const existingUser=await this.userRepository.findByEmail(data.email);
    if(existingUser)
    {
        throw new ConflictError("User already exists")
    }
    const hashedPassword=await bcrypt.hash(data.password,10);
    const user=await this.userRepository.create({
        firstName:data.firstName,
        lastName:data.lastName,
        email:data.email,
        password:hashedPassword,
        role:"user"
    })

    await this.otpService.createAndSentOtp(
        user._id.toString(),
        "user",
        user.email,
        "email-verification"
    )
return user;
}

verifyEmailOTP=async(data: VerifyOtpDTO,res:Response): Promise<IUser>=> {
    await this.otpService.verifyOtp(data.userId,"email-verification",data.otp);
    const user=await this.userRepository.findById(data.userId);
    if(!user)
    {
        throw new NotFoundError("User not found")
    }
    user.isEmailVerified=true;
    await this.userRepository.save(user);
    await this.tokenService.generateAndSetAccessToken({userId:user._id.toString(),role:user.role},res)

await this.tokenService.generateAndSetRefreshToken({userId:user._id.toString(),role:user.role},res)
}

loginUser=async(data: LoginDTO,res:Response): Promise<IUser>=> {
   const user=await this.userRepository.findByEmail(data.email);
   if(!user)
    {
        throw new UnauthorizedError("Invalid credentials")
    } 
if(!user.isEmailVerified)
{
    throw new BadRequestError("Email not verified")
}
const isPassword=await bcrypt.compare(data.password,user.password);

if(!isPassword)
{
    throw new UnauthorizedError("Password not valid")
}
await this.tokenService.generateAndSetAccessToken({userId:user._id.toString(),role:user.role},res);
await this.tokenService.generateAndSetRefreshToken({userId:user._id.toString(),role:user.role},res)

}

logoutuser=async(data: LogoutDTO,res:Response): Promise<IUser> =>{
    await this.tokenService.clearTokens(data.userId,res)
}
}