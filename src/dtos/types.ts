export interface RegisterUserDTO{
    firstName:string,
    lastName:string,
    email:string,
    password:string
}

export interface LoginDTO{
  email:string,
  password:string  
}

export interface VerifyEmailDTO{
    email:string,
    otp:string
}

export interface ForgotPasswordDTO{
    email:string
  
    
}

export interface ResetPasswordDTO{
    email:string,
    otp:string,
    newPassword:string
}

export interface TrainerRegisterDTO{
    firstName:string,
    lastName:string,
    email:string,
    password:string,
    speciality:string

}

export interface LoginTrainerDTO{
    email:string,
    password:string
}

export interface verifyTrainerDTO{
    email:string,
    otp:string,
    
}
