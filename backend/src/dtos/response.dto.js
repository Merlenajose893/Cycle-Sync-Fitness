import { HttpStatus } from "../constants/HttpStatus.js";
export const successResponse = (message, data = null, statusCode = HttpStatus.OK) => {
    return {
        success: true,
        statusCode,
        message,
        data,
    };
};
export const errorResponse = (message, data, statusCode = HttpStatus.INTERNAL_SERVER_ERROR) => {
    return {
        success: true,
        statusCode,
        message,
        data: null
    };
};
//# sourceMappingURL=response.dto.js.map