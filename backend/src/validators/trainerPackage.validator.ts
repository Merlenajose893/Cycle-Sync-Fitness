import { z } from "zod";

export const createPackageSchema = z.object({

    packageName: z
        .string()
        .min(3)
        .max(100),

    description: z
        .string()
        .min(10)
        .max(500),

    durationDays: z
        .number()
        .int()
        .min(7)
        .max(365),

    price: z
        .number()
        .min(0),

    features: z
        .array(z.string())
        .min(1)
        .max(10),

    maxClients: z
        .number()
        .int()
        .min(1)
        .optional()

});

export const updatePackageSchema=createPackageSchema.partial();