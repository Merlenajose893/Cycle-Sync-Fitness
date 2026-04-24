import { UserRepository } from "../repositories/UserRepository.js";
import jwt from 'jsonwebtoken'
import bcrypt  from "bcryptjs";
export class AuthService{
    private userRepository:UserRepository;
    constructor()
    {

        this.userRepository=new UserRepository();
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
     const {firstName,lastName,email,password}   =data;
     const userExists=await this.userRepository.findByEmail(email);
     if(userExists)
     {
        throw new Error("User already exists")
     }

     const otpGenerate=this.generateOtp();
     const otpExpires=new Date(Date.now()+10*60*1000)
     const hashPassword=await bcrypt.hash(password,10);
     const user=await this.userRepository.create(
        {
            firstName,
            lastName,
            email,
            password:hashPassword,
            otpVerification:otpGenerate,
            otpExpires:otpExpires
        }
     )

     console.log(`${otpGenerate}`);


     return {
        _id:user._id,
        firstName:user.firstName,
        lastName:user.lastName,
        email:user.email,
        otp:user.otpVerification,
        password:user.password,
        token:this.generateToken(user._id, user.role)
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
        if(!user.otpVerification||!user.otpExpires)
        {
            throw new Error("No Otp Expires")
        }

        if(user.otpExpires<new Date())
        {
            throw new Error("OTP expired")
        }

        if(otp!==user.otpVerification)
        {
            throw new Error("Invalid Otp")
        }

        user.isEmailVerified=true;
        user.otpVerification=null;
        user.otpExpires=null;

        await this.userRepository.save(user);


        return {message:"Email Verified Successfully"}
    }
}

