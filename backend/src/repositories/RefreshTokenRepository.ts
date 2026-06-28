import { injectable } from "tsyringe";
import { RefreshTokenModel, type IRefreshToken } from "../models/RefreshToken.js";

import { BaseRepository } from "./BaseRepository.js";

import type { IRefreshTokenRepository } from "../interfaces/repositories/IRefreshTokenRepository.js";
import { Types } from "mongoose";

@injectable()
export class RefreshTokenRepository extends BaseRepository<IRefreshToken> implements IRefreshTokenRepository{
constructor()
{
    super(RefreshTokenModel)
}

async findByUserId(userId: string): Promise<IRefreshToken[]|null> {
    return this.model.findById({userId:new Types.ObjectId(userId)})
}
async deleteByUserId(userId: string): Promise<void> {
    await  this.model.deleteMany({userId:new Types.ObjectId(userId)})
}

async deleteByHash(tokenHash: string): Promise<void> {
    await this.model.deleteOne({tokenHash})
}
}