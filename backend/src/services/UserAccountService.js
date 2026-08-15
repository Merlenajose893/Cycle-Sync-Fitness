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
import { TOKENS } from "../container/tokens.js";
import { inject } from "tsyringe";
import { BadRequestError, NotFoundError } from "../errors/index.js";
import bcrypt from "bcryptjs";
let UserAccountStatusService = class UserAccountStatusService {
    userrepository;
    imageService;
    constructor(userrepository, imageService) {
        this.userrepository = userrepository;
        this.imageService = imageService;
    }
    changePassword = async (userId, data) => {
        const user = await this.userrepository.findById(userId);
        if (!user) {
            throw new NotFoundError("User not found");
        }
        if (!user.password) {
            throw new BadRequestError("Password is not there");
        }
        const isCompare = await bcrypt.compare(data.currentPassword, user.password);
        if (!isCompare) {
            throw new BadRequestError("Passwords doesnt match ");
        }
        const hashedPassword = await bcrypt.hash(data.newPassword, 10);
        user.password = hashedPassword;
        await this.userrepository.save(user);
    };
    deleteAccount = async (userId, data) => {
        const user = await this.userrepository.findById(userId);
        if (!user) {
            throw new NotFoundError("User not found");
        }
        if (!user.password) {
            throw new BadRequestError("Google Accounts cannot be deleted without password");
        }
        const isPasswordValid = await bcrypt.compare(data.password, user.password);
        if (!isPasswordValid) {
            throw new BadRequestError("password doesnt match ");
        }
        if (user.avatarPublicId) {
            await this.imageService.deleteImage(user.avatarPublicId);
        }
        await this.userrepository.softDelete(userId);
    };
};
UserAccountStatusService = __decorate([
    __param(0, inject(TOKENS.IUserRepository)),
    __param(1, inject(TOKENS.IImageService)),
    __metadata("design:paramtypes", [Object, Object])
], UserAccountStatusService);
export { UserAccountStatusService };
//# sourceMappingURL=UserAccountService.js.map