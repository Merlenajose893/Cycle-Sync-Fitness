import { z } from "zod";
export declare const updateTrainerProfileSchema: z.ZodObject<{
    bio: z.ZodString;
    experienceYears: z.ZodNumber;
    location: z.ZodString;
    avatar: z.ZodString;
    speciality: z.ZodArray<z.ZodEnum<{
        weight_loss: "weight_loss";
        muscle_gain: "muscle_gain";
        strength_training: "strength_training";
        yoga: "yoga";
        crossfit: "crossfit";
        rehabilitation: "rehabilitation";
        nutrition: "nutrition";
        sports_training: "sports_training";
    }>>;
    languages: z.ZodArray<z.ZodString>;
    tags: z.ZodArray<z.ZodString>;
}, z.core.$strip>;
export declare const updateTrainerCertificationSchema: z.ZodObject<{
    certifications: z.ZodArray<z.ZodObject<{
        title: z.ZodString;
        issuedBy: z.ZodString;
        year: z.ZodNumber;
        certificateUrl: z.ZodOptional<z.ZodString>;
    }, z.core.$strip>>;
}, z.core.$strip>;
export declare const updateTrainerPackageSchema: z.ZodObject<{
    packages: z.ZodArray<z.ZodObject<{
        name: z.ZodString;
        sessions: z.ZodNumber;
        duration: z.ZodEnum<{
            "1_week": "1_week";
            "1_month": "1_month";
            "3_months": "3_months";
            "6_months": "6_months";
        }>;
        price: z.ZodNumber;
        popular: z.ZodDefault<z.ZodBoolean>;
        mode: z.ZodEnum<{
            online: "online";
            offline: "offline";
            hybrid: "hybrid";
        }>;
    }, z.core.$strip>>;
}, z.core.$strip>;
//# sourceMappingURL=traineronboarding.validator.d.ts.map