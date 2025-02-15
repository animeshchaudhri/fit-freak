import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import {
  Home,
  Dumbbell,
  Utensils,
  Users,
  Flag,
  Calendar,
  ShoppingBag,
  Video,
  Camera,
  Target,
  BookOpen,
  MessageSquare,
  Settings,
} from "lucide-react"
import Link from "next/link"

const sidebarItems = [
  { icon: Home, label: "Home", href: "/" },
  { icon: Dumbbell, label: "Workouts", href: "/workouts" },
  { icon: Utensils, label: "Nutrition", href: "/nutrition" },
  { icon: Users, label: "Social", href: "/social" },
  { icon: Flag, label: "Challenges", href: "/challenges" },
  { icon: Calendar, label: "Planner", href: "/planner" },
  { icon: ShoppingBag, label: "Store", href: "/store" },
  { icon: Video, label: "Live Classes", href: "/live" },
  { icon: Camera, label: "Progress", href: "/progress" },
  { icon: Target, label: "Goals", href: "/goals" },
  { icon: BookOpen, label: "Blog", href: "/blog" },
  { icon: MessageSquare, label: "Trainers", href: "/trainers" },
  { icon: Settings, label: "Settings", href: "/settings" },
]

export function Sidebar({ className = "" }) {
  return (
    <div className={`w-64 bg-gray-900 border-r border-gray-800 ${className}`}>
      <div className="p-4">
        <h1 className="text-2xl font-bold">Fitness Hub</h1>
      </div>
      <ScrollArea className="h-[calc(100vh-5rem)]">
        <nav className="space-y-2 p-2">
          {sidebarItems.map((item) => (
            <Link key={item.href} href={item.href}>
              <Button variant="ghost" className="w-full justify-start">
                <item.icon className="mr-2 h-4 w-4" />
                {item.label}
              </Button>
            </Link>
          ))}
        </nav>
      </ScrollArea>
    </div>
  )
}

