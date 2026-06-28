export type UserRole = "user" | "trainer" | "admin";
export interface TokenPayload {
    userId: string;
    role: UserRole;
}
//# sourceMappingURL=auth.types.d.ts.map