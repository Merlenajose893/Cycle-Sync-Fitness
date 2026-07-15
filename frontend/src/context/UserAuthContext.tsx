import { Children, createContext, useContext, useEffect, useState, type ReactNode } from "react"
import { useUserAuth } from "../hooks/auth/useUserAuth"
import type { User } from "../types/auth.types"
interface UserAuthContextType{
    user:User|null;
    isAuthenticated:boolean;
    loading:boolean;
    login:(user:User)=>void;
      googleAuth: (credential: string) => Promise<void>;

    logout:()=>Promise<void>;
}
const UserAuthContext=createContext<UserAuthContextType|undefined>(undefined);
interface UserAuthProviderProps{
    children:ReactNode;
}
export const UserAuthProvider=({
    children,
}:UserAuthProviderProps)=>{
    const [user,setUser]=useState<User|null>(null);
    const [loading,setLoading]=useState(true);
    const {getUser,logoutUser,googleSignIn}=useUserAuth();
    useEffect(()=>{
        const restoreSession=async () => {
            try {
                const currentUser=await getUser();
                if(currentUser)
                {
                    setUser(currentUser);
                }
            } catch (error) {
                console.log(error);
                
            }
            finally{
                setLoading(false);
            }
        };
        restoreSession();
    },[])

    const login=(userData:User)=>{
        setUser(userData);
    }
    const logout=async () => {
        await logoutUser();
        setUser(null);
    }
    const googleAuth=async (credential:string) => {
        await googleSignIn(credential);
        setUser(user?.googleId);
        
    }

    

    return(
        <UserAuthContext.Provider value={{user,isAuthenticated:!!user,loading,login,logout,googleAuth}}>
            {children}
        </UserAuthContext.Provider>
    )
}

export const useUserContext=()=>{
    const context=useContext(UserAuthContext);
    if(!context)
    {
        throw new Error("useUserContext must be used inside UserAuthProvider")
    }
    return context;
}