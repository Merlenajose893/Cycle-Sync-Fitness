import {z} from "zod"
import { coerce } from "zod";
export const updateBodyDetailsSchema=z.object({
    height:z.coerce.number().positive("Height must be greater than 0").min(50,"Height must be atleast 50cm").max(300,"Height cannot be 300cm"),
    weight:z.coerce.number().positive("Weight must be greater than 0").min(20,"Weight msut be atleast 20kg").max(500,"Weight cannot exceed 500kg"),
    dateOfBirth:z.coerce.date(),
    biologicalSex:z.string().min(1,"Biological sex is required")
}).superRefine((data,ctx)=>{
    const today=new Date();
    if(data.dateOfBirth>today)
    {
        ctx.addIssue({
            code:z.ZodIssueCode.custom,
            message:"Date of birth cannot be in future",
            path:["dateOfBirth"]
        })
    }

    const age=today.getFullYear()-data.dateOfBirth.getFullYear();
    if(age<13)
    {
        ctx.addIssue({
            code:z.ZodIssueCode.custom,
            message:"User must be atleast 13 years old",
            path:["dateOfBirth"]
        })
    }
});
export const updateCycleSetupSchema=z.object({
    averageCycleLength:z.number().min(15,"Cycle length is too short").max(60,"Cycle Length is too long").optional(),
    averagePeriodLength:z.number().min(1,"Period length must be atleast be 1 day").max(15,"Period length cannot exceed 15 days").positive().optional(),
    lastPeriodStart:z.coerce.date(),
    birthControl:z.string().optional()
}).superRefine((data,ctx)=>{
    if(data.averageCycleLength && data.averagePeriodLength && data.averagePeriodLength>=data.averageCycleLength)
    {
        ctx.addIssue({
            code:z.ZodIssueCode.custom,
            message:"Period length cannot exceed cycle length",
            path:["averagePeriodLength"]
        })
    }
    if(data.lastPeriodStart>new Date())
    {
        ctx.addIssue({
            code:z.ZodIssueCode.custom,
            message:"Last period date cannot be in the future",
            path:["lastPeriodStart"]
        })
    }
})

export const updateGoalsSchema=z.object({
    primaryGoal:z.enum(["weight_loss","muscle_gain","hormone_balance","general_health"]).optional(),
    targetWeight:z.number().positive().optional(),
    activityLevel:z.enum(["sedentary","lightActive","moderatelyActive"]).optional()
}).superRefine((data,ctx)=>{


  if(
    data.primaryGoal === "weight_loss" &&
    !data.targetWeight
  ){
    ctx.addIssue({
      code:z.ZodIssueCode.custom,
      message:"Target weight is required for weight loss",
      path:["targetWeight"]
    });
  }


  if(
    data.primaryGoal === "weight_loss" &&
    data.targetWeight &&
    data.targetWeight >= data.currentWeight
  ){

    ctx.addIssue({
      code:z.ZodIssueCode.custom,
      message:"Target weight must be lower than current weight",
      path:["targetWeight"]
    });

  }



  if(
    data.primaryGoal === "muscle_gain" &&
    data.targetWeight &&
    data.targetWeight <= data.currentWeight
  ){

    ctx.addIssue({
      code:z.ZodIssueCode.custom,
      message:"Target weight must be higher than current weight",
      path:["targetWeight"]
    });

  }

});