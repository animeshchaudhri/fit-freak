"use client"

import { useState, useEffect } from "react"
import { useAuth } from "@/components/auth/auth-provider"
import { useRouter } from "next/navigation"
import { routes } from "@/lib/routes"
import { toast } from "sonner"
import api from "@/lib/api-client"
import { motion } from "framer-motion"
import { ChevronRight, ArrowRight, ArrowLeft } from "lucide-react"

export default function OnboardingPage() {
  const { user, completeOnboarding } = useAuth()
  const router = useRouter()
  const [step, setStep] = useState(1)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    phone: "",
    height: "",
    weight: "",
    gender: "",
    age: "",
    activity_level: "",
    fitness_goals: [] as string[]
  })

  const activityLevels = [
    { value: "Sedentary", label: "Sedentary", desc: "Little to no exercise" },
    { value: "Lightly Active", label: "Light exercise 1-3 days/week" },
    { value: "Moderately Active", label: "Moderate exercise 3-5 days/week" },
    { value: "Very Active", label: "Hard exercise 6-7 days/week" },
    { value: "Extremely Active", label: "Very hard exercise & physical job" }
  ]

  const fitnessGoals = [
    { id: 'Weight Loss', desc: 'Reduce body fat and get leaner' },
    { id: 'Muscle Gain', desc: 'Build strength and muscle mass' },
    { id: 'Improve Endurance', desc: 'Improve stamina and cardiovascular health' },
    { id: 'Increase Flexibility', desc: 'Enhance mobility and flexibility' },
    { id: 'Better Health', desc: 'Improve overall wellbeing' },
    { id: 'Sports Performance', desc: 'Enhance athletic capabilities' }
  ]

  // Handle auth redirect
  useEffect(() => {
    if (!user) {
      router.push(routes.login)
      return
    }
  }, [user, router])

  const handleSubmit = async () => {
    if (isSubmitting) return
    setIsSubmitting(true)

    try {
      // Validate step 3 before submission
      if (!formData.fitness_goals.length) {
        toast.error('Please select at least one fitness goal')
        setIsSubmitting(false)
        return
      }

      const profileData = {
        ...formData,
        id: user?.id,
        height: Number(formData.height),
        weight: Number(formData.weight),
        age: Number(formData.age)
      }

      await api.post('/v1/user/create-user', profileData)
      await completeOnboarding(profileData)
      toast.success('Profile completed!')
      router.push(routes.activity)
    } catch (error: any) {
      const errorMessage = error.response?.data?.message
      if (Array.isArray(errorMessage)) {
        // Show first validation error
        toast.error(errorMessage[0]?.msg || 'Failed to save profile')
      } else {
        toast.error(errorMessage || 'Failed to save profile')
      }
    } finally {
      setIsSubmitting(false)
    }
  }

  if (!user) return null

  const nextStep = () => {
    if (step === 1) {
      if (!formData.first_name || formData.first_name.length < 2 || formData.first_name.length > 50) {
        toast.error('First name must be between 2 and 50 characters')
        return
      }
      if (!formData.last_name || formData.last_name.length < 2 || formData.last_name.length > 50) {
        toast.error('Last name must be between 2 and 50 characters')
        return
      }
      if (!formData.phone || !/^\+?[\d\s-]+$/.test(formData.phone)) {
        toast.error('Please enter a valid phone number')
        return
      }
    }

    if (step === 2) {
      const height = Number(formData.height)
      const weight = Number(formData.weight)
      const age = Number(formData.age)

      if (!formData.height || height < 50 || height > 300) {
        toast.error('Height must be between 50 and 300 cm')
        return
      }
      if (!formData.weight || weight < 20 || weight > 500) {
        toast.error('Weight must be between 20 and 500 kg')
        return
      }
      if (!formData.age || age < 13 || age > 120) {
        toast.error('Age must be between 13 and 120 years')
        return
      }
      if (!formData.gender) {
        toast.error('Please select your gender')
        return
      }
      if (!formData.activity_level) {
        toast.error('Please select your activity level')
        return
      }
    }

    if (step === 3) {
      handleSubmit()
      return
    }

    setStep(step + 1)
  }

  const prevStep = () => {
    if (step > 1) setStep(step - 1)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white font-sans">
      {/* Progress bar */}
      <div className="fixed top-0 left-0 w-full h-1 bg-gray-800">
        <motion.div 
          className="h-full bg-primary"
          initial={{ width: "0%" }}
          animate={{ width: `${(step / 3) * 100}%` }}
          transition={{ duration: 0.3 }}
        />
      </div>

      <div className="container max-w-3xl mx-auto px-6 py-12 min-h-screen flex flex-col justify-center">
        <motion.div
          key={step}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-10"
        >
          {step === 1 && (
            <div className="space-y-10">
              <div className="space-y-3">
                <div className="inline-flex items-center px-4 py-2 rounded-full bg-gradient-to-r from-primary to-blue-600 text-white text-sm">
                  Step 1 of 3
                </div>
                <h1 className="text-5xl font-extrabold">Let's Get to Know You</h1>
                <p className="text-gray-300">We'll personalize your experience based on the information you provide.</p>
              </div>
              
              <div className="grid gap-8">
                <div className="space-y-4">
                  <label className="text-sm font-medium">First Name</label>
                  <input
                    type="text"
                    value={formData.first_name}
                    onChange={e => setFormData({...formData, first_name: e.target.value})}
                    className="w-full px-6 py-4 rounded-lg bg-gray-800 border-2 border-transparent focus:border-primary focus:ring-1 focus:ring-primary text-white placeholder:text-gray-400 transition-all"
                    placeholder="Enter your first name"
                  />
                </div>
                <div className="space-y-4">
                  <label className="text-sm font-medium">Last Name</label>
                  <input
                    type="text"
                    value={formData.last_name}
                    onChange={e => setFormData({...formData, last_name: e.target.value})}
                    className="w-full px-6 py-4 rounded-lg bg-gray-800 border-2 border-transparent focus:border-primary focus:ring-1 focus:ring-primary text-white placeholder:text-gray-400 transition-all"
                    placeholder="Enter your last name"
                  />
                </div>
                <div className="space-y-4">
                  <label className="text-sm font-medium">Phone Number</label>
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={e => setFormData({...formData, phone: e.target.value})}
                    className="w-full px-6 py-4 rounded-lg bg-gray-800 border-2 border-transparent focus:border-primary focus:ring-1 focus:ring-primary text-white placeholder:text-gray-400 transition-all"
                    placeholder="Enter your phone number"
                  />
                </div>
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-10">
              <div className="space-y-3">
                <div className="inline-flex items-center px-4 py-2 rounded-full bg-gradient-to-r from-primary to-blue-600 text-white text-sm">
                  Step 2 of 3
                </div>
                <h1 className="text-5xl font-extrabold">Physical Information</h1>
                <p className="text-gray-300">Let's gather some information about your body.</p>
              </div>

              <div className="grid gap-8">
                <div className="grid grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <label className="text-sm font-medium">Height (cm)</label>
                    <input
                      type="number"
                      value={formData.height}
                      onChange={e => setFormData({...formData, height: e.target.value})}
                      className="w-full px-6 py-4 rounded-lg bg-gray-800 border-2 border-transparent focus:border-primary focus:ring-1 focus:ring-primary text-white placeholder:text-gray-400 transition-all"
                      placeholder="Enter your height"
                      min="50"
                      max="300"
                    />
                  </div>
                  <div className="space-y-4">
                    <label className="text-sm font-medium">Weight (kg)</label>
                    <input
                      type="number"
                      value={formData.weight}
                      onChange={e => setFormData({...formData, weight: e.target.value})}
                      className="w-full px-6 py-4 rounded-lg bg-gray-800 border-2 border-transparent focus:border-primary focus:ring-1 focus:ring-primary text-white placeholder:text-gray-400 transition-all"
                      placeholder="Enter your weight"
                      min="30"
                      max="500"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <label className="text-sm font-medium">Age</label>
                    <input
                      type="number"
                      value={formData.age}
                      onChange={e => setFormData({...formData, age: e.target.value})}
                      className="w-full px-6 py-4 rounded-lg bg-gray-800 border-2 border-transparent focus:border-primary focus:ring-1 focus:ring-primary text-white placeholder:text-gray-400 transition-all"
                      placeholder="Enter your age"
                      min="13"
                      max="120"
                    />
                  </div>
                  <div className="space-y-4">
                    <label className="text-sm font-medium">Gender</label>
                    <select
                      value={formData.gender}
                      onChange={e => setFormData({...formData, gender: e.target.value})}
                      className="w-full px-6 py-4 rounded-lg bg-gray-800 border-2 border-transparent focus:border-primary focus:ring-1 focus:ring-primary text-white placeholder:text-gray-400 transition-all"
                    >
                      <option value="">Select Gender</option>
                      <option value="male">Male</option>
                      <option value="female">Female</option>
                      <option value="other">Other</option>
                      <option value="prefer-not-to-say">Prefer not to say</option>
                    </select>
                  </div>
                </div>

                <div className="space-y-4">
                  <label className="text-sm font-medium">Activity Level</label>
                  <div className="grid gap-4">
                    {activityLevels.map(level => (
                      <button
                        key={level.value}
                        type="button"
                        onClick={() => setFormData({...formData, activity_level: level.value})}
                        className={`w-full p-6 rounded-xl text-left transition-all 
                          ${formData.activity_level === level.value ? 'bg-gradient-to-r from-primary to-blue-600 text-white' : 'bg-gray-800 hover:bg-gray-700 text-gray-300'}
                        `}
                      >
                        <div className="font-semibold">{level.label}</div>
                        <div className="text-sm text-gray-400">{level.desc}</div>
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="space-y-10">
              <div className="space-y-3">
                <div className="inline-flex items-center px-4 py-2 rounded-full bg-gradient-to-r from-primary to-blue-600 text-white text-sm">
                  Step 3 of 3
                </div>
                <h1 className="text-5xl font-extrabold">Select Your Fitness Goals</h1>
                <p className="text-gray-300">Let us know your fitness goals to tailor the experience.</p>
              </div>

              <div className="grid gap-8">
                {fitnessGoals.map(goal => (
                  <button
                    key={goal.id}
                    type="button"
                    onClick={() => setFormData({
                      ...formData,
                      fitness_goals: formData.fitness_goals.includes(goal.id)
                        ? formData.fitness_goals.filter(g => g !== goal.id)
                        : [...formData.fitness_goals, goal.id]
                    })}
                    className={`w-full p-6 rounded-xl text-left transition-all 
                      ${formData.fitness_goals.includes(goal.id) ? 'bg-gradient-to-r from-primary to-blue-600 text-white' : 'bg-gray-800 hover:bg-gray-700 text-gray-300'}
                    `}
                  >
                    <div className="font-semibold">{goal.id}</div>
                    <div className="text-sm text-gray-400">{goal.desc}</div>
                  </button>
                ))}
              </div>
            </div>
          )}
        </motion.div>

        <div className="mt-10 flex justify-between items-center">
          {step > 1 && (
            <button
              type="button"
              onClick={prevStep}
              className="flex items-center text-white hover:text-primary transition-all"
            >
              <ArrowLeft className="mr-2" />
              Back
            </button>
          )}

          <button
            type="button"
            onClick={nextStep}
            className="px-8 py-4 bg-primary text-white rounded-lg hover:bg-primary/80 transition-all"
          >
            {step === 3 ? (isSubmitting ? 'Submitting...' : 'Complete Setup') : 'Next'}
            {isSubmitting && (
              <motion.div
                className="ml-3"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
              >
                <ArrowRight className="animate-spin" />
              </motion.div>
            )}
          </button>
        </div>
      </div>
    </div>
  )
}
