import { User, RecoveryProgram, Injury, Reminder } from '@/types';

// Storage keys
const KEYS = {
  USER: 'recovery_app_user',
  AUTH_TOKEN: 'recovery_app_auth_token',
  PROGRAMS: 'recovery_app_programs',
  INJURIES: 'recovery_app_injuries',
  REMINDERS: 'recovery_app_reminders',
  SETTINGS: 'recovery_app_settings',
};

// Store user data
export const storeUser = (user: User): void => {
  localStorage.setItem(KEYS.USER, JSON.stringify(user));
};

// Get user data
export const getUser = (): User | null => {
  const data = localStorage.getItem(KEYS.USER);
  return data ? JSON.parse(data) : null;
};

// Store authentication token
export const storeAuthToken = (token: string): void => {
  localStorage.setItem(KEYS.AUTH_TOKEN, token);
};

// Get authentication token
export const getAuthToken = (): string | null => {
  return localStorage.getItem(KEYS.AUTH_TOKEN);
};

// Remove authentication token (logout)
export const removeAuthToken = (): void => {
  localStorage.removeItem(KEYS.AUTH_TOKEN);
};

// Store recovery programs
export const storePrograms = (programs: RecoveryProgram[]): void => {
  localStorage.setItem(KEYS.PROGRAMS, JSON.stringify(programs));
};

// Get recovery programs
export const getPrograms = (): RecoveryProgram[] => {
  const data = localStorage.getItem(KEYS.PROGRAMS);
  return data ? JSON.parse(data) : [];
};

// Store injuries data
export const storeInjuries = (injuries: Injury[]): void => {
  localStorage.setItem(KEYS.INJURIES, JSON.stringify(injuries));
};

// Get injuries data
export const getInjuries = (): Injury[] => {
  const data = localStorage.getItem(KEYS.INJURIES);
  return data ? JSON.parse(data) : [];
};

// Store reminders
export const storeReminders = (reminders: Reminder[]): void => {
  localStorage.setItem(KEYS.REMINDERS, JSON.stringify(reminders));
};

// Get reminders
export const getReminders = (): Reminder[] => {
  const data = localStorage.getItem(KEYS.REMINDERS);
  return data ? JSON.parse(data) : [];
};

// Clear all app data (used for logout)
export const clearAppData = (): void => {
  localStorage.removeItem(KEYS.USER);
  localStorage.removeItem(KEYS.AUTH_TOKEN);
  // You may want to keep the other data for faster re-login experience
  // Or clear everything for privacy
  // localStorage.removeItem(KEYS.PROGRAMS);
  // localStorage.removeItem(KEYS.INJURIES);
  // localStorage.removeItem(KEYS.REMINDERS);
  // localStorage.removeItem(KEYS.SETTINGS);
};
