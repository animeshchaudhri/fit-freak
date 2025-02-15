"use client"

import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Image from "next/image"
import { Calendar, Clock, Users } from "lucide-react"

const upcomingClasses = [
  {
    id: 1,
    title: "Morning HIIT Blast",
    instructor: "Mike Johnson",
    time: "08:00 AM",
    duration: "45 min",
    participants: 24,
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/hiit-class.jpg"
  },
  {
    id: 2,
    title: "Yoga Flow",
    instructor: "Sarah Chen",
    time: "10:00 AM",
    duration: "60 min",
    participants: 18,
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/yoga-class.jpg"
  }
]

export function LiveClasses() {
  return (
    <div className="space-y-6 p-4">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Live Classes</h2>
        <Button variant="outline">Schedule View</Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {upcomingClasses.map((class_) => (
          <Card key={class_.id} className="bg-gray-800/30 border-0 overflow-hidden">
            <div className="relative h-48">
              <Image 
                src={class_.image} 
                alt={class_.title}
                fill
                className="object-cover"
              />
              <div className="absolute top-4 right-4">
                <span className="bg-red-500 px-2 py-1 rounded-full text-sm">
                  LIVE
                </span>
              </div>
            </div>
            <div className="p-4">
              <h3 className="text-xl font-bold mb-2">{class_.title}</h3>
              <p className="text-gray-400 mb-4">with {class_.instructor}</p>
              <div className="flex gap-4 text-sm text-gray-400">
                <div className="flex items-center gap-1">
                  <Clock className="w-4 h-4" />
                  {class_.time}
                </div>
                <div className="flex items-center gap-1">
                  <Calendar className="w-4 h-4" />
                  {class_.duration}
                </div>
                <div className="flex items-center gap-1">
                  <Users className="w-4 h-4" />
                  {class_.participants}
                </div>
              </div>
              <Button className="w-full mt-4">Join Class</Button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  )
}