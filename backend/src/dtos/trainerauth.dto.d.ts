export interface TrainerRegisterDTO {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    speciality: string;
}
export interface LoginTrainerDTO {
    email: string;
    password: string;
}
export interface VerifyTrainerDTO {
    trainerId: string;
    otp: string;
}
//# sourceMappingURL=trainerauth.dto.d.ts.map