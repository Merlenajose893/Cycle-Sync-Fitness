import type { Request, Response, NextFunction } from "express";
import type { IUserAuthService } from "../interfaces/services/IUserAuthService.js";
export declare class UserAuthController {
    private userAuthService;
    constructor(userAuthService: IUserAuthService);
    registerUser: (req: Request, res: Response, next: NextFunction) => Promise<void>;
    verifyUserOtp: (req: Request, res: Response) => Promise<void>;
    googleSignIn: (req: Request, res: Response) => Promise<void>;
    loginUser: (req: Request, res: Response) => Promise<void>;
    resendOtp: (req: Request, res: Response) => Promise<void>;
    logoutUser: (req: Request, res: Response) => Promise<void>;
    refreshToken: (req: Request, res: Response) => Promise<void>;
    forgotPassword: (req: Request, res: Response) => Promise<void>;
    verifyForgotPasword: (req: Request, res: Response) => Promise<void>;
    resetPassword: (req: Request, res: Response) => Promise<void>;
    getCurrentUser: (req: Request, res: Response, next: NextFunction) => Promise<void>;
}
//# sourceMappingURL=UserAuthControllers.d.ts.map