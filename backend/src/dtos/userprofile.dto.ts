export interface UpdateUserProfileDTO{
    firstName?:string;
    lastName?:string;
    bio?:string;
    avatarUrl?:string;
    avatarPublicId?:string;
    bodyDetails?:{
        height?:number;
        weight?:number;
        dateOfBirth?:Date;
        biologicalSex?:string;
    };
    cycleSetUp?:{
        averageCycleLength?:number;
        averagePeriodLength?:number;
        lastPeriodStart?:Date;
        birthControl?:string;
    };

     goals?:{
        primaryGoal?:'weight_loss'|'muscle_gain'|'hormone_balance'|'general_health';
        targetWeight?:number;
        activityLevel?:'sedentary'|'lightActive'|'moderatelyActive';
    };
}

export interface UserProfileResponseDTO {
  id: string;

  firstName: string;
  lastName: string;
  email: string;

  avatarUrl?: string;
  bio?: string;

  onboardingStep: number;
  onboardingComplete: boolean;

  bodyDetails?: {
    height?: number;
    weight?: number;
    dateOfBirth?: Date;
    biologicalSex?: string;
  };

  cycleSetUp?: {
    averageCycleLength?: number;
    averagePeriodLength?: number;
    lastPeriodStart?: Date;
    birthControl?: string;
  };

  goals?: {
    primaryGoal?: "weight_loss" | "muscle_gain" | "hormone_balance" | "general_health";
    targetWeight?: number;
    activityLevel?: "sedentary" | "lightActive" | "moderatelyActive";
  };

  subscription?: {
    status: "active" | "inactive" | "trialing" | "canceled";
    planId?: string;
    currentPeriodEnd?: Date;
  };

  createdAt: Date;
  updatedAt: Date;
}

export interface ChangePassword{
currentPassword:string;
newPassword:string;
}

export interface DeleteAccount{
    password:string;
}