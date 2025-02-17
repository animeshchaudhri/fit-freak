"use client"

import { useState } from "react"
import { useAuth } from "./auth-provider"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Loader } from "lucide-react"
import { toast } from "react-hot-toast"

// Add email validation regex
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

interface AuthFormProps {
  defaultIsLogin?: boolean
}

export function AuthForm({ defaultIsLogin = true }: AuthFormProps) {
  const [isLogin, setIsLogin] = useState(defaultIsLogin)
  const [isLoading, setIsLoading] = useState(false)
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const { signIn, signUp } = useAuth()

  const validateForm = () => {
    // Check for empty fields
    if (!email || !password) {
      toast.error('Please fill in all fields')
      return false
    }

    // Validate email format
    if (!EMAIL_REGEX.test(email)) {
      toast.error('Please enter a valid email address')
      return false
    }

    // Validate password length for signup
    if (!isLogin && password.length < 6) {
      toast.error('Password must be at least 6 characters long')
      return false
    }

    // Add password complexity check for signup
    if (!isLogin && !/(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])/.test(password)) {
      toast.error('Password must contain at least one uppercase letter, one lowercase letter, and one number')
      return false
    }

    return true
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    // Validate form before submission
    if (!validateForm()) {
      return
    }
    
    setIsLoading(true)
    
    try {
      if (isLogin) {
        await signIn(email, password)
        toast.success('Successfully signed in!')
      } else {
        await signUp(email, password)
        toast.success('Account created successfully!')
      }
    } catch (error) {
      console.error('Auth error:', error)
      // Show specific error messages based on error type
      if (error instanceof Error) {
        if (error.message.includes('auth/wrong-password')) {
          toast.error('Incorrect password')
        } else if (error.message.includes('auth/user-not-found')) {
          toast.error('No account found with this email')
        } else if (error.message.includes('auth/email-already-in-use')) {
          toast.error('Email already in use')
        } else {
          toast.error('Authentication failed. Please try again.')
        }
      }
    } finally {
      setIsLoading(false)
    }
  }

  // Add email validation on blur
  const handleEmailBlur = () => {
    if (email && !EMAIL_REGEX.test(email)) {
      toast.error('Please enter a valid email address')
    }
  }

  // Add password validation on blur for signup
  const handlePasswordBlur = () => {
    if (!isLogin && password && password.length < 6) {
      toast.error('Password must be at least 6 characters long')
    }
  }

  return (
    <div className="w-full max-w-md space-y-8">
      <div className="text-center">
        <h2 className="text-3xl font-bold">{isLogin ? "Welcome Back" : "Create Account"}</h2>
        <p className="text-gray-500 mt-2">
          {isLogin ? "Sign in to your account" : "Sign up for a new account"}
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <Input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          onBlur={handleEmailBlur}
          required
          className={!email || EMAIL_REGEX.test(email) ? "" : "border-red-500"}
        />
        <Input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          onBlur={handlePasswordBlur}
          required
          className={!password || (isLogin || password.length >= 6) ? "" : "border-red-500"}
        />
        <Button type="submit" className="w-full" disabled={isLoading}>
          {isLoading ? (
            <>
              <Loader className="mr-2 h-4 w-4 animate-spin" />
              {isLogin ? "Signing in..." : "Creating account..."}
            </>
          ) : (
            isLogin ? "Sign In" : "Sign Up"
          )}
        </Button>
      </form>

      <div className="text-center">
        <button
          type="button"
          onClick={() => {
            setIsLogin(!isLogin)
            setEmail("")
            setPassword("")
          }}
          className="text-primary hover:underline"
        >
          {isLogin ? "Need an account? Sign up" : "Already have an account? Sign in"}
        </button>
      </div>
    </div>
  )
}