import type { Request,Response } from "express";
import { AuthService } from "../services/AuthServices.js";
import { rmSync } from "node:fs";
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

    loginUser=async (req:Request,res:Response) => {
        try {
           const results= await this.authService.login(req.body);
           console.log(results);
           
           res.status(200).json(results) 
        } catch (error) {
            console.log(error);
            
        }
    }


    forgetPassword=async (req:Request,res:Response) => {
        try {
            const result=await this.authService.forgetPassword(req.body);
            res.status(200).json(result)
        } catch (error) {
            console.log(error);
            res.status(500).json(error)
        }
    }


    resetPassword=async (req:Request,res:Response) => {
        try {
            const results=await this.authService.resetPassword(req.body);
            console.log(results);
            
            res.status(200).json(results);

        } catch (error) {
            console.log(error);
            res.status(500).json(error)
        }
    }


    registerTrainer=async (req:Request,res:Response) => {
        try {
            const results=await this.authService.registerTrainer(req.body);
            res.status(201).json(results)
        } catch (error) {
            console.log(error);
            res.status(500).json(error)
            
        }
    }

    loginTrainer=async (req:Request,res:Response) => {
        try {
           const results=await this.authService.loginTrainer(req.body) 
           console.log(results);
           res.status(200).json(results)
           
        } catch (error) {
            console.log(error);
            res.status(500).json(error)
            
        }
    }

    verifyTrainer=async (req:Request,res:Response) => {
        try {
            const result=this.authService.verifyTrainer(req.body);
            res.status(200).json(result);
        } catch (error) {
            console.log(error);
            res.status(500).json(error)
            
        }
    }
}