"use client"

import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Users, Clock } from "lucide-react"
import CircularProgress from "@/components/ui/circular-progress"
import { CHALLENGE_IMAGES } from "@/lib/image-constants"
import Image from "next/image"

const activeChallenges = [
  {
    id: 1,
    title: "30 Days of Yoga",
    description: "Complete daily yoga sessions for 30 days",
    progress: 70,
    participants: 1234,
    daysLeft: 12,
    color: "text-purple-400",
    image: CHALLENGE_IMAGES.yoga
  },
  {
    id: 2,
    title: "10K Steps Daily",
    description: "Walk 10,000 steps every day for a month",
    progress: 45,
    participants: 2567,
    daysLeft: 20,
    color: "text-blue-400",
    image: CHALLENGE_IMAGES.steps
  }
]

export function Challenges() {
  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {activeChallenges.map((challenge) => (
        <Card 
          key={challenge.id} 
          className="overflow-hidden bg-gray-800/30 border-0 hover:bg-gray-800/40 transition-colors"
        >
          <div className="relative h-48">
            <Image
              src={challenge.image}
              alt={challenge.title}
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
          </div>
          <div className="p-4">
            <div className="flex justify-between items-start mb-2">
              <div className="space-y-1">
                <h3 className="font-semibold">{challenge.title}</h3>
                <p className="text-sm text-gray-400">{challenge.description}</p>
              </div>
              <CircularProgress 
                progress={challenge.progress} 
                size={40} 
                strokeWidth={4} 
                progressColor={challenge.color.replace('text-', 'rgb-')}
              />
            </div>
            <div className="flex items-center gap-4 mt-4 text-sm text-gray-400">
              <div className="flex items-center gap-1">
                <Users className="w-4 h-4" />
                {challenge.participants.toLocaleString()}
              </div>
              <div className="flex items-center gap-1">
                <Clock className="w-4 h-4" />
                {challenge.daysLeft} days left
              </div>
            </div>
            <Button className="w-full mt-4">Join Challenge</Button>
          </div>
        </Card>
      ))}
    </div>
  )
} 