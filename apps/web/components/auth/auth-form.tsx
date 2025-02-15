"use client"

import { useState } from "react"
import { Button } from "../ui/button"
import { Input } from "../ui/input"
import { Card } from "../ui/card"

export function AuthForm() {
  const [isLogin, setIsLogin] = useState(true)

  return (
    <Card className="w-full max-w-md p-6 bg-gray-800/30 border-0">
      <h2 className="text-2xl font-bold mb-6">{isLogin ? "Login" : "Sign Up"}</h2>
      <form className="space-y-4">
        <div className="space-y-2">
          <label className="text-sm text-gray-400">Email</label>
          <Input type="email" placeholder="Enter your email" />
        </div>
        <div className="space-y-2">
          <label className="text-sm text-gray-400">Password</label>
          <Input type="password" placeholder="Enter your password" />
        </div>
        <Button className="w-full">{isLogin ? "Login" : "Sign Up"}</Button>
        <p className="text-center text-sm text-gray-400">
          {isLogin ? "Don't have an account? " : "Already have an account? "}
          <button
            type="button"
            className="text-blue-400 hover:underline"
            onClick={() => setIsLogin(!isLogin)}
          >
            {isLogin ? "Sign Up" : "Login"}
          </button>
        </p>
      </form>
    </Card>
  )
} 