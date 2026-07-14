import { string } from "zod";

export interface AdminLoginDto{
    email:string;
    password:string;
}
export interface PaginationDto{
    page:number;
    limit:number;
}

export interface InviteTrainerDTO{
    firstName:string;
    lastName:string;
    email:string;
    phone:string;
    specialization:string;
    experience:string;

}