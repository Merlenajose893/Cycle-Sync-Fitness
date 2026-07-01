import { Schema, model, Types, Document } from "mongoose";
export const refreshToken = new Schema({
    tokenHash: {
        type: String,
        required: true
    },
    userId: {
        type: Schema.Types.ObjectId,
        required: true
    },
    userType: {
        type: String,
        enum: ["user", "trainer", "admin"],
        required: true
    },
    expiresAt: {
        type: Date,
        required: true
    }
}, { timestamps: true });
export const RefreshTokenModel = model("RefreshToken", refreshToken);
//# sourceMappingURL=RefreshToken.js.map