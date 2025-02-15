"use client"

import { Activity, Dumbbell, Trophy, Video, User } from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { routes } from "@/app/routes"

const navItems = [
  { icon: Activity, label: "Activity", href: routes.activity },
  { icon: Dumbbell, label: "Workouts", href: routes.workouts },
  { icon: Trophy, label: "Challenges", href: routes.challenges },
  { icon: Video, label: "Live", href: routes.live },
  { icon: User, label: "Profile", href: routes.profile },
]

export function MobileNav({ className }: { className?: string }) {
  const pathname = usePathname()

  return (
    <nav className={cn("bg-gray-900/95 backdrop-blur-lg border-t border-gray-800", className)}>
      <div className="flex justify-around">
        {navItems.map((item) => {
          const isActive = pathname === item.href
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex flex-col items-center gap-1 p-3 text-sm transition-colors",
                isActive ? "text-blue-400" : "text-gray-400 hover:text-gray-300"
              )}
            >
              <item.icon className="w-6 h-6" />
              <span className="text-xs">{item.label}</span>
            </Link>
          )
        })}
      </div>
    </nav>
  )
} 