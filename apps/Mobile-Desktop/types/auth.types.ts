export interface User {
    email: string
    onboardingCompleted: boolean
}

export interface UserDetails {
  id: string;
  user_id: string;
  email: string;
  first_name: string;
  last_name: string;
  phone: string;
  height: number;
  weight: number;
  age: number;
  gender: string;
  activity_level: string;
  fitness_goals: string[];
  onboarding_completed: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface AuthTokens {
    accessToken: string
    refreshToken: string
}

export interface LoginResponse {
    message: string
    accessToken: string
    refreshToken: string
    userId: string
}

export interface RegisterResponse {
    message: string
    data: User
}

export interface AuthError {
    message: string
    code: string
    details?: string
}

export interface UserResponse {
  message: string;
  data: UserDetails;
}