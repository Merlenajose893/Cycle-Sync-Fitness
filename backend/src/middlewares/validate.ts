import type { Request, Response, NextFunction } from "express";
import { z } from "zod";
import { BadRequestError } from "../errors/index.ts";

export const validate = (schema: z.ZodSchema) => {
    return (req: Request, res: Response, next: NextFunction): void => {
        if (req.body && typeof req.body === "object") {
            if (typeof req.body.data === "string") {
                try {
                    req.body = JSON.parse(req.body.data);
                } catch (e) {}
            } else {
                Object.keys(req.body).forEach((key) => {
                    if (typeof req.body[key] === "string") {
                        const trimmed = req.body[key].trim();
                        if (
                            (trimmed.startsWith("{") && trimmed.endsWith("}")) ||
                            (trimmed.startsWith("[") && trimmed.endsWith("]"))
                        ) {
                            try {
                                req.body[key] = JSON.parse(req.body[key]);
                            } catch (e) {}
                        }
                    }
                });
            }
        }

        const result = schema.safeParse(req.body);
        if (!result.success) {
            const errors = result.error.issues.map((err) => ({
                field: err.path.join("."),
                message: err.message,
            }));

            const errorMessage = errors.map((e) => e.message).join(". ");
            throw new BadRequestError(errorMessage);
        }
        req.body = result.data;
        next();
    };
};