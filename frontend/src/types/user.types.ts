export type Role='user'|'admin';

export interface BodyDetails{
    height?:number;
    weight?:number;
    dateOfBirth?:Date;
    biologicalSex?:string;
}

export interface CycleSetUp{
    averageCycleLength?:number;
    averagePeriodLength?:number;
    lastPeriodStart?:Date;
    birthControl?:string;

}

export type PrimaryGoal=|'weight_loss'|'muscle_gain'|'hormone_balance'|'general_health';
export type ActivityLevel=|'sedentary'|'lightActive'|'moderatelyActive';

export interface Goals{
    primaryGoal?:PrimaryGoal;
    targetWeight?:number;
    activityLevel?:ActivityLevel;
}

export interface Subscription{
    status:'active'|'inactive'|'trailing'|'canceled';
    planId?:string;
    currentPeriodEnd?:Date;
}

export interface User{
    _id :string;
    firstName:string;
    lastName:string;
    email:string;
    role:Role;
    avatarUrl?:string;
    isEmailVerified:boolean;
    onboardingComplete:boolean;
    bodyDetails?:BodyDetails;
    cycleSetUp?:CycleSetUp;
    goals?:Goals;
    subscription?:Subscription;
    createdAt:string;
    updatedAt:string;

}