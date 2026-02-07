import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { addDays, format, subDays } from 'date-fns';

export type Mood = 'Great' | 'Good' | 'Okay' | 'Meh' | 'Bad';
export type HungerLevel = 1 | 2 | 3 | 4 | 5; // 1=Starved, 5=Stuffed
export type Goal = 'Balanced' | 'Fast' | 'Consistency' | 'Recovery' | 'Performance';
export type TrackingStyle = 'Light' | 'Guided' | 'Detailed';

export interface ProfileData {
  height?: string;
  weight?: string;
  sexAtBirth?: 'Female' | 'Male' | 'Intersex' | 'Prefer not to say';
  ageRange?: '18–29' | '30–39' | '40–49' | '50+';
  sleepBaseline?: '<6h' | '6–7h' | '7–8h' | '8h+';
  stressBaseline?: 'Low' | 'Medium' | 'High';
  activityLevel?: 'Mostly sedentary' | 'Lightly active' | 'Active most days';
  dietaryPreferences: string[];
  avoidFoods?: string;
  cravingWindows: string[];
  cravingIntensity?: HungerLevel;
  trackingStyle: TrackingStyle;
  permissions: {
    stepsSleep: boolean;
    photoLogging: boolean;
    voiceLogging: boolean;
    offlineFirst: boolean;
  };
}

export interface LogEntry {
  id: string;
  timestamp: string; // ISO date string
  type: 'meal' | 'hunger' | 'mood' | 'sleep' | 'stress' | 'movement';
  value: any; // Flexible payload
  notes?: string;
  tags?: string[];
}

export interface UserSettings {
  name: string;
  goal: Goal;
  theme: 'light' | 'dark' | 'system';
  onboardingCompleted: boolean;
}

export interface TwinMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: string;
}

interface AppState {
  settings: UserSettings;
  profile: ProfileData;
  logs: LogEntry[];
  chatHistory: TwinMessage[];
  
  // Actions
  updateSettings: (settings: Partial<UserSettings>) => void;
  updateProfile: (profile: Partial<ProfileData>) => void;
  addLog: (entry: Omit<LogEntry, 'id'>) => void;
  addMessage: (message: Omit<TwinMessage, 'id' | 'timestamp'>) => void;
  resetData: () => void;
}

// Seed data for demo
const seedLogs: LogEntry[] = [
  { id: '1', timestamp: subDays(new Date(), 0).toISOString(), type: 'sleep', value: { hours: 6.5, quality: 'Okay' }, notes: 'Woke up tired' },
  { id: '2', timestamp: subDays(new Date(), 0).toISOString(), type: 'meal', value: { name: 'Oatmeal & Berries', composition: 'Carb-heavy' }, notes: 'Felt good initially' },
  { id: '3', timestamp: subDays(new Date(), 0).toISOString(), type: 'hunger', value: { level: 4, trigger: 'Boredom' }, notes: 'Mid-morning snack craving' },
];

export const useStore = create<AppState>()(
  persist(
    (set) => ({
      settings: {
        name: 'Friend',
        goal: 'Balanced',
        theme: 'system',
        onboardingCompleted: false,
      },
      profile: {
        dietaryPreferences: [],
        cravingWindows: [],
        trackingStyle: 'Guided',
        permissions: {
          stepsSleep: false,
          photoLogging: false,
          voiceLogging: false,
          offlineFirst: true,
        },
      },
      logs: seedLogs,
      chatHistory: [
        { id: '1', role: 'assistant', content: "Hi! I'm your NutriTwin. I'm here to help you understand your body's patterns. How are you feeling right now?", timestamp: new Date().toISOString() }
      ],

      updateSettings: (newSettings) => set((state) => ({ 
        settings: { ...state.settings, ...newSettings } 
      })),

      updateProfile: (profile) => set((state) => ({
        profile: { ...state.profile, ...profile },
      })),
      
      addLog: (entry) => set((state) => ({ 
        logs: [...state.logs, { ...entry, id: Math.random().toString(36).substring(7), timestamp: entry.timestamp || new Date().toISOString() }] 
      })),

      addMessage: (message) => set((state) => ({
        chatHistory: [...state.chatHistory, { ...message, id: Math.random().toString(36).substring(7), timestamp: new Date().toISOString() }]
      })),

      resetData: () => set({ logs: [], chatHistory: [] }),
    }),
    {
      name: 'nutritwin-storage',
      storage: createJSONStorage(() => localStorage),
    }
  )
);
