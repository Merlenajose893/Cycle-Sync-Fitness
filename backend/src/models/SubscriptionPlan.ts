import mongoose,{Schema,Document} from "mongoose";
export interface ISubscriptionPlan extends Document{
    name:string;
    code:string;
    tier:"basic"|"premium"|"elite";
    price:number;
    currency:string;
    billingCycle:"monthly"|"annual";
    stripeProductId:string;
    stripePriceId:string;
    features:{
        aiPlanGeneration: boolean;
    unlimitedFoodTracking: boolean;
    trainerMatching: boolean;
    cycleSyncInsights: boolean;
    maxDailyFoodLogs: number;
    };
    isActive:boolean;
    createdAt:Date;
    updatedAt:Date;

}

const subscriptionPlan=new Schema<ISubscriptionPlan>({
    name:{
        type:String,
        required:true
    },
    code:{
        type:String,
        required:true,
        uppercase:true
    },
    tier:{
        type:String,
        enum:["basic","premium","elite"],
        required:true
    },
    price:{
        type:Number,
        required:true,
        min:0
    },
    currency:{
        type:String,
        default:"INR",
        uppercase:true
    },
    billingCycle:{
        type:String,
        enum:["annual","monthly"],
        required:true

    },
    stripeProductId:{
        type:String,
        required:true
    },
    stripePriceId:{
        type:String,
        required:true
    },
    features:{
        aiPlanGeneration:{
            type:Boolean,
            default:false
        },
        unlimitedFoodTracking:{
            type:Boolean,
            default:false
        },
        trainerMatching:{
            type:Boolean,
            default:false

        },
        cycleSyncInsights:{
            type:Boolean,
            default:false
        },
        maxDailyFoodLogs:{
            type:Number,
            default:5,
            min:0
        },
        isActive:{
            type:Boolean,
            default:true
        }
    }
},{timestamps:true})

export const SubscriptionPlan=mongoose.model<ISubscriptionPlan>("SubscriptionPlan",subscriptionPlan)