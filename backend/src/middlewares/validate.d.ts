import type { Request, Response, NextFunction } from "express";
import { z } from "zod";
export declare const validate: (schema: z.ZodSchema) => (req: Request, res: Response, next: NextFunction) => void;
//# sourceMappingURL=validate.d.ts.map