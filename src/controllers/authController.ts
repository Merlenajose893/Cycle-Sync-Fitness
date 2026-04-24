import type { Request,Response } from "express";
import { AuthService } from "../services/AuthServices.js";
export class AuthController{
    private authService:AuthService;

    constructor()
    {
        this.authService=new AuthService();
    }

    registerUser=async (req:Request,res:Response) => {
        try {
            const results=await this.authService.registerUser(req.body);
            res.status(201).json(results)
        } catch (error:any) {
            console.log(error);
            
            if(error.message==="User already Exists")
            {
                res.status(400).json({message:error.message})

            }
            else{
                res.status(500).json({message:error.message})
            }
        }
    }


    verifyEmail=async (req:Request,res:Response) => {
        try {
            const results=await this.authService.verifyEmail(req.body);
            res.status(200).json(results)

        } catch (error:any) {
            console.log(error);
            res.status(500).json(error)
            
        }
    }
}