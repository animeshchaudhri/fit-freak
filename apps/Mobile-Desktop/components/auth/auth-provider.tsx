"use client"

import { createContext, useContext, useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { routes } from "@/lib/routes"
import { User, AuthTokens, LoginResponse, RegisterResponse, UserResponse } from "@/types/auth.types"

import api from '@/lib/api-client'
import { clearTokens, getAccessToken, saveTokens } from "@/utils/tokenManager"
import { getNewAccessToken, isTokenExpired } from "@/utils/jwtUtils"
import { useUserStore } from "@/store/userstore"
import { clear } from "console"
import { toast } from "sonner"

interface AuthContextType {
  user: User | null
  isLoading: boolean
  signIn: (email: string, password: string) => Promise<void>
  signUp: (email: string, password: string) => Promise<void>
  signOut: () => void
  completeOnboarding: (profileData: Record<string, any>) => Promise<void>
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) throw new Error("useAuth must be used within AuthProvider")
  return context
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const setUserr = useUserStore((state) => state.setUserr)
  const clearUserr = useUserStore((state) => state.clearUserr)

  const [isLoading, setIsLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    const initAuth = async () => {
      try {
        const accessToken = getAccessToken()
        if (accessToken) {
          if (isTokenExpired(accessToken)) {
            console.log('Access token expired. Refreshing...')
            const newAccessToken = await getNewAccessToken()
            if (!newAccessToken) {
              clearTokens()
              setUser(null)
              router.push(routes.login)
              return
            }
          }
            const response = await api.get('/v1/user/user-details')
            setUserr(response.data.data)
            toast.success('Welcome back! You are now logged in.')

        }
      } catch (error) {
        console.error('Error initializing auth:', error)
        clearTokens()
        setUser(null)
      } finally {
        setIsLoading(false)
      }
    }

    initAuth()
  }, [])

  const signIn = async (email: string, password: string) => {
    try {
      const response = await api.post<LoginResponse>('/v1/user/login', { 
        email, 
        password 
      });

      if (!response.data?.accessToken || !response.data?.refreshToken) {
        throw new Error('Invalid login response');
      }
      toast.success('Login successful!');
      const { accessToken, refreshToken } = response.data;
      saveTokens(accessToken, refreshToken);
      
      // Get basic user info
      const userInfoResponse = await api.get('/v1/user/info');
      const basicUserInfo = userInfoResponse.data;
   
      try {
        // Get detailed user profile
        const userResponse = await api.get<UserResponse>('/v1/user/user-details');
        setUserr(userResponse.data.data)
        if (userResponse.data?.data) {
          const userDetails = userResponse.data.data;
          
          // Merge basic user info with details
          setUser({
            ...basicUserInfo,
            ...userDetails,
            onboardingCompleted: userDetails.onboarding_completed
          });
          localStorage.setItem("onboardingCompleted", "true");

          router.push(routes.activity);
        }
      } catch (error: any) {
        if (error.response?.status === 404) {
          // User hasn't completed onboarding
          clearUserr();
          setUser(basicUserInfo);
          router.push(routes.onboarding);
        } else {
          throw error;
        }
      }
    } catch (error: any) {
      clearTokens();
      setUser(null);
      clearUserr();
      const message = error.response?.data?.message || 'Login failed';
      toast.error(message);
    }
  }

  const signUp = async (email: string, password: string) => {
    try {
      const response = await api.post<RegisterResponse>('/v1/user/register', { 
        email, 
        password 
      })
      
      try {
        await signIn(email, password)
      } catch (error: any) {
        toast.success('Account created successfully! Please login to continue.')
        await router.push(routes.login)
      }
    } catch (error: any) {
      if (error.response?.status === 409) {
        toast.error('Email already exists. Please login instead.')
        await router.push(routes.login)
      } else {
        const message = error.response?.data?.message || 'Registration failed. Please try again.'
        toast.error(message)
      }
    }
  }

  const signOut = () => {
    clearTokens()
    localStorage.removeItem("onboardingCompleted");
    clearUserr();
    setUser(null)
    router.push(routes.login)
  }

  const completeOnboarding = async (profileData: Record<string, any>) => {
    try {
      const response = await api.post('/v1/user/create-user', {
        ...profileData,
      })

      if (response.status === 201 || response.status === 200) {
        if (user) {
          const updatedUser = {
            ...user,
            ...profileData,
            onboarding_completed: true
          }
          setUser(updatedUser)
          const userInfoResponse = await api.get('/v1/user/info');
          const basicUserInfo = userInfoResponse.data;
          try {
           

            const userResponse = await api.get<UserResponse>('/v1/user/user-details');
        
          if (userResponse.data?.data) {
          const userDetails = userResponse.data.data;
          setUserr(userDetails)
          // Merge basic user info with details
          setUser({
            ...basicUserInfo,
            ...userDetails,
            onboardingCompleted: userDetails.onboarding_completed
          });
          localStorage.setItem("onboardingCompleted", "true");
          
        }
          } catch (error) {
            console.error('Error refreshing user details:', error)
          }

          toast.success('Profile completed successfully!')
          router.push(routes.activity)
        }
      }
    } catch (error: any) {
      console.error('Onboarding error:', error)
      toast.error(error.response?.data?.message || 'Failed to complete onboarding')
      throw error
    }
  }


  return (
    <AuthContext.Provider value={{
      user,
      isLoading,
      signIn,
      signUp,
      signOut,
      completeOnboarding
    }}>
      {children}
    </AuthContext.Provider>
  )
}