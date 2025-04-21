
// User Types
export interface User {
  id: string;
  name: string;
  email: string;
  profilePicture?: string;
  injuries: Injury[];
  activePrograms: RecoveryProgram[];
  completedPrograms: RecoveryProgram[];
  progressStats: ProgressStats;
}

// Auth Types
export interface AuthState {
  isAuthenticated: boolean;
  user: User | null;
  loading: boolean;
  error: string | null;
}

// Injury Types
export interface Injury {
  id: string;
  name: string;
  bodyPart: BodyPart;
  severity: 'mild' | 'moderate' | 'severe';
  description: string;
  imageUrl?: string;
  recommendedPrograms: string[]; // Program IDs
}

export type BodyPart = 
  | 'shoulder'
  | 'knee'
  | 'ankle'
  | 'wrist'
  | 'elbow'
  | 'back'
  | 'neck'
  | 'hip';

// Recovery Program Types
export interface RecoveryProgram {
  id: string;
  name: string;
  description: string;
  targetInjury: BodyPart;
  durationWeeks: number;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  phases: ProgramPhase[];
  imageUrl?: string;
}

export interface ProgramPhase {
  id: string;
  name: string;
  description: string;
  durationDays: number;
  exercises: Exercise[];
}

// Exercise Types
export interface Exercise {
  id: string;
  name: string;
  description: string;
  imageUrl?: string;
  videoUrl?: string;
  instructions: string[];
  sets: number;
  reps: number;
  duration?: number; // in seconds
  targetMuscles: string[];
  tips: string[];
  modifications: ExerciseModification[];
}

export interface ExerciseModification {
  id: string;
  name: string;
  description: string;
  difficulty: 'easier' | 'harder';
}

// Progress Tracking Types
export interface ProgressStats {
  programsCompleted: number;
  exercisesCompleted: number;
  currentStreak: number; // days in a row with activity
  longestStreak: number;
  weeklyProgress: WeeklyProgress[];
  painLevels: PainLevel[];
}

export interface WeeklyProgress {
  weekStartDate: string; // ISO date string
  daysActive: number;
  exercisesCompleted: number;
  minutesActive: number;
}

export interface PainLevel {
  date: string; // ISO date string
  level: number; // 0-10 scale
  bodyPart: BodyPart;
  notes?: string;
}

// Notification Types
export interface Reminder {
  id: string;
  userId: string;
  title: string;
  body: string;
  time: string; // HH:MM format
  days: number[]; // 0-6, where 0 is Sunday
  enabled: boolean;
  programId?: string;
}
