import mongoose, { Document } from "mongoose";
import { TrainerStatus } from "../constants/TrainerStatus.js";
export interface ITrainerPackage {
    name: string;
    sessions: number;
    duration: string;
    price: number;
    popular?: boolean;
}
export interface ICertificate {
    title: string;
    issuedBy: string;
    year: string;
}
export interface IDocument {
    type: 'ID' | 'CERTIFICATE';
    url: string;
    name?: string;
}
export interface ITrainer extends Document {
    firstName: string;
    lastName: string;
    email: string;
    password?: string;
    speciality: string;
    isEmailVerified: boolean;
    isDeleted: boolean;
    avatar?: string;
    status: TrainerStatus;
    inviteToken?: string | null;
    inviteExpiresAt?: Date | null;
    inviteAccepted?: boolean;
    rejectionReason?: string | null;
    avatarPublicId?: string;
    bio?: string;
    experience: string;
    onboardingCompleted: boolean;
    onboardingSteps: number;
    tags: string[];
    location?: string;
    languages: string[];
    rating: number;
    reviews: number;
    sessionsCompleted: number;
    activeClients: number;
    isAvailable: boolean;
    featured: boolean;
    packages: ITrainerPackage[];
    certifications: ICertificate[];
    documents?: IDocument[];
    createdAt: Date;
    updatedAt: Date;
}
export declare const TrainerModel: mongoose.Model<ITrainer, {}, {}, {}, mongoose.Document<unknown, {}, ITrainer, {}, mongoose.DefaultSchemaOptions> & ITrainer & Required<{
    _id: mongoose.Types.ObjectId;
}> & {
    __v: number;
} & {
    id: string;
}, any, ITrainer>;
//# sourceMappingURL=Trainer.d.ts.map