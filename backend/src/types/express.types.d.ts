import type { TokenPayload } from "./auth.types.js";
declare global {
    namespace Express {
        interface Request {
            user?: TokenPayload;
        }
    }
}
//# sourceMappingURL=express.types.d.ts.map