import { useState } from "react";
import axios from "axios";
import {train}
import type { UpdateTrainerProfileDTO,UpdateTrainerCertificateDTO,UpdateTrainerPackageDTO,TrainerOnboardingStatus ,CertificateItems,PackageItem} from "../../types/traineronboarding.types";
export const useTrainerOnboarding=()=>{
    const [loading,setLoading]=useState(true);
    const [error,setError]=useState<string|null>(null)
    const getOnboardingStatus=async ():Promise<TrainerOnboardingStatus> => {
        try {
            setLoading(true);
            setError(null)

            const response=await 
        } catch (error) {
            
        }
        finally{

        }
    }
    const updateProfile=async (params:type) => {
        
    }

    const updateCertifications=async (params:type) => {
        
    }
    const updatePackages=async (params:type) => {
        
    }

    const completeOnboarding=async (params:type) => {
        
    }

    
}