import { z } from "zod";
export declare const updateTrainerProfileSchema: z.ZodObject<{
    bio: z.ZodOptional<z.ZodObject<{}, z.core.$strip>>;
    experience: z.ZodOptional<z.ZodString>;
    location: z.ZodOptional<z.ZodString>;
    avatar: z.ZodOptional<z.ZodString>;
    speciality: z.ZodOptional<z.ZodString>;
    languages: z.ZodOptional<z.ZodArray<z.ZodString>>;
    tags: z.ZodOptional<z.ZodArray<z.ZodString>>;
}, z.core.$strip>;
export declare const updateTrainerCertificationSchema: z.ZodObject<{
    certifications: z.ZodArray<z.ZodObject<{
        title: z.ZodString;
        issuedBy: z.ZodString;
        year: z.ZodString;
    }, z.core.$strip>>;
}, z.core.$strip>;
export declare const updateTrainerPackageSchema: z.ZodObject<{
    packages: z.ZodArray<z.ZodObject<{
        name: z.ZodString;
        sessions: z.ZodNumber;
        duration: z.ZodString;
        price: z.ZodNumber;
        popular: z.ZodOptional<z.ZodBoolean>;
    }, z.core.$strip>>;
}, z.core.$strip>;
//# sourceMappingURL=traineronboarding.validator.d.ts.map