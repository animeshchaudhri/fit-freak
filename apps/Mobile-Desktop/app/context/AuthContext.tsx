import { createContext, useContext, useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { routes } from '@/lib/routes'
import { User } from '@/types/auth.types'

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  completeOnboarding: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    // Check for stored token and validate
    const checkAuth = async () => {
      const token = localStorage.getItem('accessToken')
      if (token) {
        try {
          // Validate token and get user info
          const response = await fetch('/api/auth/validate', {
            headers: { Authorization: `Bearer ${token}` }
          })
          if (response.ok) {
            const data = await response.json()
            setUser(data.user)
          } else {
            localStorage.removeItem('accessToken')
          }
        } catch (error) {
          console.error('Auth check failed:', error)
        }
      }
      setIsLoading(false)
    }
    checkAuth()
  }, [])

  const login = async (email: string, password: string) => {
    const response = await fetch('/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    })

    if (!response.ok) {
      throw new Error('Login failed')
    }

    const data = await response.json()
    localStorage.setItem('accessToken', data.accessToken)
    setUser(data.user)
  }

  const logout = () => {
    localStorage.removeItem('accessToken')
    setUser(null)
  }

  const completeOnboarding = () => {
    if (user) {
      const updatedUser: User = {
        ...user,
        onboardingCompleted: true
      }
      setUser(updatedUser)
      router.push(routes.activity)
    }
  }

  return (
    <AuthContext.Provider value={{ 
      user, 
      isLoading, 
      completeOnboarding 
    }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
} 