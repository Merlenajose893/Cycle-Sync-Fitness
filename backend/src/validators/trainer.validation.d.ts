import { z } from "zod";
export declare const registerTrainerSchema: z.ZodObject<{
    firstName: z.ZodString;
    lastName: z.ZodString;
    email: z.ZodString;
    password: z.ZodString;
    speciality: z.ZodString;
}, z.core.$strip>;
export declare const loginTrainer: z.ZodObject<{
    email: z.ZodString;
    password: z.ZodString;
}, z.core.$strip>;
export declare const verifyTrainerOtpSchema: z.ZodObject<{
    trainerId: z.ZodString;
    otp: z.ZodString;
}, z.core.$strip>;
//# sourceMappingURL=trainer.validation.d.ts.map