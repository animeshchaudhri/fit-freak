export type ActivityType = 'workout' | 'running' | 'walking' | 'cycling' | 'yoga' | 'swimming'

export interface ActivityData {
  id: string
  userId: string
  type: ActivityType
  duration: number
  calories: number
  steps?: number
  heartRate?: number
  distance?: number
  timestamp: Date
}

export interface ChallengeData {
  id: string
  title: string
  description: string
  type: ActivityType
  goal: number
  startDate: Date
  endDate: Date
  points: number
  participants: number
  creatorId: string
  isActive: boolean
}

export interface FitnessUserData {
  id: string
  email: string
  name: string
  age: number
  gender: string
  height: number
  weight: number
  activityLevel: string
  primaryGoal: string
  weeklyTarget: string
  workoutTime: string
  bmi: number
  totalPoints: number
  streak: number
  lastActive: Date
} 