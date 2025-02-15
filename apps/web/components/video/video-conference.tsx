"use client"

import { useState } from "react"
import { Card } from "../ui/card"
import { Button } from "../ui/button"
import { Video, Mic, MicOff, VideoOff, Users } from "lucide-react"

export function VideoConference() {
  const [isMuted, setIsMuted] = useState(false)
  const [isVideoOn, setIsVideoOn] = useState(true)

  return (
    <div className="h-full flex flex-col">
      <div className="flex-1 bg-gray-900 rounded-lg relative mb-4">
        <div className="absolute bottom-4 right-4 flex gap-2">
          <Button
            variant="ghost"
            size="icon"
            className="bg-gray-800/50"
            onClick={() => setIsMuted(!isMuted)}
          >
            {isMuted ? <MicOff className="h-5 w-5" /> : <Mic className="h-5 w-5" />}
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="bg-gray-800/50"
            onClick={() => setIsVideoOn(!isVideoOn)}
          >
            {isVideoOn ? <Video className="h-5 w-5" /> : <VideoOff className="h-5 w-5" />}
          </Button>
        </div>
      </div>
      <div className="grid grid-cols-4 gap-2">
        <Card className="aspect-video bg-gray-800/30 border-0" />
        <Card className="aspect-video bg-gray-800/30 border-0" />
        <Card className="aspect-video bg-gray-800/30 border-0" />
        <Card className="aspect-video bg-gray-800/30 border-0" />
      </div>
    </div>
  )
} 