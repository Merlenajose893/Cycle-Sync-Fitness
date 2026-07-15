import { createContext,useContext,useEffect,useState, type ReactNode } from "react";
import { useTrainerAuth } from "../hooks/auth/useTrainerAuth";
import type { Trainer } from "../types/auth.types";
interface TrainerAuthContextType{
    trainer:Trainer|null;
    isAuthenticated:boolean;
    loading:boolean;
    login:(trainer:Trainer)=>void;
    logout:()=>Promise<void>
}

const TrainerAuthContext=createContext<TrainerAuthContextType|null>(null);
interface TrainerAuthProviderProps{
    children:ReactNode
}

export const TrainerAuthprovider=({
    children,
}:TrainerAuthProviderProps)=>{
const [trainer,setTrainer]=useState<Trainer|null>(null);
const [loading,setLoading]=useState(true);
const {getCurrentTrainer,logoutTrainer}=useTrainerAuth();
useEffect(()=>{
    const restoreSession=async () => {
        try {
            const currentTrainer=await getCurrentTrainer();
            if(currentTrainer)
            {
                setTrainer(currentTrainer);
            }
        } catch (error) {
            console.log(error);
            
        }
        finally{
            setLoading(false)
        }
    restoreSession();

    const handleBlocked = async () => {
        await logoutTrainer();
        setTrainer(null);
        window.location.href = "/trainer/login?blocked=true";
    };
    window.addEventListener("auth-blocked", handleBlocked);

    return () => {
        window.removeEventListener("auth-blocked", handleBlocked);
    };
},[]);

const login=(trainerData:Trainer)=>{
    setTrainer(trainerData);
}
const logout=async () => {
    await logoutTrainer();
    setTrainer(null);
}

return (
    <TrainerAuthContext.Provider value={{trainer,isAuthenticated:!!trainer,loading,login,logout}}>
        {children}
    </TrainerAuthContext.Provider>
)
};

export const useTrainerContext=()=>{
    const context=useContext(TrainerAuthContext);
    if(!context)
    {
        throw new Error("useTrainerContext must be inside TrainerAuthProvider")
    }

    return context;
}