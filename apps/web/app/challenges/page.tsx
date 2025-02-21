// @ts-nocheck
"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Play, Clock, Flame } from "lucide-react"
import Image from "next/image"
import { WORKOUT_IMAGES } from "@/lib/image-constants"

const exercises = [
  {
    name: "Push-Ups",
    image: WORKOUT_IMAGES.pushups,
    duration: "5 min",
    level: "Beginner",
    calories: "50",
    instructor: "Trainer Alex",
    route: "/pushupsLive",
  },
  {
    name: "Pull-Ups",
    image: WORKOUT_IMAGES.pullups,
    duration: "10 min",
    level: "Intermediate",
    calories: "100",
    instructor: "Coach Ryan",
    route: "/pullupsLive",
  },
  {
    name: "Shoulder Press",
    image: WORKOUT_IMAGES.shoulderPress,
    duration: "8 min",
    level: "Advanced",
    calories: "120",
    instructor: "Coach Sarah",
  },
  {
    name: "Squats",
    image: WORKOUT_IMAGES.squats,
    duration: "12 min",
    level: "Beginner",
    calories: "80",
    instructor: "Trainer Mike",
  },
  {
    name: "Plank Hold",
    image: WORKOUT_IMAGES.plank,
    duration: "3 min",
    level: "Advanced",
    calories: "40",
    instructor: "Coach Emma",
  },
  {
    name: "Lunges",
    image: WORKOUT_IMAGES.lunges,
    duration: "7 min",
    level: "Intermediate",
    calories: "90",
    instructor: "Trainer Sophia",
  }
];

export default function ExerciseLibrary() {
  const [selectedExercise, setSelectedExercise] = useState(null)

  if (selectedExercise) {
    return (
      <ExerciseView 
        exercise={selectedExercise}
        onComplete={() => setSelectedExercise(null)}
      />
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center py-20">
        <h2 className="text-2xl font-bold">Exercise Library</h2>
        <Button variant="outline">Filter</Button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {exercises.map((exercise, index) => (
          <Card
            key={index}
            className="overflow-hidden border-0 transition-all shadow-lg shadow-blue-400/50 animate-slow-bounce cursor-pointer bg-gray-800/70"
          >
            <div className="relative aspect-video">
              <Image
                src={exercise.image}
                alt={exercise.name}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                priority={index < 2}
              />
            </div>
            <div className="p-5 space-y-4">
              <div>
                <h3 className="text-lg font-semibold mb-1">{exercise.name}</h3>
                <p className="text-sm text-gray-400">with {exercise.instructor}</p>
              </div>
              <div className="flex items-center gap-4 text-sm text-gray-300">
                <div className="flex items-center gap-1.5">
                  <Clock className="w-4 h-4" />
                  {exercise.duration}
                </div>
                <div className="flex items-center gap-1.5">
                  <Flame className="w-4 h-4" />
                  {exercise.calories} cal
                </div>
              </div>
              <Button
                className="w-full gap-2"
                onClick={() => setSelectedExercise(exercise)}
              >
                Start Exercise
                <Play className="w-4 h-4" />
              </Button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  )
}
