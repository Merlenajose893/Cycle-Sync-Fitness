import type { UserRole } from "../../types/auth.types.js";
export interface IAccountStatusService {
    verifyAccount(userId: string, role: UserRole): Promise<void>;
}
//# sourceMappingURL=IAccountStatusService.d.ts.map