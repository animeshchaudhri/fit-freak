"use client"

import { useAuth } from "@/components/auth/auth-provider"
import { useRouter } from "next/navigation"
import { routes } from "@/lib/routes"
import { useEffect } from "react"
import { ActivityTracker } from "@/components/activity/activity-tracker"
import { Card } from "@/components/ui/card"
import { Activity, Dumbbell, Timer } from "lucide-react"

export default function ActivityPage() {
  const { user, isLoading } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!isLoading && !user) {
      router.push(routes.home)
    }
  }, [user, isLoading, router])

  if (isLoading) {
    return <div>Loading...</div>
  }

  return (
    <div className="space-y-8">
      {/* Header with Date Selector */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold lg:text-3xl">Activity Dashboard</h1>
          <p className="text-gray-400 mt-1">Track your daily progress and achievements</p>
        </div>
        <select className="bg-gray-800/50 border-0 rounded-lg px-4 py-2">
          <option>Today</option>
          <option>This Week</option>
          <option>This Month</option>
        </select>
      </div>

      {/* Main Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <ActivityTracker />
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="p-6 bg-gray-800/30 border-0">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-lg font-semibold">Weekly Activity</h2>
              <p className="text-sm text-gray-400">Your activity trends</p>
            </div>
            <Activity className="w-5 h-5 text-blue-400" />
          </div>
          <div className="h-64 flex items-center justify-center text-gray-500">
            Activity Chart Placeholder
          </div>
        </Card>

        <Card className="p-6 bg-gray-800/30 border-0">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-lg font-semibold">Workout Distribution</h2>
              <p className="text-sm text-gray-400">Types of exercises</p>
            </div>
            <Dumbbell className="w-5 h-5 text-green-400" />
          </div>
          <div className="h-64 flex items-center justify-center text-gray-500">
            Distribution Chart Placeholder
          </div>
        </Card>
      </div>

      {/* Recent Activities */}
      <Card className="p-6 bg-gray-800/30 border-0">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-lg font-semibold">Recent Activities</h2>
            <p className="text-sm text-gray-400">Your latest workout sessions</p>
          </div>
          <Timer className="w-5 h-5 text-purple-400" />
        </div>
        <div className="space-y-4">
          {[1, 2, 3].map((i) => (
            <div key={i} className="flex items-center gap-4 p-4 rounded-lg bg-gray-800/30">
              <div className="w-10 h-10 rounded-full bg-blue-500/20 flex items-center justify-center">
                <Dumbbell className="w-5 h-5 text-blue-400" />
              </div>
              <div className="flex-1">
                <h3 className="font-medium">Morning Workout</h3>
                <p className="text-sm text-gray-400">45 minutes • 300 calories</p>
              </div>
              <span className="text-sm text-gray-400">2h ago</span>
            </div>
          ))}
        </div>
      </Card>
    </div>
  )
} 