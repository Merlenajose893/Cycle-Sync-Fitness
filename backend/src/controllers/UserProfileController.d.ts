import type { Request, Response, NextFunction } from "express";
import type { IUserProfileService } from "../interfaces/services/IUserProfileService.js";
export declare class UserProfileController {
    private userprofileservice;
    constructor(userprofileservice: IUserProfileService);
    getProfile: (req: Request, res: Response, next: NextFunction) => Promise<void>;
    updateProfile: (req: Request, res: Response, next: NextFunction) => Promise<void>;
    uploadAvatar: (req: Request, res: Response, next: NextFunction) => Promise<void>;
    deleteAvatar: (req: Request, res: Response, next: NextFunction) => Promise<void>;
}
//# sourceMappingURL=UserProfileController.d.ts.map