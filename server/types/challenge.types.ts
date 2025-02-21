import { ActivityType } from "./fitness.types"

export type ChallengeGoalType = 'steps' | 'calories' | 'distance' | 'activeMinutes' | 'custom'
export type ChallengeStatus = 'active' | 'completed' | 'cancelled'

export interface CreateChallengeRequest {
  title: string
  description: string
  goal_type: ChallengeGoalType
  goal_value: number
  duration: number
  start_date?: Date
  end_date?: Date
  reward_points?: number
  invited_users?: string[]
}

export interface ChallengeData {
  id: string
  title: string
  description: string
  goal_type: ChallengeGoalType
  goal_value: number
  start_date: Date
  end_date: Date
  duration: number
  reward_points: number
  participants: number
  creator_id: string
  status: ChallengeStatus
}

export interface ChallengeResponse {
  message: string
  data: ChallengeData
}

export interface ChallengeListResponse {
  message: string
  data: ChallengeData[]
}

export interface ChallengeParticipantData {
  id: string
  challengeId: string
  userId: string
  status: 'pending' | 'accepted' | 'rejected' | 'completed'
  progress: number
  joinedAt: Date
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

export interface ChallengeParticipantResponse {
  message: string
  data: ChallengeParticipantData | null
}

export interface LeaderboardEntry {
  userId: string;
  name: string;
  profilePicture?: string;
  progress: number;
  joinedAt: Date;
}

export interface ParticipantData {
  userId: string;
  name: string;
  profilePicture?: string;
  status: 'pending' | 'accepted' | 'rejected' | 'completed';
  progress: number;
  joinedAt: Date;
}

export interface LeaderboardResponse {
  message: string;
  data: LeaderboardEntry[];
}

export interface ParticipantsResponse {
  message: string;
  data: ParticipantData[];
} 