import type { IPaymentService } from "../interfaces/services/IPaymentService.js";
import type { NextFunction, Request, Response } from "express";
export declare class PaymentController {
    private paymentService;
    constructor(paymentService: IPaymentService);
    createCheckoutSession: (req: Request, res: Response, next: NextFunction) => Promise<void>;
    handleWebhook: (req: Request, res: Response, next: NextFunction) => Promise<void>;
    confirmSession: (req: Request, res: Response, next: NextFunction) => Promise<void>;
    getPaymentsByUser: (req: Request, res: Response, next: NextFunction) => Promise<void>;
    getPaymentById: (req: Request, res: Response, next: NextFunction) => Promise<void>;
}
//# sourceMappingURL=PaymentController.d.ts.map