import nodemailer from 'nodemailer'
export class EmailService{
    private transporter;
    constructor(){
        console.log(process.env.EMAIL_USER,process.env.EMAIL_PASS);
        
        if(!process.env.EMAIL_USER||!process.env.EMAIL_PASS)
        {
            throw new Error("Invalid Email Configuration")
        }

        this.transporter=nodemailer.createTransport({
            host:process.env.EMAIL_HOST,
            port:Number(process.env.EMAIL_PORT),
            secure:true,
            auth:{
                user:process.env.EMAIL_USER,
                pass:process.env.EMAIL_PASS
            },

        })
    }

    async sendVerificationOtp(to:string,otp:string):Promise<void>{
        await this.transporter.sendMail({
            from: `"CycleSyncAI" <${process.env.EMAIL_USER}>`,
            to,
            subject:"Verify Your Email",
            html:` <h2>Welcome to CycleSync AI</h2>
        <p>Your verification OTP is:</p>
        <h1>${otp}</h1>
        <p>This OTP expires in 15 minutes.</p>`,
        })
    }


    async sendPasswordResetOTP(to:string,otp:string):Promise<void>{
        await this.transporter.sendMail({
            from :`"CycleSyncAI"<${process.env.EMAIL_USER}>`,
            to,
            subject:"Reset Your Password",
            html:`
             <h2>Password Reset</h2>
        <p>Your OTP is:</p>
        <h1>${otp}</h1>
        <p>This OTP expires in 15 minutes.</p>
            `,
        })
    }
}