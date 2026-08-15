import mongoose, { Schema, Document } from "mongoose";
import { TrainerStatus } from "../constants/TrainerStatus.js";
const TrainerSchema = new Schema({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: false },
    speciality: { type: String, required: true },
    isDeleted: { type: Boolean, required: false },
    avatar: { type: String },
    status: { type: String, enum: Object.values(TrainerStatus), default: TrainerStatus.REGISTERED },
    inviteToken: { type: String, default: null },
    inviteExpiresAt: { type: Date, default: null },
    inviteAccepted: { type: Boolean, default: false },
    rejectionReason: { type: String, default: null },
    avatarPublicId: { type: String },
    bio: { type: String },
    onboardingSteps: { type: Number, default: 1 },
    onboardingCompleted: { type: Boolean, default: false },
    experience: { type: String, default: "0" },
    packages: [
        {
            name: { type: String, required: true },
            sessions: { type: Number, required: true },
            duration: { type: String, required: true },
            price: { type: Number, required: true },
            popular: { type: Boolean, default: false },
        },
    ],
    certifications: [
        {
            title: { type: String, required: true },
            issuedBy: { type: String, required: true },
            year: { type: String, required: true },
        },
    ],
    documents: [
        {
            type: { type: String, enum: ['ID', 'CERTIFICATE'], required: true },
            url: { type: String, required: true },
            name: { type: String }
        }
    ],
    tags: [{ type: String }],
    location: { type: String },
    languages: [{ type: String }],
    rating: { type: Number, default: 0 },
    reviews: { type: Number, default: 0 },
    sessionsCompleted: { type: Number, default: 0 },
    activeClients: { type: Number, default: 0 },
    isAvailable: { type: Boolean, default: false },
    featured: { type: Boolean, default: false },
}, {
    timestamps: true,
});
export const TrainerModel = mongoose.model("Trainer", TrainerSchema);
//# sourceMappingURL=Trainer.js.map