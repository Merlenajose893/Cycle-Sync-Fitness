import { z } from "zod";
export const createCheckoutSchema = z.object({
    packageId: z
        .string()
        .min(1, "Package ID is required"),
});
//# sourceMappingURL=payment.validator.js.map