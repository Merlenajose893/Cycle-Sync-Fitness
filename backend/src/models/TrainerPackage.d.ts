import mongoose, { Types, Document } from "mongoose";
export interface ITrainerPackage extends Document {
    trainerId: Types.ObjectId;
    packageName: string;
    description: string;
    durationDays: number;
    price: number;
    features: string[];
    maxClients?: number;
    isActive: boolean;
    createdAt: Date;
    updatedAt: Date;
}
export declare const TrainerPackage: mongoose.Model<ITrainerPackage, {}, {}, {}, mongoose.Document<unknown, {}, ITrainerPackage, {}, mongoose.DefaultSchemaOptions> & ITrainerPackage & Required<{
    _id: Types.ObjectId;
}> & {
    __v: number;
} & {
    id: string;
}, any, ITrainerPackage>;
//# sourceMappingURL=TrainerPackage.d.ts.map