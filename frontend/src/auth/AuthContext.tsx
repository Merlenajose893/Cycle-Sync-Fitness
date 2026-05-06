import { createContext, useContext, useState } from "react";
import type { User } from "../types/user.types";
import { getToken,getRole,setAuthData,clearAuthData } from "../utils/token";

type Role='user'|'trainer'|'admin'|null;
type AuthContextType={
    token:string|null;
    role:Role;
    user:User|null;
    isAuthenticated:boolean;
    login:(token:string,user:any)=>void;
    logout:()=>void;
}

const AuthContext=createContext<AuthContextType|null>(null);
export const AuthProvider=({children}:any)=>{
    const [token,setToken]=useState<string|null>(getToken());
    const [role,setRole]=useState<Role>(getRole() as Role);
    const [user,setUser]=useState<User|null>(null);

    const login=(token:string,user:any)=>{
        setAuthData(token,user.role);
        setToken(token);
        setRole(user.role);
        setUser(user);
    }

    const logout=()=>{
        clearAuthData();
        setToken(null);
        setRole(null);
        setUser(null);
    };


    return(
        <AuthContext.Provider value={{
            token,role,user,isAuthenticated:!!token,login,logout
        }}>
{children}
        </AuthContext.Provider>
    )
};


export const useAuth=()=>useContext(AuthContext)