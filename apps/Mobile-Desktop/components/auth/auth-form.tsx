"use client"

import { useState } from "react"
import { useAuth } from "./auth-provider"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Loader } from "lucide-react"
import { toast } from "react-hot-toast"

interface AuthFormProps {
  defaultIsLogin?: boolean
}

export function AuthForm({ defaultIsLogin = true }: AuthFormProps) {
  const [isLogin, setIsLogin] = useState(defaultIsLogin)
  const [isLoading, setIsLoading] = useState(false)
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const { signIn, signUp } = useAuth()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email || !password) {
      toast.error('Please fill in all fields')
      return
    }
    
    setIsLoading(true)
    
    try {
      if (isLogin) {
        await signIn(email, password)
      } else {
        await signUp(email, password)
      }
    } catch (error) {
      // Error is already handled in auth provider
      console.error('Auth error:', error)
    } finally {
      setIsLoading(false)
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
          required
        />
        <Input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
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
          onClick={() => setIsLogin(!isLogin)}
          className="text-primary hover:underline"
        >
          {isLogin ? "Need an account? Sign up" : "Already have an account? Sign in"}
        </button>
      </div>
    </div>
  )
}