import mongoose, { Document } from "mongoose";
export type OtpType = 'email-verification' | 'password-reset';
export type UserType = 'user' | 'trainer';
export interface IOtp extends Document {
    userId: mongoose.Types.ObjectId;
    userType: UserType;
    email: string;
    otp: string;
    type: OtpType;
    createdAt: Date;
    expiresAt: Date;
}
export declare const otpModel: mongoose.Model<IOtp, {}, {}, {}, mongoose.Document<unknown, {}, IOtp, {}, mongoose.DefaultSchemaOptions> & IOtp & Required<{
    _id: mongoose.Types.ObjectId;
}> & {
    __v: number;
} & {
    id: string;
}, any, IOtp>;
//# sourceMappingURL=Otp.d.ts.map