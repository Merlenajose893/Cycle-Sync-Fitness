import type { UserRole } from "../../types/auth.types.ts";

export interface IAccountStatusService{
    verifyAccount(userId:string,role:UserRole):Promise<void>;
}