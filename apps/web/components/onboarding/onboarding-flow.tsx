"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useAuth } from "@/components/auth/auth-provider"
import { ArrowLeft, ArrowRight } from "lucide-react"

const steps = [
  {
    title: "Basic Information",
    description: "Let's get to know you better to personalize your fitness journey.",
    fields: [
      { label: "Full Name", type: "text", key: "name", required: true },
      { label: "Age", type: "number", key: "age", required: true },
      { 
        label: "Gender", 
        type: "select", 
        key: "gender",
        options: ["Male", "Female", "Other"],
        required: true 
      },
    ],
  },
  {
    title: "Body Metrics",
    description: "Help us calculate your fitness metrics accurately.",
    fields: [
      { label: "Height (cm)", type: "number", key: "height", required: true },
      { label: "Weight (kg)", type: "number", key: "weight", required: true },
      {
        label: "Activity Level",
        type: "select",
        key: "activityLevel",
        options: [
          "Sedentary (office job)",
          "Lightly Active (1-2 days/week)",
          "Moderately Active (3-5 days/week)",
          "Very Active (6-7 days/week)",
          "Athlete (2x training/day)",
        ],
        required: true
      },
    ],
  },
  {
    title: "Fitness Goals",
    description: "Tell us what you want to achieve.",
    fields: [
      {
        label: "Primary Goal",
        type: "select",
        key: "primaryGoal",
        options: [
          "Lose Weight",
          "Build Muscle",
          "Improve Endurance",
          "Increase Strength",
          "Overall Fitness",
        ],
        required: true
      },
      {
        label: "Weekly Exercise Target",
        type: "select",
        key: "weeklyTarget",
        options: [
          "1-2 days per week",
          "3-4 days per week",
          "5-6 days per week",
          "Every day",
        ],
        required: true
      },
      {
        label: "Preferred Workout Time",
        type: "select",
        key: "workoutTime",
        options: [
          "Early Morning",
          "Morning",
          "Afternoon",
          "Evening",
          "Late Night",
        ],
        required: true
      },
    ],
  },
  {
    title: "Exercise Experience",
    description: "Help us understand your fitness background.",
    fields: [
      {
        label: "Experience Level",
        type: "select",
        key: "experienceLevel",
        options: [
          "Beginner (New to exercise)",
          "Intermediate (Some experience)",
          "Advanced (Regular exerciser)",
          "Expert (Trained athlete)",
        ],
        required: true
      },
      {
        label: "Preferred Exercises",
        type: "multiselect",
        key: "preferredExercises",
        options: [
          "Weight Training",
          "Cardio",
          "HIIT",
          "Yoga",
          "Pilates",
          "Running",
          "Swimming",
          "Cycling",
        ],
        required: true
      },
      {
        label: "Any injuries or limitations?",
        type: "textarea",
        key: "limitations",
        placeholder: "e.g., knee injury, back pain, etc.",
        required: false
      },
    ],
  },
]

export function OnboardingFlow() {
  const [currentStep, setCurrentStep] = useState(0)
  const [formData, setFormData] = useState<Record<string, any>>({})
  const { completeOnboarding } = useAuth()

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1)
    } else {
      // Calculate BMI and other metrics
      const bmi = formData.weight / Math.pow(formData.height / 100, 2)
      const userData = {
        ...formData,
        bmi: bmi.toFixed(1),
        onboardingCompleted: true,
        onboardingDate: new Date().toISOString(),
      }
      localStorage.setItem('userData', JSON.stringify(userData))
      completeOnboarding()
    }
  }

  const isStepValid = () => {
    const currentFields = steps[currentStep].fields
    return currentFields.every(field => 
      !field.required || (formData[field.key] && formData[field.key].length > 0)
    )
  }

  const step = steps[currentStep]
  const isLastStep = currentStep === steps.length - 1

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-b from-gray-900 to-black">
      <Card className="w-full max-w-2xl p-8 bg-gray-800/30 border-0">
        <div className="space-y-6">
          {/* Progress Bar */}
          <div className="w-full bg-gray-700 h-1 rounded-full overflow-hidden">
            <div 
              className="bg-blue-500 h-full transition-all duration-300"
              style={{ width: `${((currentStep + 1) / steps.length) * 100}%` }}
            />
          </div>

          <div className="space-y-2">
            <h1 className="text-2xl font-bold">{step.title}</h1>
            <p className="text-gray-400">{step.description}</p>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            {step.fields.map((field) => (
              <div key={field.key} className={`space-y-2 ${
                field.type === 'textarea' ? 'md:col-span-2' : ''
              }`}>
                <label className="text-sm text-gray-400">
                  {field.label}
                  {field.required && <span className="text-red-400 ml-1">*</span>}
                </label>
                {field.type === 'select' ? (
                  <select
                    className="w-full bg-gray-800 border border-gray-700 rounded-lg p-2"
                    onChange={(e) => 
                      setFormData({ ...formData, [field.key]: e.target.value })
                    }
                    value={formData[field.key] || ""}
                  >
                    <option value="">Select an option</option>
                    {field.options?.map((option) => (
                      <option key={option} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>
                ) : field.type === 'multiselect' ? (
                  <div className="grid grid-cols-2 gap-2">
                    {field.options?.map((option) => (
                      <label key={option} className="flex items-center space-x-2">
                        <input
                          type="checkbox"
                          checked={formData[field.key]?.includes(option)}
                          onChange={(e) => {
                            const current = formData[field.key] || []
                            const updated = e.target.checked
                              ? [...current, option]
                              : current.filter((item: string) => item !== option)
                            setFormData({ ...formData, [field.key]: updated })
                          }}
                          className="rounded border-gray-700 bg-gray-800"
                        />
                        <span className="text-sm">{option}</span>
                      </label>
                    ))}
                  </div>
                ) : field.type === 'textarea' ? (
                  <textarea
                    className="w-full bg-gray-800 border border-gray-700 rounded-lg p-2"
                    rows={3}
                    placeholder={field.placeholder}
                    onChange={(e) =>
                      setFormData({ ...formData, [field.key]: e.target.value })
                    }
                    value={formData[field.key] || ""}
                  />
                ) : (
                  <Input
                    type={field.type}
                    onChange={(e) =>
                      setFormData({ ...formData, [field.key]: e.target.value })
                    }
                    value={formData[field.key] || ""}
                    placeholder={field.placeholder}
                  />
                )}
              </div>
            ))}
          </div>

          <div className="flex justify-between items-center pt-4">
            <Button
              variant="ghost"
              onClick={() => setCurrentStep(currentStep - 1)}
              disabled={currentStep === 0}
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Button>
            <div className="flex items-center gap-2">
              {steps.map((_, i) => (
                <div
                  key={i}
                  className={`w-2 h-2 rounded-full transition-colors ${
                    i === currentStep ? "bg-blue-400" : 
                    i < currentStep ? "bg-blue-400/50" : "bg-gray-600"
                  }`}
                />
              ))}
            </div>
            <Button 
              onClick={handleNext}
              disabled={!isStepValid()}
            >
              {isLastStep ? (
                "Start Your Journey"
              ) : (
                <>
                  Next
                  <ArrowRight className="w-4 h-4 ml-2" />
                </>
              )}
            </Button>
          </div>
        </div>
      </Card>
    </div>
  )
} 