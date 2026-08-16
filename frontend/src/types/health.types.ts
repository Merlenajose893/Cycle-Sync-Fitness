export enum FlowIntensity {
  LIGHT = 'LIGHT',
  MEDIUM = 'MEDIUM',
  HEAVY = 'HEAVY',
  SPOTTING = 'SPOTTING'
}

export enum Mood {
  HAPPY = 'happy',
  CALM = 'calm',
  ENERGETIC = 'energetic',
  ANXIOUS = 'anxious',
  SAD = 'sad',
  IRRITABLE = 'irritable',
  FATIGUED = 'fatigued',
  MOODY = 'moody'
}

export enum PhysicalSymptom {
  CRAMPS = 'cramps',
  BLOATING = 'bloating',
  HEADACHE = 'headache',
  BREAST_TENDERNESS = 'breast_tenderness',
  ACNE = 'acne',
  BACKACHE = 'backache',
  NAUSEA = 'nausea',
  CRAVINGS = 'cravings'
}

export enum CyclePhase {
  MENSTRUAL = 'menstrual',
  FOLLICULAR = 'follicular',
  OVULATORY = 'ovulatory',
  LUTEAL = 'luteal'
}

export interface CycleLog {
  _id: string;
  userId: string;
  startDate: string;
  endDate?: string;
  flowIntensity: FlowIntensity;
  notes?: string;
}

export interface BodyMeasurements {
  waistCm?: number;
  hipsCm?: number;
  chestCm?: number;
  thighsCm?: number;
  armsCm?: number;
}

export interface DailyHealthLog {
  _id?: string;
  userId?: string;
  date: string;
  waterIntakeMl: number;
  waterTargetMl: number;
  weightKg?: number;
  bodyMeasurements?: BodyMeasurements;
  energyLevel?: number;
  moods?: Mood[];
  physicalSymptoms?: PhysicalSymptom[];
  notes?: string;
}

export interface CyclePrediction {
  currentPhase: CyclePhase;
  currentCycleDay: number;
  averageCycleLength: number;
  nextPeriodStartDate: string;
  nextPeriodEndDate: string;
  fertileWindowStart: string;
  fertileWindowEnd: string;
  ovulationDate: string;
}

export interface HealthMilestone {
  _id: string;
  milestoneType: string;
  title: string;
  description: string;
  badgeIcon: string;
  achievedAt: string;
}

export interface StartPeriodDTO {
  startDate: string;
  flowIntensity: FlowIntensity;
  notes?: string;
}

export interface EndPeriodDTO {
  endDate: string;
  flowIntensity?: FlowIntensity;
  notes?: string;
}

export interface CreateHealthLogDTO {
  date: string;
  waterIntakeMl?: number;
  waterTargetMl?: number;
  weightKg?: number;
  bodyMeasurements?: BodyMeasurements;
  energyLevel?: number;
  moods?: Mood[];
  physicalSymptoms?: PhysicalSymptom[];
  notes?: string;
}
