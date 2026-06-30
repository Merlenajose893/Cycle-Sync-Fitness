export interface AdminLoginPayload{
email:string;
password:string;
}
export interface AuthResponse<T>{
    success:boolean;
    message:string;
    data:T
}

