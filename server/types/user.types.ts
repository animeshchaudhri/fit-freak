

export type UserData = {
  id: string;
  email: string;
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

