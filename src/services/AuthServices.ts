import { UserRepository } from "../repositories/UserRepository.js";
import { TrainerRepository } from "../repositories/TrainerRepository.js";
import jwt from 'jsonwebtoken'
import bcrypt  from "bcryptjs";
import { EmailService } from "./EmailService.js";
import { OtpRepository } from "../repositories/OtpRepository.js";
import e from "express";
export class AuthService{
    private userRepository:UserRepository;
    private emailService:EmailService;
    private trainerRepository:TrainerRepository
    private otpRepository:OtpRepository;
    constructor()
    {

        this.userRepository=new UserRepository();
        this.emailService=new EmailService();
        this.trainerRepository=new TrainerRepository();
        this.otpRepository=new OtpRepository();

        
    }
    private generateToken(id:string,role:string)
    {
        return jwt.sign({id,role},process.env.JWT_SECRET||"",{expiresIn:"30d"})
    }

    private generateOtp()
    {
        return Math.floor(100000+Math.random()*900000).toString();
    }


    async registerUser(data:any)
    {
        const {firstName,lastName,email,password}=data;
        const userExists=await this.userRepository.findByEmail(email);
        if(userExists)
        {
            throw new Error("User already registered")
        }
        const hashpassword=await bcrypt.hash(password,10);

        const user=await this.userRepository.create({
            firstName,
            lastName,
            email,
            password:hashpassword
        });

        const otp=this.generateOtp();

        await this.otpRepository.createOtp(
            user._id as string,
            'user',
            email,
            otp,
            'email-verification'
        )

        await this.emailService.sendVerificationOtp(email,otp)
        console.log(`${otp}`);

        return{
            _id:user._id,
            email:user.email,
            role:user.role,
            token:this.generateToken(user._id as string,user.role)
        }
        
    }

    async verifyEmail(data:any)
    {
        const {email,otp}=data;
        const user=await this.userRepository.findByEmail(email);
        if(!user)
        {
            throw new Error("User not Found")
        }
        if(user.isEmailVerified)
        {
            throw new Error("Email already verified")
        }
        await this.otpRepository.verifyOtp(user._id as string,'email-verification',otp)
        

        

        user.isEmailVerified=true;
       

        await this.userRepository.save(user);

        await this.otpRepository.deleteOtp(
            user._id as string,
            'email-verification'
        )


        return {message:"Email Verified Successfully"}
    }

    async login(data:any)
    {
        const {email,password}=data;
        const user=await this.userRepository.findByEmail(email);
        if(!user)
        {
            throw new Error("User doesnt exists")
        }

        const comparePassword=await bcrypt.compare(password,user.password);
        if(!comparePassword)
        {
            throw new Error("password is not matched")
        }

        return{
            _id:user._id,
            email:user.email,
            role:user.role,
            token:this.generateToken(user._id,user.role)

        }


        return {message:""}

    }


    async forgetPassword(data:any)
    {
        const {email}=data;
        const user=await this.userRepository.findByEmail(email);
        if(!user)
        {
            throw new Error("Email doesnt exists")
        }

        const otp=this.generateOtp();
       await this.otpRepository.createOtp(
        user._id as string,
        'user',
        email,
        otp,
        'password-reset'
       )
        console.log(`${email} ${otp}`);
        
        // await this.userRepository.save(user);
        await this.emailService.sendPasswordResetOTP(email,otp);
        console.log(`reset Otp ${otp}`);
        
        return {message:"If the email exists password is send"}
    }


    async resetPassword(data:any)
    {
        const {email,otp,newPassword}=data;
        const user=await this.userRepository.findByEmail(email);
        if(!user)
        {
            throw new Error("Invalid Request")
        }

        await this.otpRepository.verifyOtp(
            user._id as string,
            'password-reset',
            otp
        )

        


        user.password=await bcrypt.hash(newPassword,10);
      

        await this.userRepository.save(user);

        await this.otpRepository.deleteOtp(
            user._id as string,
            'password-reset'
        )

        return {message:"Password Reset Successfully"}
    }


    async registerTrainer(data:any)
    {
        const {firstName,lastName,email,password,speciality}=data;
        const trainerExists=await this.trainerRepository.findByEmail(email);
        if(trainerExists)
        {
            throw new Error("Trainer already registered")
        }

        const passwordhash=await bcrypt.hash(password,10);

        const trainer=await this.trainerRepository.create({
            firstName,
            lastName,
            email,
            password:passwordhash,
            speciality

        })

        const otp=this.generateOtp();
        await this.otpRepository.createOtp(
            trainer._id as string,
            'trainer',
            email,
            otp,
            "email-verification"
        );

        await this.emailService.sendVerificationOtp(email,otp)
        console.log(`Trainer OTP ${otp}`);

        return {
            _id:trainer._id,
            email:trainer.email,
            speciality:trainer.speciality,
            token:this.generateToken(trainer._id as string,'trainer')
        }
        
    }

    async verifyTrainer(data:any)
    {
        const {email,otp}=data;
        const trainer=await this.trainerRepository.findByEmail(email);
        if(!trainer)
        {
            throw new Error("Trainer not found")
        }

        await this.otpRepository.verifyOtp(
            trainer._id as string,
            'email-verification',
            otp
        )

        trainer.isEmailVerified=true;
        await this.trainerRepository.save(trainer);

        await this.otpRepository.deleteOtp(
            trainer._id as string,'email-verification'
        )

        return {message:"Trainer Successfully"}
    }


    async loginTrainer(data:any)
    {
        const {email,password}=data;
        const trainer=await this.trainerRepository.findByEmail(email);
        if(!trainer)
        {
            throw new Error("Trainer doesnt exist")
        }

        const isMatch=await bcrypt.compare(password,trainer.password);
        if(!isMatch)
        {
            throw new Error("Password is not matched")



        }

        return {
            _id:trainer._id,
            firstName:trainer.firstName,
            lastName:trainer.lastName,
            email:trainer.email,
            speciality:trainer.speciality,
            token:this.generateToken(trainer._id ,'trainer'),
            message:"Trainer logged in successfully"
        }


    
    }
}

