import { Children, createContext, useContext, useEffect, useState, type ReactNode } from "react"
import { useUserAuth } from "../hooks/auth/useUserAuth"
import type { User } from "../types/auth.types"
interface UserAuthContextType{
    user:User|null;
    isAuthenticated:boolean;
    loading:boolean;
    login:(user:User)=>void;
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
    const {getUser,logoutUser}=useUserAuth();
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

    useEffect(() => {
  if (!user) return;

  const interval = setInterval(async () => {
    try {
      await getUser();
    } catch (error) {
      // The interceptor will handle ACCOUNT_BLOCKED.
      // Ignore the error here.
    }
  }, 15000); // Check every 15 seconds

  return () => clearInterval(interval);
}, [user]);

    return(
        <UserAuthContext.Provider value={{user,isAuthenticated:!!user,loading,login,logout}}>
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