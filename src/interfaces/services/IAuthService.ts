import type { RegisterUserDTO,LoginDTO,ForgotPasswordDTO,VerifyEmailDTO,ResetPasswordDTO,TrainerRegisterDTO ,LoginTrainerDTO} from "../../dtos/types.js";
export interface IAuthService{
    registerUser(data:RegisterUserDTO):Promise<object>;
    loginUser(data:LoginDTO):Promise<object>;
    verifyUserEmail(data:VerifyEmailDTO):Promise<object>;

    registerTrainer(data:TrainerRegisterDTO):Promise<object>;
    loginTrainer(data:LoginTrainerDTO):Promise<object>;
    
}