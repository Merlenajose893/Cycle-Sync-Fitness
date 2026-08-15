import { z } from "zod";
export declare const createPackageSchema: z.ZodObject<{
    packageName: z.ZodString;
    description: z.ZodString;
    durationDays: z.ZodNumber;
    price: z.ZodNumber;
    features: z.ZodArray<z.ZodString>;
    maxClients: z.ZodOptional<z.ZodNumber>;
}, z.core.$strip>;
export declare const updatePackageSchema: z.ZodObject<{
    packageName: z.ZodOptional<z.ZodString>;
    description: z.ZodOptional<z.ZodString>;
    durationDays: z.ZodOptional<z.ZodNumber>;
    price: z.ZodOptional<z.ZodNumber>;
    features: z.ZodOptional<z.ZodArray<z.ZodString>>;
    maxClients: z.ZodOptional<z.ZodOptional<z.ZodNumber>>;
}, z.core.$strip>;
//# sourceMappingURL=trainerPackage.validator.d.ts.map