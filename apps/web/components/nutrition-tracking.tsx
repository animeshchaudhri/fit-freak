"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts"

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"]

export function NutritionTracking() {
  const [meals, setMeals] = useState([])
  const [newMeal, setNewMeal] = useState({ name: "", calories: "" })

  const addMeal = () => {
    if (newMeal.name && newMeal.calories) {
      setMeals([...meals, { ...newMeal, calories: Number.parseInt(newMeal.calories) }])
      setNewMeal({ name: "", calories: "" })
    }
  }

  const totalCalories = meals.reduce((sum, meal) => sum + meal.calories, 0)

  const data = [
    { name: "Protein", value: 30 },
    { name: "Carbs", value: 40 },
    { name: "Fat", value: 30 },
  ]

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Nutrition Tracking</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card className="p-4">
          <h3 className="text-lg font-semibold mb-4">Add Meal</h3>
          <div className="space-y-4">
            <Input
              placeholder="Meal name"
              value={newMeal.name}
              onChange={(e) => setNewMeal({ ...newMeal, name: e.target.value })}
            />
            <Input
              type="number"
              placeholder="Calories"
              value={newMeal.calories}
              onChange={(e) => setNewMeal({ ...newMeal, calories: e.target.value })}
            />
            <Button onClick={addMeal} className="w-full">
              Add Meal
            </Button>
          </div>
        </Card>
        <Card className="p-4">
          <h3 className="text-lg font-semibold mb-4">Today's Meals</h3>
          <div className="space-y-2">
            {meals.map((meal, index) => (
              <div key={index} className="flex justify-between">
                <span>{meal.name}</span>
                <span>{meal.calories} cal</span>
              </div>
            ))}
          </div>
          <div className="mt-4 pt-4 border-t border-gray-700">
            <div className="flex justify-between font-semibold">
              <span>Total Calories</span>
              <span>{totalCalories} cal</span>
            </div>
          </div>
        </Card>
      </div>
      <Card className="mt-4 p-4">
        <h3 className="text-lg font-semibold mb-4">Macronutrient Breakdown</h3>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie data={data} cx="50%" cy="50%" labelLine={false} outerRadius={80} fill="#8884d8" dataKey="value">
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
        </div>
        <div className="mt-4 flex justify-center space-x-4">
          {data.map((entry, index) => (
            <div key={entry.name} className="flex items-center">
              <div className="w-3 h-3 rounded-full mr-2" style={{ backgroundColor: COLORS[index % COLORS.length] }} />
              <span>{entry.name}</span>
            </div>
          ))}
        </div>
      </Card>
    </div>
  )
}

