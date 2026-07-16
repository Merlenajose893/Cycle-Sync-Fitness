import { injectable } from "tsyringe";
import { UserModel } from "../models/User.js";
import type { IUser } from "../models/User.js";
import type { IUserRepository } from "../interfaces/repositories/IUserRepository.js";
import { BaseRepository } from "./BaseRepository.js";
@injectable()
export class UserRepository extends BaseRepository<IUser> implements IUserRepository{
    constructor()
    {
        super(UserModel)
    }
    async  findByEmail(email:string):Promise<IUser | null> {
        return this.model.findOne({email})
    }


    
    async findByGoogleId(googleId: string): Promise<IUser | null> {
        return this.model.findOne({googleId})
    }


    async blockUser(userId: string): Promise<IUser | null> {
        return this.model.findByIdAndUpdate(userId,{isDeleted:true},{new:true});
    }

    async unblockUser(userId: string): Promise<IUser | null> {
        return this.model.findByIdAndUpdate(userId,{isDeleted:false},{new:true})
    }

    async updateProfile(userId: string, data: Partial<IUser>): Promise<IUser | null> {
        return this.model.findByIdAndUpdate(userId,data,{new:true})
    }

    

   
}