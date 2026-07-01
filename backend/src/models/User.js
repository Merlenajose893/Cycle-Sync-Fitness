import mongoose from "mongoose";
const userSchema = new mongoose.Schema({
    firstName: {
        type: String, required: true
    },
    lastName: {
        type: String, required: true
    },
    email: {
        type: String, required: true
    },
    password: {
        type: String, required: true
    },
    role: {
        type: String, enum: ['user', 'admin'], default: 'user'
    },
    avatarUrl: {
        type: String
    },
    isEmailVerified: {
        type: Boolean,
        default: false
    },
    onboardingComplete: {
        type: Boolean,
        default: false
    },
    onboardingStep: {
        type: Number
    },
    bodyDetails: {
        height: { type: Number },
        weight: { type: Number },
        dateOfBirth: { type: Date },
        biologicalSex: { type: String }
    },
    cycleSetUp: {
        averageCycleLength: { type: Number },
        averagePeriodLength: { type: Number },
        lastPeriodStart: { type: Date },
        birthControl: { type: String }
    },
    goals: {
        primaryGoal: {
            type: String, enum: ['weight_loss', 'muscle_gain', 'hormone_balance', 'general_health'],
            default: 'general_health'
        },
        targetWeight: { type: Number },
        activityLevel: {
            type: String,
            enum: ['sedentary', 'lightActive', 'moderatelyActive'],
            default: 'lightActive'
        }
    },
    subscription: {
        status: {
            type: String,
            enum: ['active', 'inactive', 'trainling', 'cancelled'], default: 'inactive'
        },
        planId: {
            type: String
        },
        currentPeriodEnd: {
            type: Date
        },
    }
});
export const UserModel = mongoose.model('User', userSchema);
//# sourceMappingURL=User.js.map