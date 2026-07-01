import { AppError } from "../errors/index.js";
import { HttpStatus } from "../constants/HttpStatus.js";
import { errorResponse } from "../dtos/response.dto.js";
export const errorHandler = (err, req, res, next) => {
    if (err instanceof AppError) {
        res.status(err.statuscode).json(errorResponse(err.message));
        return;
    }
    console.error(err);
    res.status(HttpStatus.INTERNAL_SERVER_ERROR).json(errorResponse("Internal Server Error"));
};
//# sourceMappingURL=errorHandler.js.map