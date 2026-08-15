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
import { RefreshTokenModel } from "../models/RefreshToken.js";
import { BaseRepository } from "./BaseRepository.js";
import { Types } from "mongoose";
let RefreshTokenRepository = class RefreshTokenRepository extends BaseRepository {
    constructor() {
        super(RefreshTokenModel);
    }
    async findByUserId(userId) {
        return this.model.find({ userId: new Types.ObjectId(userId) });
    }
    async deleteByUserId(userId) {
        await this.model.deleteMany({ userId: new Types.ObjectId(userId) });
    }
    async deleteByHash(tokenHash) {
        await this.model.deleteOne({ tokenHash });
    }
};
RefreshTokenRepository = __decorate([
    injectable(),
    __metadata("design:paramtypes", [])
], RefreshTokenRepository);
export { RefreshTokenRepository };
//# sourceMappingURL=RefreshTokenRepository.js.map