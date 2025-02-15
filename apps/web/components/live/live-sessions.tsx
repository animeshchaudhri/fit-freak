"use client"

import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Users, Clock, Video } from "lucide-react"

const sessions = [
  {
    id: 1,
    title: "Morning HIIT",
    instructor: "Sarah Chen",
    time: "08:00 AM",
    duration: "45 min",
    participants: 24,
    status: "live"
  },
  {
    id: 2,
    title: "Yoga Flow",
    instructor: "Mike Johnson",
    time: "10:00 AM",
    duration: "60 min",
    participants: 18,
    status: "upcoming"
  }
]

export function LiveSessions() {
  return (
    <div className="space-y-4">
      {sessions.map((session) => (
        <Card 
          key={session.id} 
          className="p-4 bg-gray-800/30 border-0 hover:bg-gray-800/40 transition-colors"
        >
          <div className="flex justify-between items-start mb-2">
            <div className="space-y-1">
              <h3 className="font-semibold">{session.title}</h3>
              <p className="text-sm text-gray-400">with {session.instructor}</p>
            </div>
            {session.status === "live" && (
              <span className="px-2 py-1 text-xs font-medium bg-red-500/20 text-red-400 rounded-full">
                LIVE
              </span>
            )}
          </div>
          <div className="flex items-center gap-4 mt-4 text-sm text-gray-400">
            <div className="flex items-center gap-1">
              <Clock className="w-4 h-4" />
              {session.time} • {session.duration}
            </div>
            <div className="flex items-center gap-1">
              <Users className="w-4 h-4" />
              {session.participants}
            </div>
          </div>
          <Button className="w-full mt-4 gap-2">
            <Video className="w-4 h-4" />
            {session.status === "live" ? "Join Session" : "Set Reminder"}
          </Button>
        </Card>
      ))}
    </div>
  )
} 