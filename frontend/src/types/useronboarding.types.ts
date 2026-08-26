export interface updateBodyDetailsDTO{
    height:number;
    weight:number;
    dateOfBirth:string | number | Date;
    biologicalSex:string;
}

export interface updateCycleSetUpDTO{
    averageCycleLength?:number;
    averagePeriodLength?:number;
    lastPeriodStart?:Date;
    birthControl?:string;
}

export interface updateGoalsDTO{
    primaryGoal?:|"weight_loss"|"muscle_gain"|"hormone_balance"|"general_health";
    targetWeight?:number;
    activityLevel?:|"sedentary"|"lightActive"|"moderatelyActive";
}

export interface useronboardingStatus{
     onboardingCompleted: boolean;
  onboardingStep: number;

  bodyDetails?: updateBodyDetailsDTO;

  cycleSetUp?: updateCycleSetUpDTO;

  goals?: updateGoalsDTO;
}

export interface AuthResponse<T>{
    success:boolean;
    message:string;
    data:T;
}

