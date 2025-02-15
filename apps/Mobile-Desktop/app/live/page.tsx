import { LiveSessions } from "@/components/live/live-sessions"

export default function LivePage() {
  return (
    <div className="container max-w-md mx-auto p-4 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Live Sessions</h1>
          <p className="text-gray-400">Join live workout sessions</p>
        </div>
      </div>
      <LiveSessions />
    </div>
  )
}

