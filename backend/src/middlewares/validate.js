import { z } from "zod";
import { BadRequestError } from "../errors/index.js";
export const validate = (schema) => {
    return (req, res, next) => {
        const result = schema.safeParse(req.body);
        if (!result.success) {
            const errors = result.error.issues.map((err) => ({
                field: err.path.join("."),
                message: err.message,
            }));
            throw new BadRequestError(JSON.stringify(errors));
        }
        req.body = result.data;
        next();
    };
};
//# sourceMappingURL=validate.js.map