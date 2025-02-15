"use client"

import { createContext, useContext, useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { routes } from "@/app/routes"

interface User {
  id: string
  email: string
  isNewUser?: boolean
  onboardingCompleted?: boolean
}

interface AuthContextType {
  user: User | null
  isNewUser: boolean
  signIn: (email: string, password: string) => Promise<void>
  signUp: (email: string, password: string) => Promise<void>
  signOut: () => void
  completeOnboarding: () => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isNewUser, setIsNewUser] = useState(false)
  const router = useRouter()

  // Check for stored user data on mount
  useEffect(() => {
    const storedUser = localStorage.getItem('user')
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser)
      setUser(parsedUser)
      setIsNewUser(!!parsedUser.isNewUser)
    }
  }, [])

  const signIn = async (email: string, password: string) => {
    // Simulate API call
    console.log(password)

    const mockUser = { 
      id: "1", 
      email, 
      onboardingCompleted: true 
    }
    setUser(mockUser)
    setIsNewUser(false)
    localStorage.setItem('user', JSON.stringify(mockUser))
    router.push(routes.activity)
  }

  const signUp = async (email: string, password: string) => {
    // Simulate API call

  console.log(password)
    const mockUser = { 
      id: "1", 
      email, 
      isNewUser: true,
      onboardingCompleted: false
    }
    setUser(mockUser)
    setIsNewUser(true)
    localStorage.setItem('user', JSON.stringify(mockUser))
    // Don't redirect - let MainLayout handle showing onboarding
  }

  const signOut = () => {
    setUser(null)
    setIsNewUser(false)
    localStorage.removeItem('user')
    router.push(routes.home)
  }

  const completeOnboarding = () => {
    if (user) {
      const updatedUser = { 
        ...user, 
        isNewUser: false, 
        onboardingCompleted: true 
      }
      setUser(updatedUser)
      setIsNewUser(false)
      localStorage.setItem('user', JSON.stringify(updatedUser))
      router.push(routes.activity)
    }
  }

  return (
    <AuthContext.Provider 
      value={{ 
        user, 
        isNewUser, 
        signIn, 
        signUp, 
        signOut,
        completeOnboarding 
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
} 