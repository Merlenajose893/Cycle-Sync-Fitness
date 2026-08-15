var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
import { injectable, inject } from "tsyringe";
import { TOKENS } from "../container/tokens.js";
import bcrypt from "bcryptjs";
import { ConflictError, ForbiddenError, NotFoundError } from "../errors/index.js";
// import type { IUser } from "../models/User.js";
import { UnauthorizedError, BadRequestError } from "../errors/index.js";
import { OAuth2Client } from "google-auth-library";
let UserAuthService = class UserAuthService {
    userRepository;
    otpRepository;
    emailService;
    tokenService;
    otpService;
    constructor(userRepository, otpRepository, emailService, tokenService, otpService) {
        this.userRepository = userRepository;
        this.otpRepository = otpRepository;
        this.emailService = emailService;
        this.tokenService = tokenService;
        this.otpService = otpService;
    }
    async registerUser(data, res) {
        const existingUser = await this.userRepository.findByEmail(data.email);
        if (existingUser) {
            throw new ConflictError("User already exists");
        }
        const hashedPassword = await bcrypt.hash(data.password, 10);
        const user = await this.userRepository.create({
            firstName: data.firstName,
            lastName: data.lastName,
            email: data.email,
            password: hashedPassword,
            role: "user"
        });
        const ans = await this.otpService.createAndSentOtp(user._id.toString(), "user", user.email, "email-verification");
        console.log(ans);
        return user;
    }
    verifyEmailOTP = async (data, res) => {
        await this.otpService.verifyOtp(data.userId, "email-verification", data.otp);
        const user = await this.userRepository.findById(data.userId);
        if (!user) {
            throw new NotFoundError("User not found");
        }
        user.isEmailVerified = true;
        await this.userRepository.save(user);
        await this.tokenService.generateAndSetAccessToken({ userId: user._id.toString(), role: user.role }, res);
        await this.tokenService.generateAndSetRefreshToken({ userId: user._id.toString(), role: user.role }, res);
        return user;
    };
    googleSignIn = async (idToken, res) => {
        const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);
        const ticket = await client.verifyIdToken({
            idToken, audience: process.env.GOOGLE_CLIENT_ID,
        });
        const payload = ticket.getPayload();
        if (!payload) {
            throw new BadRequestError("Invalid Google token");
        }
        const { sub: googleId, email, given_name, family_name, picture, email_verified } = payload;
        if (!email || !googleId) {
            throw new BadRequestError("Google token missing email");
        }
        if (!email_verified) {
            throw new BadRequestError("Google Email is not verified");
        }
        let user = await this.userRepository.findByGoogleId(googleId);
        if (!user) {
            user = await this.userRepository.findByEmail(email);
            if (user) {
                user.googleId = googleId;
                user.isEmailVerified = true;
                await this.userRepository.save(user);
            }
            else {
                user = await this.userRepository.create({
                    firstName: given_name || "User",
                    lastName: family_name || "",
                    email: email,
                    googleId: googleId,
                    isEmailVerified: true,
                    avatarUrl: picture,
                    onboardingStep: 1,
                    onboardingComplete: false,
                });
            }
        }
        await this.tokenService.generateAndSetAccessToken({ userId: user._id.toString(), role: user.role }, res);
        await this.tokenService.generateAndSetRefreshToken({ userId: user._id.toString(), role: user.role }, res);
        return user;
    };
    resendOTP = async (data, res) => {
        const user = await this.userRepository.findById(data.userId);
        if (!user) {
            throw new NotFoundError("User not found");
        }
        if (user.isEmailVerified) {
            throw new BadRequestError("Email already verified");
        }
        await this.otpService.resendOTP(user._id.toString(), "user", user.email, "email-verification");
    };
    loginUser = async (data, res) => {
        const user = await this.userRepository.findByEmail(data.email);
        if (!user) {
            throw new UnauthorizedError("Invalid credentials");
        }
        if (!user.isEmailVerified) {
            throw new BadRequestError("Email not verified");
        }
        if (!user.password) {
            throw new UnauthorizedError("Password not found");
        }
        if (user.isDeleted) {
            throw new ForbiddenError("Your account is blokced");
        }
        // const isPassword=await bcrypt.compare(data.password,user.password!);
        const isPassword = await bcrypt.compare(data.password, user.password);
        // console.log(isPassword);
        if (!isPassword) {
            throw new UnauthorizedError("Password not valid");
        }
        await this.tokenService.generateAndSetAccessToken({ userId: user._id.toString(), role: user.role }, res);
        await this.tokenService.generateAndSetRefreshToken({ userId: user._id.toString(), role: user.role }, res);
        return user;
    };
    logoutuser = async (data, res) => {
        await this.tokenService.clearTokens(data.userId, res);
    };
    refreshToken = async (refreshToken, res) => {
        if (!refreshToken) {
            throw new UnauthorizedError("Refresh token missing");
        }
        await this.tokenService.refreshTokens(refreshToken, res);
    };
    forgotPassword = async (data, res) => {
        const user = await this.userRepository.findByEmail(data.email);
        if (!user) {
            throw new NotFoundError("User not Found");
        }
        const ans = await this.otpService.createAndSentOtp(user._id.toString(), "user", user.email, "password-reset");
        console.log(ans);
        return {
            userId: user._id.toString(),
            email: user.email,
            message: "Forgot Password sent successfully"
        };
    };
    resetPassword = async (data, res) => {
        let userId = data.userId;
        if (data.userId && data.userId.includes("@")) {
            const user = await this.userRepository.findByEmail(data.userId);
            if (!user) {
                throw new NotFoundError("User not found");
            }
            userId = user._id.toString();
        }
        await this.otpService.verifyOtp(userId, "password-reset", data.otp);
        const user = await this.userRepository.findById(userId);
        if (!user) {
            throw new NotFoundError("User not found");
        }
        const hashedPassword = await bcrypt.hash(data.newPassword, 10);
        user.password = hashedPassword;
        await this.userRepository.save(user);
    };
    getCurrentUser = async (userId) => {
        const user = await this.userRepository.findById(userId);
        if (!user) {
            throw new NotFoundError("User not found");
        }
        return user;
    };
};
UserAuthService = __decorate([
    injectable(),
    __param(0, inject(TOKENS.IUserRepository)),
    __param(1, inject(TOKENS.IOtpRepository)),
    __param(2, inject(TOKENS.IEmailService)),
    __param(3, inject(TOKENS.ITokenService)),
    __param(4, inject(TOKENS.IOtpService)),
    __metadata("design:paramtypes", [Object, Object, Object, Object, Object])
], UserAuthService);
export { UserAuthService };
//# sourceMappingURL=UserAuthService.js.map