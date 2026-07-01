import type { Request,Response } from "express";
import { Onboardingservice } from "../services/OnboardingServices.js";

export class OnboardingController{
    private onbaordingService:Onboardingservice
    constructor()
    {
        this.onbaordingService=new Onboardingservice();

    }

    updateBodyDetails=async (req:Request,res:Response) => {
        try {
            const userId=req.params.userId;
            const result=await this.onbaordingService.updateBodyDetails(userId,req.body);
            res.status(200).json(result)
        } catch (error) {
            console.log(error);
            
            res.status(500).json(error)
        }
    }

    updateCycleDetails=async (req:Request,res:Response) => {
        try {
            const userId=req.params.userId;
            const result=await this.onbaordingService.updateCycleDetails(userId,req.body);
            res.status(200).json(result);
        } catch (error) {
            console.log(error);
            
            res.status(500).json(error)
        }
    }

    updateGoals=async (req:Request,res:Response) => {
        try {
            const userId=req.params.userId;
            const results=await this.onbaordingService.updateGoals(userId,req.body);
            res.status(200).json(results);
        } catch (error) {
            console.log(error);
            res.status(500).json(error)
        }
    }

    onboardingComplete=async (req:Request,res:Response) => {
        try {
            const userId =req.params.userId;
            const result=await this.onbaordingService.onboardingComplete(userId);
            res.status(200).json(result)
        } catch (error) {
            res.status(500).json(error)
            console.log(error);
            
        }
    }

    
}