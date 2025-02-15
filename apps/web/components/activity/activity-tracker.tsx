"use client"

import { Card } from "../ui/card"
import { Activity, Heart, Timer } from "lucide-react"
import CircularProgress from "../ui/circular-progress"

const activityMetrics = [
  {
    icon: Activity,
    label: "Steps",
    value: "8,439",
    goal: "10,000",
    progress: 84,
    color: "text-blue-400",
  },
  {
    icon: Timer,
    label: "Active Minutes",
    value: "45",
    goal: "60",
    progress: 75,
    color: "text-green-400",
  },
  {
    icon: Heart,
    label: "Heart Points",
    value: "89",
    goal: "100",
    progress: 89,
    color: "text-red-400",
  },
]

export function ActivityTracker() {
  return (
    <>
      {activityMetrics.map((metric) => (
        <Card key={metric.label} className="p-4 bg-gray-800/30 border-0">
          <div className="flex items-center justify-between mb-2">
            <metric.icon className={`w-5 h-5 ${metric.color}`} />
            <CircularProgress 
              progress={metric.progress} 
              size={40} 
              strokeWidth={4}
              progressColor={metric.color.replace('text-', 'rgb-')} 
            />
          </div>
          <div className="space-y-1">
            <h3 className="text-sm font-medium text-gray-400">{metric.label}</h3>
            <p className="text-2xl font-bold">{metric.value}</p>
            <p className="text-xs text-gray-400">Goal: {metric.goal}</p>
          </div>
        </Card>
      ))}
    </>
  )
} 