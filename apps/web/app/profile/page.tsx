"use client"

import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { User, Settings, Medal, BarChart, Calendar, Trophy, Clock, LogOut } from "lucide-react"
import { useUserStore } from "@/store/userstore"
import { formatDistance } from "date-fns"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { sign } from "crypto"
import { useAuth } from "@/components/auth/auth-provider"

export default function ProfilePage() {
  const user = useUserStore((state) => state.user)
  const { signOut } = useAuth()

  if (!user) {
    return <div>Loading...</div>
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-2xl font-bold lg:text-3xl">Profile</h1>
          <p className="text-gray-400 mt-1">Manage your account and view progress</p>
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon">
              <Settings className="w-5 h-5" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-48">
            <DropdownMenuItem 
              className="text-red-500 focus:text-red-500" 
              onClick={signOut}

            >
              <LogOut className="w-4 h-4 mr-2" />
              Sign Out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {/* Profile Overview */}
      <div className="grid gap-6 lg:grid-cols-3">
        <Card className="p-6 bg-gray-800/30 border-0 lg:col-span-2">
          <div className="flex items-center gap-6">
            <div className="w-24 h-24 rounded-full bg-gray-700 flex items-center justify-center">
              <User className="w-12 h-12 text-gray-400" />
            </div>
            <div>
              <h2 className="text-2xl font-bold">{`${user.first_name} ${user.last_name}`}</h2>
              <p className="text-gray-400">{user.email}</p>
              <div className="flex gap-4 mt-4">
                <span className="text-sm text-gray-400">
                  <Trophy className="w-4 h-4 inline mr-1" /> 
                  {user.fitness_goals?.join(", ") || "No goals set"}
                </span>
                <span className="text-sm text-gray-400">
                  <Calendar className="w-4 h-4 inline mr-1" /> 
                  {user.createdAt ? formatDistance(new Date(user.createdAt), new Date(), { addSuffix: true }) : 'unknown'}
                </span>
              </div>
            </div>
          </div>
        </Card>

        <Card className="p-6 bg-gray-800/30 border-0">
          <h3 className="font-semibold mb-4">Activity Level</h3>
          <div className="text-xl font-bold mb-2">{user.activity_level}</div>
          <p className="text-sm text-gray-400">Your current activity level</p>
        </Card>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <Card className="p-6 bg-gray-800/30 border-0">
          <Medal className="w-5 h-5 text-yellow-400 mb-4" />
          <div className="text-2xl font-bold mb-1">{user.height}</div>
          <div className="text-sm text-gray-400">Height (cm)</div>
        </Card>
        <Card className="p-6 bg-gray-800/30 border-0">
          <BarChart className="w-5 h-5 text-green-400 mb-4" />
          <div className="text-2xl font-bold mb-1">{user.weight}</div>
          <div className="text-sm text-gray-400">Weight (kg)</div>
        </Card>
        <Card className="p-6 bg-gray-800/30 border-0">
          <Clock className="w-5 h-5 text-blue-400 mb-4" />
          <div className="text-2xl font-bold mb-1">{user.age}</div>
          <div className="text-sm text-gray-400">Age</div>
        </Card>
        <Card className="p-6 bg-gray-800/30 border-0">
          <Trophy className="w-5 h-5 text-purple-400 mb-4" />
          <div className="text-2xl font-bold mb-1">{user.gender}</div>
          <div className="text-sm text-gray-400">Gender</div>
        </Card>
      </div>

      {/* Fitness Goals */}
      <Card className="p-6 bg-gray-800/30 border-0">
        <h3 className="font-semibold mb-4">Fitness Goals</h3>
        <div className="space-y-4">
          {user.fitness_goals?.map((goal, index) => (
            <div key={index} className="flex items-center gap-4 p-3 rounded-lg bg-gray-800/30">
              <div className="w-10 h-10 rounded-full bg-blue-500/20 flex items-center justify-center">
                <Trophy className="w-5 h-5 text-blue-400" />
              </div>
              <div className="flex-1">
                <p className="font-medium">{goal}</p>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  )
}