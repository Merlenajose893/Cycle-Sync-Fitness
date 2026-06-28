import { z } from "zod";
export declare const registerUserSchema: z.ZodObject<{
    firstName: z.ZodString;
    lastName: z.ZodString;
    email: z.ZodString;
    password: z.ZodString;
}, z.core.$strip>;
export declare const loginSchema: z.ZodObject<{
    email: z.ZodString;
    password: z.ZodString;
}, z.core.$strip>;
export declare const verifyOtpSchema: z.ZodObject<{
    userId: z.ZodString;
    otp: z.ZodString;
}, z.core.$strip>;
export declare const resendOtpSchema: z.ZodObject<{
    userId: z.ZodString;
}, z.core.$strip>;
//# sourceMappingURL=auth.validation.d.ts.map