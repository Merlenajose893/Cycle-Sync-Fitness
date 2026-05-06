import type { IUser } from "../../models/User.js";
export interface IUserRepository{
findByEmail(email:string):Promise<IUser|null>;
findById(id:string):Promise<IUser|null>
create(data:Partial<IUser>):Promise<IUser>;
save(user:IUser):Promise<IUser>;
}