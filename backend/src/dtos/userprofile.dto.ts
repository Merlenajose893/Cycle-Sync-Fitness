export interface UpdateUserProfileDTO{
    firstName?:string;
    lastName?:string;
    avatarUrl?:string;
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
    };

     goals?:{
        primaryGoal?:'weight_loss'|'muscle_gain'|'hormone_balance'|'general_health';
        targetWeight?:number;
        activityLevel?:'sedentary'|'lightActive'|'moderatelyActive';
    };
}