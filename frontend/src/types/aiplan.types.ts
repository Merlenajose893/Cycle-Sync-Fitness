/* ── Enums (mirrors backend constants/aiPlan.ts) ── */

export enum PlanStatus {
    DRAFT = "DRAFT",
    ACTIVE = "ACTIVE",
    ARCHIVED = "ARCHIVED",
}

export enum Goal {
    WEIGHT_LOSS = "WEIGHT_LOSS",
    MUSCLE_GAIN = "MUSCLE_GAIN",
    ENDURANCE = "ENDURANCE",
    GENERAL_FITNESS = "GENERAL_FITNESS",
}

export enum FitnessLevel {
    BEGINNER = "BEGINNER",
    INTERMEDIATE = "INTERMEDIATE",
    ADVANCED = "ADVANCED",
}

export enum DietPreference {
    NO_RESTRICTION = "NO_RESTRICTION",
    VEGETARIAN = "VEGETARIAN",
    VEGAN = "VEGAN",
    KETO = "KETO",
    PALEO = "PALEO",
}

export enum WorkoutType {
    PUSH = "PUSH",
    PULL = "PULL",
    LEGS = "LEGS",
    UPPER_BODY = "UPPER_BODY",
    LOWER_BODY = "LOWER_BODY",
    FULL_BODY = "FULL_BODY",
    CARDIO = "CARDIO",
    HIIT = "HIIT",
    CORE = "CORE",
    YOGA = "YOGA",
    REST = "REST",
}

export enum MealType {
    BREAKFAST = "BREAKFAST",
    MORNING_SNACK = "MORNING_SNACK",
    LUNCH = "LUNCH",
    EVENING_SNACK = "EVENING_SNACK",
    DINNER = "DINNER",
}

export enum WeekDay {
    MONDAY = "MONDAY",
    TUESDAY = "TUESDAY",
    WEDNESDAY = "WEDNESDAY",
    THURSDAY = "THURSDAY",
    FRIDAY = "FRIDAY",
    SATURDAY = "SATURDAY",
    SUNDAY = "SUNDAY",
}

/* ── Interfaces (mirrors backend models/AIPlan.ts) ── */

export interface AIPlanInputs {
    goal: Goal;
    fitnessLevel: FitnessLevel;
    daysPerWeek: number;
    dietPreference: DietPreference;
}

export interface PlanSummary {
    dailyCalories: number;
    protein: number;
    carbs: number;
    fat: number;
    waterIntake: number;
    sleepHours: number;
}

export interface Warmup {
    title: string;
    description: string;
    duration: number;
}

export interface Cooldown {
    title: string;
    description: string;
    duration: number;
}

export interface Exercise {
    name: string;
    muscleGroup: string;
    workoutType: WorkoutType;
    sets: number;
    reps: string;
    rest: number;
    tip?: string;
}

export interface WorkoutDay {
    day: WeekDay;
    title: string;
    duration: number;
    warmup: Warmup;
    exercises: Exercise[];
    cooldown: Cooldown;
}

export interface Meal {
    mealType: MealType;
    name: string;
    calories: number;
    protein: number;
    carbs: number;
    fat: number;
    ingredients: string[];
    notes?: string;
}

export interface MealDay {
    day: WeekDay;
    meals: Meal[];
}

export interface Recommendation {
    recovery: string;
    supplements?: string[];
    cycleAdvice?: string;
    notes?: string;
}

export interface AIPlan {
    _id: string;
    userId: string;
    status: PlanStatus;
    inputs: AIPlanInputs;
    summary: PlanSummary;
    workoutPlan: WorkoutDay[];
    mealPlan: MealDay[];
    recommendations: Recommendation;
    createdAt: string;
    updatedAt: string;
}
