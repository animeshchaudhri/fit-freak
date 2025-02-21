"use client"

import { Activity, Dumbbell, Trophy, Video, User, LogOut } from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { routes } from "@/app/routes"
import { Button } from "@/components/ui/button"
import { useAuth } from "@/components/auth/auth-provider"
import { useUserStore } from "@/store/userstore"

const navItems = [
  { icon: Activity, label: "Activity", href: routes.activity },
  { icon: Dumbbell, label: "Workouts Module", href: routes.workouts },
  { icon: Trophy, label: "Instant Workout", href: routes.challenges },
  { icon: Video, label: "Live", href: routes.live },
  { icon: User, label: "Profile", href: routes.profile },
  { icon: User, label: "Start New Challenge", href: routes.startchallenge },
  { icon: User, label: "Dashboard", href: routes.dashboard },
]

export function DesktopSidebar({ className }: { className?: string }) {
  const pathname = usePathname()
  const user = useUserStore((state) => state.user)
  const { signOut } = useAuth()

  return (
    <div className={cn("w-64 border-r border-gray-800 p-4", className)}>
      <div className="flex flex-col h-full">
        <div className="mb-8">
          <h1 className="text-2xl font-bold">FitTrack</h1>
        </div>

        <nav className="space-y-2 flex-1">
          {navItems.map((item) => {
            const isActive = pathname === item.href
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex items-center gap-3 px-3 py-2 rounded-lg transition-colors",
                  isActive 
                    ? "bg-gray-800/50 text-blue-400" 
                    : "text-gray-400 hover:text-gray-300 hover:bg-gray-800/30"
                )}
              >
                <item.icon className="w-5 h-5" />
                <span>{item.label}</span>
              </Link>
            )
          })}
        </nav>

        <div className="border-t border-gray-800 pt-4 mt-4">
          <div className="flex items-center gap-3 px-3 py-2 mb-4">
            <div className="w-8 h-8 rounded-full bg-gray-800 flex items-center justify-center">
              <User className="w-4 h-4 text-gray-400" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium truncate">
                {user ? `${user.first_name} ${user.last_name}` : 'Loading...'}
              </p>
            </div>
          </div>
          <Button 
            variant="ghost" 
            className="w-full justify-start text-red-400 hover:text-red-300 hover:bg-red-400/10"
            onClick={signOut}
          >
            <LogOut className="w-4 h-4 mr-2" />
            Sign Out
          </Button>
        </div>
      </div>
    </div>
  )
}