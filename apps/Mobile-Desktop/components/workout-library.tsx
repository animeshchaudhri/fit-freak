"use client"

import { useState } from "react"
import { useRouter } from 'next/navigation' // Correct import for routing
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { PlaceholderImage } from "@/components/ui/placeholder-image"
import { Play, Clock, Flame, Lock } from "lucide-react"
import { WorkoutView } from "./workout/workout-view"


const workouts = [
  {
    name: "Arms Strength Workout",
    duration: "10 min",
    level: "Intermediate",
    calories: "150",
    instructor: "jassi bassi",
    route: "/armLiveWorkout", // Add route for the arms workout
  },
  {
    name: "Full Body Blast",
    duration: "10 min",
    level: "Advanced",
    calories: "200",
    instructor: "jaskeerat Singh",
    route: "/fullBodyLiveWorkout", // Add route for the full body workout
  },
  {
    name: "Core Crusher",
    duration: "20 min",
    level: "Beginner",
    calories: "180",
    instructor: "lol man",
  },
  {
    name: "Leg Day Burn",
    duration: "30 min",
    level: "Intermediate",
    calories: "300",
    instructor: "joker ",
  },
  {
    name: "HIIT Cardio",
    duration: "25 min",
    level: "Advanced",
    calories: "350",
    instructor: "batman",
  },
  {
    name: "Flexibility Flow",
    duration: "40 min",
    level: "Beginner",
    calories: "220",
    instructor: "hello world",
  },
  {
    name: "Plank & Core Challenge",
    duration: "15 min",
    level: "Intermediate",
    calories: "130",
    instructor: "hey there",
  },
  {
    name: "Evening Walk & Stretch",
    duration: "30 min",
    level: "Beginner",
    calories: "170",
    instructor: "ligma",
  }
];

export function WorkoutLibrary() {
  const [selectedWorkout, setSelectedWorkout] = useState(null)

  // If a workout is selected, show the workout view
  if (selectedWorkout) {
    return (
      <WorkoutView 
        workout={selectedWorkout}
        onComplete={() => setSelectedWorkout(null)}
      />
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center py-20">
        <h2 className="text-2xl font-bold">Workout Library</h2>
        <Button variant="outline">Filter</Button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {workouts.map((workout, index) => (
          <Card
            key={index}
            className={`overflow-hidden border-0 transition-all ${
              index < 2
                ? "shadow-lg shadow-yellow-400/50 animate-slow-bounce cursor-pointer bg-gray-800/70"
                : "opacity-50 cursor-not-allowed bg-gray-900"
            }`}
          >
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
              <Button
                className="w-full gap-2"
                disabled={index >= 2}
                onClick={() => index < 2 && setSelectedWorkout(workout)}
              >
                {index < 2 ? (
                  <>
                    Start Workout
                    <Play className="w-4 h-4" />
                  </>
                ) : (
                  <>
                    Locked
                    <Lock className="w-4 h-4" />
                  </>
                )}
              </Button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  )
}