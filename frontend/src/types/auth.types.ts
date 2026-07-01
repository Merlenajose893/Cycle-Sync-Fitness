export interface User{
    _id:string;
    firstName:string;
    lastName:string;
    email:string;
    role:"user"|"admin";
    isEmailVerified:boolean;
    onboardingComplete:boolean;
<<<<<<< HEAD
    goals?: {
    primaryGoal: string;
  };

  subscription?: {
    status: string;
  };
=======
>>>>>>> 081b12d (changes)
    createdAt:string;
    updatedAt:string;
}

export interface Trainer{
    _id:string;
    firstName:string;
    lastName:string;
    email:string;
    role:"trainer";
    isEmailVerified:boolean;
    createdAt:string;
    updatedAt:string;
<<<<<<< HEAD
    speciality:string;
=======
>>>>>>> 081b12d (changes)
}

export interface AuthResponse<T>{
    success:boolean;
    message:string;
    data:T;
}
export interface RegisterUserPayload{
    firstName:string;
    lastName:string;
    email:string;
    password:string;
    confirmPassword:string;
}
export interface LoginUserPayload{
    email:string;
    password:string;
}

export interface VerifyOtpPayload{
    userId:string;
    otp:string;
}
export interface ResendOTPPayload{
    userId:string;
}
<<<<<<< HEAD

export interface ForgotPasswordPayload{
    email:string;
}

export interface ResetPasswordPayload{
    userId:string;
    otp:string;
    newPassword:string;
}
=======
>>>>>>> 081b12d (changes)
export interface RegisterTrainerPayload{
firstName:string;
lastName:string;
email:string;
password:string;
confirmPassword:string;
speciality:string;
}

<<<<<<< HEAD


=======
>>>>>>> 081b12d (changes)
export interface LoginTrainerPayload{
    email:string;
    password:string;
}

export interface VerifyTrainerOtpPayload{
    trainerId:string;
    otp:string;
}

export interface ResendTrainerOTPPayload{
    trainerId:string
}

<<<<<<< HEAD

=======
export interface AdminLoginPayload {

  email: string;

  password: string;
}
>>>>>>> 081b12d (changes)

 