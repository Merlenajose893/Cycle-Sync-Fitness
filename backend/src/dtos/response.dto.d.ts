import { HttpStatus } from "../constants/HttpStatus.js";
export interface CommonResponse<T = null> {
    success: boolean;
    message: string;
    data?: T | null;
    statusCode: HttpStatus;
}
export declare const successResponse: <T>(message: string, data?: T | null, statusCode?: HttpStatus) => CommonResponse<T>;
export declare const errorResponse: <T>(message: string, data?: T | null, statusCode?: HttpStatus) => CommonResponse<null>;
//# sourceMappingURL=response.dto.d.ts.map