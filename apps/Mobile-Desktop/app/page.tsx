"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useAuth } from "@/components/auth/auth-provider"
import Image from "next/image"
import { PLACEHOLDER_IMAGES } from "@/lib/image-constants"

export default function HomePage() {
  const [isLogin, setIsLogin] = useState(true)
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const { signIn, signUp } = useAuth()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (isLogin) {
      await signIn(email, password)
    } else {
      await signUp(email, password)
    }
  }

  return (
    <div className="min-h-screen flex flex-col lg:flex-row">
      {/* Hero Section */}
      <div className="flex-1 relative hidden lg:block">
        <Image
          src={PLACEHOLDER_IMAGES.workout}
          alt="Fitness"
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-transparent flex items-center p-12">
          <div className="max-w-xl">
            <h1 className="text-5xl font-bold mb-6">Transform Your Fitness Journey</h1>
            <p className="text-xl text-gray-200">
              Track your progress, join live sessions, and achieve your fitness goals with our comprehensive platform.
            </p>
          </div>
        </div>
      </div>

      {/* Auth Section */}
      <div className="flex-1 flex items-center justify-center p-6 bg-gradient-to-b from-gray-900 to-black">
        <Card className="w-full max-w-md p-8 bg-gray-800/30 border-0">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold mb-2">Welcome to FitTrack</h2>
            <p className="text-gray-400">
              {isLogin ? "Sign in to continue your journey" : "Create an account to get started"}
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm text-gray-400">Email</label>
              <Input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm text-gray-400">Password</label>
              <Input
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            <Button type="submit" className="w-full">
              {isLogin ? "Sign In" : "Create Account"}
            </Button>

            <p className="text-center text-sm text-gray-400">
              {isLogin ? "Don't have an account? " : "Already have an account? "}
              <button
                type="button"
                className="text-blue-400 hover:underline"
                onClick={() => setIsLogin(!isLogin)}
              >
                {isLogin ? "Sign Up" : "Sign In"}
              </button>
            </p>
          </form>
        </Card>
      </div>
    </div>
  )
}

