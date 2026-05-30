import {email, z} from "zod";

export const registerUserSchema=z.object({
    firstName:z.string().min(2),
    lastName:z.string().min(1),
    email:z.string().email(),
    password:z.string().min(6)
})

export const loginSchema=z.object({
    email:z.string().email(),
    password:z.string().min(6)
})

export const verifyOtpSchema=z.object({
    userId:z.string(),
    otp:z.string().length(6)
})