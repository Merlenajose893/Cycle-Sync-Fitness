export interface BodyDetails {
  height: number;
  weight: number;
  dateOfBirth: string;
  biologicalSex: string;
}

export interface CycleSetUp {
  averageCycleLength?: number;
  averagePeriodLength?: number;
  lastPeriodStart?: string;
  birthControl?: string;
}

export interface Goals {
  primaryGoal?:
    | "weight_loss"
    | "muscle_gain"
    | "hormone_balance"
    | "general_health";

  targetWeight?: number;

  activityLevel?:
    | "sedentary"
    | "lightActive"
    | "moderatelyActive";
}

export interface Subscription {
  status: "active" | "inactive" | "trialing" | "canceled";

  planId?: string;

  currentPeriodEnd?: string;
}

export interface UserProfile {
  id: string;

  firstName: string;
  lastName: string;
  email: string;

  avatarUrl?: string;
  bio?: string;

  onboardingStep: number;
  onboardingComplete: boolean;

  bodyDetails?: BodyDetails;

  cycleSetUp?: CycleSetUp;

  goals?: Goals;

  subscription?: Subscription;

  createdAt: string;
  updatedAt: string;
}

export interface UpdateUserProfileDTO {
  firstName?: string;
  lastName?: string;
  bio?: string;

  bodyDetails?: BodyDetails;

  cycleSetUp?: CycleSetUp;

  goals?: Goals;
}

export interface ChangePasswordDTO {
  currentPassword: string;
  newPassword: string;
}
export interface DeleteAccountDTO {
  password: string;
}