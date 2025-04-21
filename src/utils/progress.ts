
import { User, PainLevel, WeeklyProgress } from '@/types';
import { storeUser, getUser } from './storage';

// Record a completed exercise
export const recordCompletedExercise = (): void => {
  const user = getUser();
  if (!user) return;
  
  user.progressStats.exercisesCompleted += 1;
  
  // Update current week's progress
  const today = new Date();
  const weekStart = getWeekStartDate(today);
  const weekStartStr = weekStart.toISOString().split('T')[0];
  
  let weekProgress = user.progressStats.weeklyProgress.find(
    wp => wp.weekStartDate === weekStartStr
  );
  
  if (!weekProgress) {
    // Create new week progress if not found
    weekProgress = {
      weekStartDate: weekStartStr,
      daysActive: 0,
      exercisesCompleted: 0,
      minutesActive: 0,
    };
    user.progressStats.weeklyProgress.push(weekProgress);
  }
  
  weekProgress.exercisesCompleted += 1;
  
  // Add exercise duration to active minutes (assuming 3 minutes per exercise)
  weekProgress.minutesActive += 3;
  
  // Check if we need to increment daysActive
  const lastActiveDate = getLastActiveDate(user);
  const todayStr = today.toISOString().split('T')[0];
  
  if (lastActiveDate !== todayStr) {
    weekProgress.daysActive += 1;
    updateStreak(user, today);
  }
  
  storeUser(user);
};

// Record pain level
export const recordPainLevel = (painLevel: PainLevel): void => {
  const user = getUser();
  if (!user) return;
  
  user.progressStats.painLevels.push(painLevel);
  storeUser(user);
};

// Get pain level trend for a body part
export const getPainTrend = (bodyPart: string): number[] => {
  const user = getUser();
  if (!user) return [];
  
  const painLevels = user.progressStats.painLevels
    .filter(pl => pl.bodyPart === bodyPart)
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
  
  return painLevels.map(pl => pl.level);
};

// Complete a recovery program
export const completeProgram = (programId: string): void => {
  const user = getUser();
  if (!user) return;
  
  const programIndex = user.activePrograms.findIndex(p => p.id === programId);
  
  if (programIndex !== -1) {
    const completedProgram = user.activePrograms[programIndex];
    user.activePrograms.splice(programIndex, 1);
    user.completedPrograms.push(completedProgram);
    user.progressStats.programsCompleted += 1;
    storeUser(user);
  }
};

// Helper: Get the start date of the week for a given date
const getWeekStartDate = (date: Date): Date => {
  const dayOfWeek = date.getDay(); // 0-6, where 0 is Sunday
  const startDate = new Date(date);
  startDate.setDate(date.getDate() - dayOfWeek); // Move back to Sunday
  startDate.setHours(0, 0, 0, 0); // Start of day
  return startDate;
};

// Helper: Get last active date
const getLastActiveDate = (user: User): string => {
  // This is a simplified version. In a real app, you'd store last active date explicitly
  const today = new Date().toISOString().split('T')[0];
  
  // Check if we've already been active today
  for (const week of user.progressStats.weeklyProgress) {
    const weekStart = new Date(week.weekStartDate);
    const weekEnd = new Date(week.weekStartDate);
    weekEnd.setDate(weekEnd.getDate() + 7);
    
    if (weekStart <= new Date(today) && weekEnd > new Date(today)) {
      return today;
    }
  }
  
  return '';
};

// Helper: Update user's activity streak
const updateStreak = (user: User, today: Date): void => {
  const yesterday = new Date(today);
  yesterday.setDate(today.getDate() - 1);
  const yesterdayStr = yesterday.toISOString().split('T')[0];
  
  // Check if the user was active yesterday
  let wasActiveYesterday = false;
  for (const week of user.progressStats.weeklyProgress) {
    const weekStart = new Date(week.weekStartDate);
    const weekEnd = new Date(week.weekStartDate);
    weekEnd.setDate(weekEnd.getDate() + 7);
    
    if (weekStart <= new Date(yesterdayStr) && weekEnd > new Date(yesterdayStr)) {
      wasActiveYesterday = true;
      break;
    }
  }
  
  if (wasActiveYesterday) {
    // Increment current streak
    user.progressStats.currentStreak += 1;
    
    // Update longest streak if needed
    if (user.progressStats.currentStreak > user.progressStats.longestStreak) {
      user.progressStats.longestStreak = user.progressStats.currentStreak;
    }
  } else {
    // Reset streak
    user.progressStats.currentStreak = 1;
  }
};
