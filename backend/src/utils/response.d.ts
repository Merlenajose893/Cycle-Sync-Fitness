import type { Response } from "express";
export declare const successResponse: (res: Response, message: string, data?: unknown, statusCode?: number) => Response;
export declare const errorResponse: (res: Response, message: string, statusCode?: number, errors?: unknown) => Response;
//# sourceMappingURL=response.d.ts.map