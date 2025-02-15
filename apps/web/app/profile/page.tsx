"use client"

import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { User, Settings, Medal, BarChart, Calendar, Trophy, Clock } from "lucide-react"

export default function ProfilePage() {
  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-2xl font-bold lg:text-3xl">Profile</h1>
          <p className="text-gray-400 mt-1">Manage your account and view progress</p>
        </div>
        <Button variant="ghost" size="icon">
          <Settings className="w-5 h-5" />
        </Button>
      </div>

      {/* Profile Overview */}
      <div className="grid gap-6 lg:grid-cols-3">
        <Card className="p-6 bg-gray-800/30 border-0 lg:col-span-2">
          <div className="flex items-center gap-6">
            <div className="w-24 h-24 rounded-full bg-gray-700 flex items-center justify-center">
              <User className="w-12 h-12 text-gray-400" />
            </div>
            <div>
              <h2 className="text-2xl font-bold">John Doe</h2>
              <p className="text-gray-400">@johndoe</p>
              <div className="flex gap-4 mt-4">
                <span className="text-sm text-gray-400">
                  <Trophy className="w-4 h-4 inline mr-1" /> Level 12
                </span>
                <span className="text-sm text-gray-400">
                  <Calendar className="w-4 h-4 inline mr-1" /> Joined March 2024
                </span>
              </div>
            </div>
          </div>
        </Card>

        <Card className="p-6 bg-gray-800/30 border-0">
          <h3 className="font-semibold mb-4">Current Streak</h3>
          <div className="text-3xl font-bold mb-2">7 Days</div>
          <p className="text-sm text-gray-400">Keep going! You're doing great!</p>
        </Card>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <Card className="p-6 bg-gray-800/30 border-0">
          <Medal className="w-5 h-5 text-yellow-400 mb-4" />
          <div className="text-2xl font-bold mb-1">24</div>
          <div className="text-sm text-gray-400">Challenges Won</div>
        </Card>
        <Card className="p-6 bg-gray-800/30 border-0">
          <BarChart className="w-5 h-5 text-green-400 mb-4" />
          <div className="text-2xl font-bold mb-1">87%</div>
          <div className="text-sm text-gray-400">Goal Completion</div>
        </Card>
        <Card className="p-6 bg-gray-800/30 border-0">
          <Clock className="w-5 h-5 text-blue-400 mb-4" />
          <div className="text-2xl font-bold mb-1">156h</div>
          <div className="text-sm text-gray-400">Total Active Time</div>
        </Card>
        <Card className="p-6 bg-gray-800/30 border-0">
          <Trophy className="w-5 h-5 text-purple-400 mb-4" />
          <div className="text-2xl font-bold mb-1">15</div>
          <div className="text-sm text-gray-400">Achievements</div>
        </Card>
      </div>

      {/* Recent Activity */}
      <Card className="p-6 bg-gray-800/30 border-0">
        <h3 className="font-semibold mb-4">Recent Activity</h3>
        <div className="space-y-4">
          {[1, 2, 3].map((i) => (
            <div key={i} className="flex items-center gap-4 p-3 rounded-lg bg-gray-800/30">
              <div className="w-10 h-10 rounded-full bg-blue-500/20 flex items-center justify-center">
                <Trophy className="w-5 h-5 text-blue-400" />
              </div>
              <div className="flex-1">
                <p className="font-medium">Completed Morning Workout</p>
                <p className="text-sm text-gray-400">2 hours ago</p>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  )
} 