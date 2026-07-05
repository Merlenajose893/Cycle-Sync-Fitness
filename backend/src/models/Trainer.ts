import mongoose, { Schema, Document } from "mongoose";

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

export interface ITrainer extends Document {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  speciality: string;
  isEmailVerified:boolean;
  isDeleted:boolean;
  avatar?: string;
  bio?: string;
  experience: string;
  onboardingCompleted:boolean;
  onboardingSteps:number;
  tags: string[];
  location: string;
  languages: string[];
  rating: number;
  reviews: number;
  sessionsCompleted: number;
  activeClients: number;
  isAvailable: boolean;
  featured: boolean;
  packages: ITrainerPackage[];
  certifications: ICertificate[];
  createdAt: Date;
  updatedAt: Date;
}

const TrainerSchema = new Schema<ITrainer>(
  {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true ,unique:true},
    password: { type: String, required: true },

    speciality: { type: String, required: true },
    isDeleted:{type:Boolean, required:false},

    avatar: { type: String },
    bio: { type: String },

    onboardingSteps:{type:Number,default:1},
    onboardingCompleted:{type:Boolean,default:false},
    experience: { type: String },

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

    tags: [{ type: String }],

    location: { type: String },

    languages: [{ type: String }],

    rating: { type: Number, default: 0 },
    reviews: { type: Number, default: 0 },
    sessionsCompleted: { type: Number, default: 0 },
    activeClients: { type: Number, default: 0 },

    isAvailable: { type: Boolean, default: false },
    featured: { type: Boolean, default: false },
  },
  {
    timestamps: true,
  }
);

export const TrainerModel = mongoose.model<ITrainer>(
  "Trainer",
  TrainerSchema
);