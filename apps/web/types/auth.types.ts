export interface User {
    id: string
    email: string
    onboardingCompleted: boolean
    first_name?: string
    last_name?: string
    height?: number
    weight?: number
    gender?: string
    age?: number
    activity_level?: string
    fitness_goals?: string[]
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
    message: string
    data: User
}