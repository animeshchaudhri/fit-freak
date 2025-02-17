"use client"

import { useAuth } from "@/components/auth/auth-provider"
import { useRouter } from "next/navigation"
import { routes } from "@/lib/routes"
import { useEffect } from "react"
import Image from "next/image"
import { PLACEHOLDER_IMAGES } from "@/lib/image-constants"
import { getAccessToken } from "@/utils/tokenManager"



export default function HomePage() {
  const { user, isLoading } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!isLoading) {
   
        const accessToken = getAccessToken()
        if (!accessToken) {
          router.push(routes.login)
        }
        else {
          router.push(routes.activity)
        }
      
    }
  }, [user, isLoading, router])

  // Show loading state while checking auth
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    )
  }

 
  return null
}

