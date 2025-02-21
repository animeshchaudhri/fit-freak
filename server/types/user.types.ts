

export type UserData = {
  id: string;
  email: string;
};

export type userLoginData = {
  email: string;
  onboarding_completed?: boolean;
};
export type userDetailedData = {
  id: string;
  user_id: string;
  first_name: string;
  last_name: string;
  phone: string;
  height?: number;
  weight?: number;
  gender?: string;
  age?: number;
  activity_level?: string;
  fitness_goals?: string[];
  onboarding_completed: boolean;
}
export type allUserWorkoutData = {
  userData: userWorkoutData[];
}

export type allleaderboardData={
  leaderboardData: LeaderboardData[];
}

export type LeaderboardData = {
  first_name: string;
  last_name:string;
  calories_burned: number;
  numebr_workouts: number;
  rank: number;
}

export type userWorkoutData = {
  user_id: string;
  calories_burned: number;
  number_workouts: number;
}

export type authTokens = {
  accessToken: string;
  refreshToken: string;
};


export type device = 'mobile' | 'web';

export type RefreshTokenData = {
  user_id: string; 
  device_type: device;
  refresh_token: string;
}

export type userAttributes =
  'id'
  | 'role_id'
  | 'first_name'
  | 'last_name'
  | 'email'
  | 'phone'
  | 'createdAt'
  | 'updatedAt'

