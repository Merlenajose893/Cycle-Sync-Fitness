export enum WorkoutCategory {
  STRENGTH = 'STRENGTH',
  CARDIO = 'CARDIO',
  HIIT = 'HIIT',
  FLEXIBILITY = 'FLEXIBILITY',
  CALLISTHENICS = 'CALLISTHENICS',
}

export enum WorkoutDifficulty {
  BEGINNER = 'BEGINNER',
  INTERMEDIATE = 'INTERMEDIATE',
  ADVANCED = 'ADVANCED',
}

export enum WorkoutGoal {
  MUSCLE_GAIN = 'MUSCLE_GAIN',
  WEIGHT_LOSS = 'WEIGHT_LOSS',
  ENDURANCE = 'ENDURANCE',
  GENERAL_FITNESS = 'GENERAL_FITNESS',
}

export enum CyclePhase {
  FOLLICULAR = 'FOLLICULAR',
  OVULATORY = 'OVULATORY',
  LUTEAL = 'LUTEAL',
  MENSTRUAL = 'MENSTRUAL',
}

export enum WorkoutSource {
  AI_PLAN = 'AI_PLAN',
  TRAINER_PROGRAM = 'TRAINER_PROGRAM',
  CUSTOM = 'CUSTOM',
}

export interface TargetExercise {
  exerciseName: string;
  category: WorkoutCategory;
  targetSets: number;
  targetReps: number;
  targetWeightKg?: number;
  restSeconds: number;
  notes?: string;
}

export interface WorkoutProgramDay {
  dayNumber: number;
  title: string;
  focusPhase?: CyclePhase;
  exercises: TargetExercise[];
}

export interface WorkoutProgram {
  _id: string;
  trainerId: string;
  title: string;
  description: string;
  durationWeeks: number;
  daysPerWeek: number;
  difficulty: WorkoutDifficulty;
  goal: WorkoutGoal;
  days: WorkoutProgramDay[];
  isTemplate?: boolean;
  assignedUserId?: string;
  isArchived?: boolean;
  createdAt?: string;
  updatedAt?: string;
}

export interface CreateProgramPayload {
  title: string;
  description: string;
  durationWeeks: number;
  daysPerWeek: number;
  difficulty: WorkoutDifficulty;
  goal: WorkoutGoal;
  days: WorkoutProgramDay[];
  isTemplate?: boolean;
}

export interface UpdateProgramPayload {
  title?: string;
  description?: string;
  durationWeeks?: number;
  daysPerWeek?: number;
  difficulty?: WorkoutDifficulty;
  goal?: WorkoutGoal;
  days?: WorkoutProgramDay[];
}

export interface LoggedSet {
  setNumber: number;
  repsCompleted: number;
  weightKg: number;
  rpe?: number;
  isCompleted: boolean;
}

export interface LoggedExercise {
  exerciseName: string;
  category: string;
  sets: LoggedSet[];
}

export interface WorkoutLog {
  _id: string;
  userId: string;
  date: string;
  source: WorkoutSource;
  programId?: string;
  workoutTitle: string;
  durationMinutes: number;
  totalVolumeKg?: number;
  totalSetsCompleted?: number;
  exercises: LoggedExercise[];
  notes?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface CreateWorkoutLogPayload {
  date: string;
  source: WorkoutSource;
  programId?: string;
  workoutTitle: string;
  durationMinutes: number;
  exercises: LoggedExercise[];
  notes?: string;
}
