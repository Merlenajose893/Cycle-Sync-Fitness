import mongoose from "mongoose";
import type { Document } from "mongoose";
export interface IUser extends Document {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    role: 'user' | 'admin';
    avatarUrl?: string;
    isEmailVerified: boolean;
    onboardingComplete: boolean;
    onboardingStep: number;
    bodyDetails?: {
        height: number;
        weight: number;
        dateOfBirth: Date;
        biologicalSex: string;
    };
    cycleSetUp?: {
        averageCycleLength?: number;
        averagePeriodLength?: number;
        lastPeriodStart?: Date;
        birthControl?: string;
    };
    goals?: {
        primaryGoal?: 'weight_loss' | 'muscle_gain' | 'hormone_balance' | 'general_health';
        targetWeight?: number;
        activityLevel?: 'sedentary' | 'lightActive' | 'moderatelyActive';
    };
    subscription?: {
        status: 'active' | 'inactive' | 'trialing' | 'canceled';
        planId?: string;
        currentPeriodEnd?: Date;
    };
    createdAt: Date;
    updatedAt: Date;
}
export declare const UserModel: mongoose.Model<IUser, {}, {}, {}, mongoose.Document<unknown, {}, IUser, {}, mongoose.DefaultSchemaOptions> & IUser & Required<{
    _id: mongoose.Types.ObjectId;
}> & {
    __v: number;
} & {
    id: string;
}, any, IUser>;
//# sourceMappingURL=User.d.ts.map