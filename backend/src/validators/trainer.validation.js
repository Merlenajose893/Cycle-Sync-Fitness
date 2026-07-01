import { email, z } from "zod";
export const registerTrainerSchema = z.object({
    firstName: z.string().min(2),
    lastName: z.string().min(2),
    email: z.string().email(),
    password: z.string().min(6),
    speciality: z.string().min(2)
});
export const loginTrainer = z.object({
    email: z.string().email(),
    password: z.string().min(6)
});
export const verifyTrainerOtpSchema = z.object({
    trainerId: z.string(),
    otp: z
        .string()
        .length(6),
});
//# sourceMappingURL=trainer.validation.js.map