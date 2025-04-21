
import { Reminder } from '@/types';
import { getReminders, storeReminders } from './storage';

// Check if browser supports notifications
export const checkNotificationPermission = (): boolean => {
  return 'Notification' in window;
};

// Request permission for notifications
export const requestNotificationPermission = async (): Promise<boolean> => {
  if (!checkNotificationPermission()) {
    return false;
  }
  
  const permission = await Notification.requestPermission();
  return permission === 'granted';
};

// Create a reminder
export const createReminder = (reminder: Reminder): void => {
  const reminders = getReminders();
  reminders.push(reminder);
  storeReminders(reminders);
  
  // If the reminder is enabled, schedule it
  if (reminder.enabled) {
    scheduleReminder(reminder);
  }
};

// Update a reminder
export const updateReminder = (reminder: Reminder): void => {
  const reminders = getReminders();
  const index = reminders.findIndex(r => r.id === reminder.id);
  
  if (index !== -1) {
    reminders[index] = reminder;
    storeReminders(reminders);
    
    // If the reminder is enabled, reschedule it
    if (reminder.enabled) {
      scheduleReminder(reminder);
    }
  }
};

// Delete a reminder
export const deleteReminder = (id: string): void => {
  const reminders = getReminders();
  const filteredReminders = reminders.filter(r => r.id !== id);
  storeReminders(filteredReminders);
};

// Schedule a reminder using the browser's notification API
export const scheduleReminder = (reminder: Reminder): void => {
  // For a real app, you would use a service worker for reliable notifications
  // This is a simplified version for demonstration
  
  if (!reminder.enabled) return;
  
  // Calculate time until next occurrence
  const [hours, minutes] = reminder.time.split(':').map(Number);
  const now = new Date();
  const today = now.getDay(); // 0-6, where 0 is Sunday
  
  // Find the next scheduled day
  let nextDay = reminder.days.find(day => day > today);
  if (nextDay === undefined) {
    nextDay = reminder.days[0]; // Wrap around to the next week
  }
  
  // Calculate milliseconds until the next occurrence
  const daysUntilNext = (nextDay < today) ? 7 - today + nextDay : nextDay - today;
  const nextDate = new Date(now);
  nextDate.setDate(now.getDate() + daysUntilNext);
  nextDate.setHours(hours, minutes, 0, 0);
  
  const timeUntilNext = nextDate.getTime() - now.getTime();
  
  // Schedule the notification
  setTimeout(() => {
    // Show notification
    if (Notification.permission === 'granted') {
      new Notification(reminder.title, { body: reminder.body });
      
      // Reschedule for the next occurrence
      scheduleReminder(reminder);
    }
  }, timeUntilNext);
};

// Initialize all active reminders
export const initializeReminders = (): void => {
  const reminders = getReminders();
  reminders.filter(r => r.enabled).forEach(scheduleReminder);
};
