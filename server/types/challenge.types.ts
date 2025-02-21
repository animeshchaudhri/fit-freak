import { ActivityType } from "./fitness.types"

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

export interface ChallengeParticipantData {
  id: string
  challengeId: string
  userId: string
  status: 'pending' | 'accepted' | 'rejected' | 'completed'
  progress: number
  joinedAt: Date
}

export interface CreateChallengeRequest {
  title: string
  description: string
  type: ActivityType
  goal: number
  startDate: Date
  endDate: Date
  points: number
  invitedUsers?: string[]
}

export interface CreateChallengeInput {
  title: string
  description: string
  type: string
  goal_type: string
  goal_value: number
  start_date: Date
  end_date: Date
  reward_points: number
  invited_users?: string[]
}

export interface UpdateChallengeProgressInput {
  progress: number
}

export interface ChallengeResponse {
  message: string
  data: ChallengeData
}

export interface ChallengeListResponse {
  message: string
  data: ChallengeData[]
}

export interface ChallengeParticipantResponse {
  message: string
  data: ChallengeParticipantData | null
} 