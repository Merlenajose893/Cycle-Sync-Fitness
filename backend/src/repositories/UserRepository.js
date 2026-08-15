var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { injectable } from "tsyringe";
import { UserModel } from "../models/User.js";
import { BaseRepository } from "./BaseRepository.js";
let UserRepository = class UserRepository extends BaseRepository {
    constructor() {
        super(UserModel);
    }
    async findByEmail(email) {
        return this.model.findOne({ email });
    }
    async findByGoogleId(googleId) {
        return this.model.findOne({ googleId });
    }
    async blockUser(userId) {
        return this.model.findByIdAndUpdate(userId, { isDeleted: true }, { new: true });
    }
    async unblockUser(userId) {
        return this.model.findByIdAndUpdate(userId, { isDeleted: false }, { new: true });
    }
    async updateProfile(userId, data) {
        return this.model.findByIdAndUpdate(userId, data, { new: true });
    }
    async softDelete(userId) {
        return this.model.findByIdAndUpdate(userId, { isDeleted: true, deletedAt: new Date() }, { new: true });
    }
    async hardDelete(userId) {
        return this.model.findByIdAndDelete(userId);
    }
};
UserRepository = __decorate([
    injectable(),
    __metadata("design:paramtypes", [])
], UserRepository);
export { UserRepository };
//# sourceMappingURL=UserRepository.js.map