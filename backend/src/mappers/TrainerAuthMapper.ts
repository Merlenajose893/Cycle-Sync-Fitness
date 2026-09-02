import type { TrainerRegisterDTO } from "../dtos/trainerauth.dto.ts";
import type { ITrainer } from "../models/Trainer.ts";

export class TrainerAuthMapper{
    static toRegisterTrainer(data:TrainerRegisterDTO)
    {
        return {
        firstName:data.firstName,
        lastName:data.lastName,
        email:data.email,
        password:data.password,
        speciality:data.speciality
        }
    }

    static toRegisterTrainerResponse(trainer:ITrainer)
    {
return{
    id:trainer._id.toString(),
    firstName:trainer.firstName,
    lastName:trainer.lastName,
    email:trainer.email,
    speciality:trainer.speciality,
    isEmailVerified:trainer.isEmailVerified,
    onboardingCompleted:trainer.onboardingCompleted,
    onboardingSteps:trainer.onboardingSteps
}
    }
}