"use client"

import { useState } from "react"
import { useAuth } from "./auth-provider"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Loader } from "lucide-react"
import { toast } from "react-hot-toast"

// Updated email and password validation regex
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const PASSWORD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/

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
    try {
      // Sanitize inputs
      const sanitizedEmail = email.trim().toLowerCase()
      
      // Check for empty fields
      if (!sanitizedEmail || !password) {
        toast.error('Please fill in all fields')
        return false
      }

      // Validate email format
      if (!EMAIL_REGEX.test(sanitizedEmail)) {
        toast.error('Please enter a valid email address')
        return false
      }

      // Password validation for both login and signup
      if (!PASSWORD_REGEX.test(password)) {
        toast.error(
          'Password must be at least 8 characters long and contain:\n' +
          '- At least 1 uppercase letter\n' +
          '- At least 1 lowercase letter\n' +
          '- At least 1 number\n' +
          '- At least 1 special character (@$!%*?&)'
        )
        return false
      }

      return true
    } catch (error) {
      console.error('Validation error:', error)
      toast.error('An error occurred during validation. Please try again.')
      return false
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    try {
      // Validate form before submission
      if (!validateForm()) {
        return
      }
      
      setIsLoading(true)
      
      if (isLogin) {
        await signIn(email.trim(), password)
        toast.success('Successfully signed in!')
      } else {
        await signUp(email.trim(), password)
        toast.success('Account created successfully!')
      }
    } catch (error: any) {
      console.error('Auth error:', error)
      
      // Enhanced error handling with specific messages
      const errorCode = error?.code || error?.message || 'unknown'
      
      const errorMessages: { [key: string]: string } = {
        'auth/wrong-password': 'Incorrect password',
        'auth/user-not-found': 'No account found with this email',
        'auth/email-already-in-use': 'Email already in use',
        'auth/invalid-email': 'Invalid email format',
        'auth/weak-password': 'Password is too weak',
        'auth/network-request-failed': 'Network error. Please check your connection',
        'auth/too-many-requests': 'Too many attempts. Please try again later',
        'auth/user-disabled': 'This account has been disabled',
        'auth/operation-not-allowed': 'Operation not allowed',
        'auth/popup-closed-by-user': 'Authentication cancelled',
        'default': 'Authentication failed. Please try again'
      }

      toast.error(errorMessages[errorCode] || errorMessages.default)
    } finally {
      setIsLoading(false)
    }
  }

  // Real-time email validation
  const handleEmailBlur = () => {
    if (email && !EMAIL_REGEX.test(email.trim())) {
      toast.error('Please enter a valid email address')
    }
  }

  // Real-time password validation
  const handlePasswordBlur = () => {
    if (password && !PASSWORD_REGEX.test(password)) {
      toast.error(
        'Password must contain uppercase, lowercase, number, and special character'
      )
    }
  }

  // Reset form when switching between login/signup
  const handleAuthModeSwitch = () => {
    setIsLogin(!isLogin)
    setEmail("")
    setPassword("")
    // Clear any existing error toasts
    toast.dismiss()
  }

  return (
    <div className="w-full max-w-md space-y-8">
      {/* ...existing JSX code... */}
      <form onSubmit={handleSubmit} className="space-y-4">
        <Input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          onBlur={handleEmailBlur}
          required
          className={!email || EMAIL_REGEX.test(email.trim()) ? "" : "border-red-500"}
          disabled={isLoading}
          aria-label="Email"
        />
        <Input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          onBlur={handlePasswordBlur}
          required
          className={!password || PASSWORD_REGEX.test(password) ? "" : "border-red-500"}
          disabled={isLoading}
          aria-label="Password"
        />
        <Button 
          type="submit" 
          className="w-full" 
          disabled={isLoading}
          aria-label={isLogin ? "Sign In" : "Sign Up"}
        >
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
          onClick={handleAuthModeSwitch}
          className="text-primary hover:underline"
          disabled={isLoading}
        >
          {isLogin ? "Need an account? Sign up" : "Already have an account? Sign in"}
        </button>
      </div>
    </div>
  )
}
