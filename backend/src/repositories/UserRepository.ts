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

   
}