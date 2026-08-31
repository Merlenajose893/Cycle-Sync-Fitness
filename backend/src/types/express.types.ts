import type { TokenPayload } from "./auth.types.ts";
declare global{
    namespace Express{
        interface Request{
            user?:TokenPayload
        }
    }
}