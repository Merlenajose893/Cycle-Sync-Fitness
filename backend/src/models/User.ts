import mongoose from "mongoose";
import type { Document } from "mongoose";
export interface IUser extends Document{
    firstName :string;
    lastName:string;
    email:string;
    password?:string;
    role:'user'|'admin'
    avatarUrl?:string
    isEmailVerified:boolean;
    googleId?:string;
    onboardingStep:number;
    onboardingComplete:boolean


    bodyDetails?:{
        height:number;
        weight:number;
        dateOfBirth:Date;
        biologicalSex:string;
    };

    cycleSetUp?:{
        averageCycleLength?:number;
        averagePeriodLength?:number;
        lastPeriodStart?:Date;
        birthControl?:string;
    }

    goals?:{
        primaryGoal?:'weight_loss'|'muscle_gain'|'hormone_balance'|'general_health';
        targetWeight?:number;
        activityLevel?:'sedentary'|'lightActive'|'moderatelyActive';
    }

    subscription?:{
        status:'active'|'inactive'|'trialing'|'canceled';
        planId?:string;
        currentPeriodEnd?:Date;
    }

isDeleted:boolean;

    createdAt:Date;
    updatedAt:Date;
}


const userSchema=new mongoose.Schema<IUser>({
firstName:{
    type:String,required:true
},
lastName:{
    type:String,required:true
},
email:{
    type:String,required:true
},
password:{
    type:String,required:false
},
googleId:{
type:String,required:false
},
role:{
    type:String ,enum:['user','admin'],default:'user'
},
avatarUrl:{
    type:String
},
isEmailVerified:{
    type:Boolean,
    default:false
},


onboardingComplete:{
    type:Boolean,
    default:false
},

onboardingStep:{
    type:Number
},

bodyDetails:{
    height:{type:Number},
    weight:{type:Number},
    dateOfBirth:{type:Date},
    biologicalSex:{type:String}
},
cycleSetUp:{
    averageCycleLength:{type:Number},
    averagePeriodLength:{type:Number},
    lastPeriodStart:{type:Date},
    birthControl:{type:String}
},
goals:{
    primaryGoal:{
        type:String,enum:['weight_loss','muscle_gain','hormone_balance','general_health'],
        default:'general_health'
    },
    targetWeight:{type:Number},
    activityLevel:{
        type:String,
        enum:['sedentary','lightActive','moderatelyActive'],
        default:'lightActive'
    }
},
subscription:{
    status:{
        type:String,
        enum:['active','inactive','trainling','cancelled'],default:'inactive'
    },
    planId:{
        type:String
    },
    currentPeriodEnd:{
        type:Date
    },
     
}

},{timestamps:true})


console.log("hello");



export const UserModel = mongoose.model<IUser>('User', userSchema);