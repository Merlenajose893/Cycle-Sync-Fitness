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
import { inject, injectable } from "tsyringe";
import bcrypt from "bcryptjs";
import { TOKENS } from "../container/tokens.js";
import { UnauthorizedError } from "../errors/index.js";
let AdminService = class AdminService {
    userRepository;
    trainerRepository;
    tokenService;
    constructor(userRepository, trainerRepository, tokenService) {
        this.userRepository = userRepository;
        this.trainerRepository = trainerRepository;
        this.tokenService = tokenService;
    }
    adminLogin = async (data, res) => {
        const admin = await this.userRepository.findByEmail(data.email);
        if (!admin) {
            throw new UnauthorizedError("Invalid credentials");
        }
        if (admin.role !== "admin") {
            throw new UnauthorizedError("Access Denied");
        }
        const isPasswordValid = await bcrypt.compare(data.password, admin.password);
        if (!isPasswordValid) {
            throw new UnauthorizedError("Invalid credentials");
        }
        await this.tokenService.generateAndSetAccessToken({ userId: admin._id.toString(), role: "admin" }, res);
        await this.tokenService.generateAndSetRefreshToken({ userId: admin._id.toString(), role: "admin" }, res);
    };
    listUsers(pagination) {
        return this.userRepository.findAll(pagination.page, pagination.limit);
    }
    listTrainer(pagination) {
        return this.trainerRepository.findAll(pagination.page, pagination.limit);
    }
};
AdminService = __decorate([
    injectable(),
    __param(0, inject(TOKENS.IUserRepository)),
    __param(1, inject(TOKENS.ITrainerRepository)),
    __param(2, inject(TOKENS.ITokenService)),
    __metadata("design:paramtypes", [Object, Object, Object])
], AdminService);
export { AdminService };
//# sourceMappingURL=AdminService.js.map