"use client"

import { AuthForm } from "@/components/auth/auth-form"
import { useAuth } from "@/components/auth/auth-provider"
import { useRouter } from "next/navigation"
import { routes } from "@/lib/routes"
import { useEffect } from "react"
import Image from "next/image"
import { PLACEHOLDER_IMAGES } from "@/lib/image-constants"

export default function LoginPage() {
  const { user, isLoading } = useAuth()
  const router = useRouter()

  // useEffect(() => {
  //   if (!isLoading && user) {
  //     if (!user.onboardingCompleted) {
  //       router.push(routes.onboarding)
  //     } else {
  //       router.push(routes.activity)
  //     }
  //   }
  // }, [user, isLoading, router])

  if (isLoading) {
    return <div>Loading...</div>
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
          <div className="max-w-xl text-white">
            <h1 className="text-5xl font-bold mb-6">Welcome Back</h1>
            <p className="text-xl text-gray-200">
              Continue your fitness journey with us
            </p>
          </div>
        </div>
      </div>

      {/* Auth Section */}
      <div className="flex-1 flex items-center justify-center p-8">
        <AuthForm defaultIsLogin={true} />
      </div>
    </div>
  )
} 