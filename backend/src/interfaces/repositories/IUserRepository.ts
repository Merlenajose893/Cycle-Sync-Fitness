import type { IUser } from "../../models/User.js";
import type { IBaseRepository } from "./IBaseRepository.js";
export interface IUserRepository extends IBaseRepository<IUser>{
findByEmail(email:string):Promise<IUser|null>;
findById(id:string):Promise<IUser|null>
create(data:Partial<IUser>):Promise<IUser>;
save(user:IUser):Promise<IUser>;
<<<<<<< HEAD
softDelete(id:string):Promise<IUser>
=======
>>>>>>> 081b12d (changes)
}