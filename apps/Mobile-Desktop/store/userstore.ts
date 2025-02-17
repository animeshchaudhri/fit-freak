import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface UserProfile {
  id: string;
  email: string;
  first_name: string;
  last_name: string;
  height: number;
  weight: number;
  age: number;
  gender: string;
  activity_level: string;
  fitness_goals: string[];
  onboarding_completed: boolean;
  createdAt?: string;
  updatedAt?: string;
}

interface UserState {
  user: UserProfile | null;
  setUserr: (user: UserProfile | null) => void;
  clearUserr: () => void;
}

export const useUserStore = create<UserState>()(
  persist(
    (set) => ({
      user: null,
      setUserr: (user) => set({ user }),
      clearUserr: () => set({ user: null }),
    }),
    {
      name: 'user-storage',
    }
  )
)