import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { PlaceholderImage } from "@/components/ui/placeholder-image"
import { Play, Clock, Flame, ChevronRight } from "lucide-react"

const workouts = [
  {
    name: "Full Body HIIT",
    duration: "30 min",
    level: "Intermediate",
    calories: "300",
    instructor: "Alex Smith",
  },
  {
    name: "Yoga Flow",
    duration: "45 min",
    level: "Beginner",
    calories: "200",
    instructor: "Sarah Chen",
  },
  {
    name: "Strength Training",
    duration: "60 min",
    level: "Advanced",
    calories: "450",
    instructor: "Mike Johnson",
  },
  // Add more workouts...
]

export function WorkoutLibrary() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Workout Library</h2>
        <Button variant="outline">Filter</Button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {workouts.map((workout, index) => (
          <Card key={index} className="overflow-hidden bg-gray-800/30 border-0 hover:bg-gray-800/50 transition-colors">
            <div className="relative aspect-video">
              <PlaceholderImage className="absolute inset-0" />
            </div>
            <div className="p-5 space-y-4">
              <div>
                <h3 className="text-lg font-semibold mb-1">{workout.name}</h3>
                <p className="text-sm text-gray-400">with {workout.instructor}</p>
              </div>
              <div className="flex items-center gap-4 text-sm text-gray-300">
                <div className="flex items-center gap-1.5">
                  <Clock className="w-4 h-4" />
                  {workout.duration}
                </div>
                <div className="flex items-center gap-1.5">
                  <Flame className="w-4 h-4" />
                  {workout.calories} cal
                </div>
              </div>
              <Button className="w-full gap-2">
                Start Workout
                <Play className="w-4 h-4" />
              </Button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  )
}

