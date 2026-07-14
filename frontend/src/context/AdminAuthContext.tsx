import { createContext, useContext, type ReactNode } from "react";
import type { User } from "../types/auth.types";

interface AdminAuthContextType {
    admin: User | null;
    isAuthenticated: boolean;
    loading: boolean;
}

const AdminAuthContext = createContext<AdminAuthContextType | null>(null);

export const AdminAuthProvider = ({ children }: { children: ReactNode }) => {
    return (
        <AdminAuthContext.Provider value={{ admin: null, isAuthenticated: false, loading: false }}>
            {children}
        </AdminAuthContext.Provider>
    );
};

export const useAdminContext = () => {
    const context = useContext(AdminAuthContext);
    if (!context) {
        throw new Error("useAdminContext must be used inside AdminAuthProvider");
    }
    return context;
};