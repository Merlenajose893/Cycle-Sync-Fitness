import { UserModel } from "../models/User.js";
import type { IUser } from "../models/User.js";
import type { IUserRepository } from "../interfaces/repositories/IUserRepository.js";

export class UserRepository implements IUserRepository{
    async  findByEmail(email:string):Promise<IUser | null> {
        return UserModel.findOne({email})
    }

    async create(userData:Partial<IUser>):Promise<IUser>{
        return UserModel.create(userData)
    }

    async findById(id:string):Promise<IUser | null>
    {
        return UserModel.findById(id)
    }

    async save(user:IUser):Promise<IUser>{
        return user.save();
    }
}