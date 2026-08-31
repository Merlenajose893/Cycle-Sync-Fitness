import type { ChangePassword, DeleteAccount } from "../../dtos/userprofile.dto.ts";

export interface IUserStatusService{
    changePassword(userId:string,data:ChangePassword):Promise<void>;
    deleteAccount(userId:string,data:DeleteAccount):Promise<void>
}