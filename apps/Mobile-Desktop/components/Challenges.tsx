"use client"

import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Image from "next/image"

const activeChallenges = [
  {
    id: 1,
    title: "30 Days of Yoga",
    description: "Complete daily yoga sessions for 30 days",
    progress: 70,
    participants: 1234,
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/yoga-challenge.jpg",
    daysLeft: 12
  },
  {
    id: 2,
    title: "10K Steps Daily",
    description: "Walk 10,000 steps every day for a month",
    progress: 45,
    participants: 2567,
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/walking-challenge.jpg",
    daysLeft: 20
  }
]

export function Challenges() {
  return (
    <div className="space-y-6 p-4">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Active Challenges</h2>
        <Button variant="outline">Create Challenge</Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {activeChallenges.map((challenge) => (
          <Card key={challenge.id} className="bg-gray-800/30 border-0 overflow-hidden">
            <div className="relative h-48">
              <Image 
                src={challenge.image} 
                alt={challenge.title}
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              <div className="absolute bottom-4 left-4 right-4">
                <h3 className="text-xl font-bold text-white">{challenge.title}</h3>
                <p className="text-sm text-gray-200">{challenge.description}</p>
              </div>
            </div>
            <div className="p-4 space-y-4">
              <div className="flex justify-between text-sm text-gray-400">
                <span>{challenge.participants} participants</span>
                <span>{challenge.daysLeft} days left</span>
              </div>
              <div className="w-full bg-gray-700 rounded-full h-2">
                <div 
                  className="bg-pink-500 h-2 rounded-full" 
                  style={{ width: `${challenge.progress}%` }}
                />
              </div>
              <Button className="w-full">Join Challenge</Button>
            </div>
          </Card>
        ))}
      </div>

      <div className="mt-8">
        <h2 className="text-2xl font-bold mb-4">Upcoming Challenges</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card className="bg-gray-800/30 border-0 p-4">
            <div className="text-center space-y-2">
              <h3 className="font-semibold">Summer Fitness Challenge</h3>
              <p className="text-sm text-gray-400">Starting in 5 days</p>
              <Button variant="outline" className="w-full">Remind Me</Button>
            </div>
          </Card>
        </div>
      </div>
    </div>
  )
}