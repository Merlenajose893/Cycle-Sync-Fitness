import mongoose, { Schema, Document } from "mongoose";
const OtpSchema = new mongoose.Schema({
    userId: {
        type: Schema.Types.ObjectId, required: true
    },
    userType: {
        type: String, enum: ['user', 'trainer'], required: true
    },
    email: {
        type: String, required: true
    },
    otp: {
        type: String, required: true
    },
    type: {
        type: String, enum: ['email-verification', 'password-reset'], required: true
    },
    expiresAt: {
        type: Date, required: true
    }
}, { timestamps: true });
export const otpModel = mongoose.model('Otp', OtpSchema);
//# sourceMappingURL=Otp.js.map