"use client"

import { useState, useEffect } from "react"
import { useAuth } from "@/components/auth/auth-provider"
import { useRouter } from "next/navigation"
import { routes } from "@/lib/routes"
import { toast } from "sonner"
import api from "@/lib/api-client"
import { AnimatePresence, motion } from "framer-motion"
import { ChevronRight, ArrowRight, ArrowLeft, User, Activity, Target } from "lucide-react"

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
  const stepIcons = [
    <User key="user" className="w-6 h-6" />,
    <Activity key="activity" className="w-6 h-6" />,
    <Target key="target" className="w-6 h-6" />
  ]


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
       
        height: Number(formData.height),
        weight: Number(formData.weight),
        age: Number(formData.age)
      }

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
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white">
      {/* Progress Steps */}
      <div className="fixed top-0 left-0 w-full bg-gray-900/50 backdrop-blur-lg border-b border-gray-800 z-50">
        <div className="container max-w-6xl mx-auto px-6 py-4">
          <div className="flex justify-between items-center">
            {[1, 2, 3].map((stepNumber) => (
              <div key={stepNumber} className="flex items-center">
                <motion.div
                // @ts-ignore
                  className={`flex items-center justify-center w-10 h-10 rounded-full ${
                    step >= stepNumber ? 'bg-primary' : 'bg-gray-800'
                  } transition-colors duration-300`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {stepNumber === 1 && <User className="w-5 h-5" />}
                  {stepNumber === 2 && <Activity className="w-5 h-5" />}
                  {stepNumber === 3 && <Target className="w-5 h-5" />}
                </motion.div>
                {stepNumber < 3 && (
                  <div className={`h-1 w-16 md:w-24 mx-2 ${
                    step > stepNumber ? 'bg-primary' : 'bg-gray-800'
                  } transition-colors duration-300`} />
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
  
      <div className="container max-w-3xl mx-auto px-4 pt-32 pb-12">
        <AnimatePresence mode="wait">
          <motion.div
            key={step}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}

            // @ts-ignore
            className="space-y-8"
          >
            {/* Step 1: Personal Info */}
            {step === 1 && (
              <div className="space-y-8">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  // @ts-ignore
                  className="space-y-3"
                >
                  <div className="inline-flex px-4 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium">
                    Step 1 of 3
                  </div>
                  <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
                    Let's Get Started
                  </h1>
                  <p className="text-gray-400 text-lg">Tell us a bit about yourself.</p>
                </motion.div>
  
                <div className="grid gap-6">
                  {[
                    { label: "First Name", key: "first_name" },
                    { label: "Last Name", key: "last_name" },
                    { label: "Phone Number", key: "phone" }
                  ].map((field, index) => (
                    <motion.div
                      key={field.key}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      // @ts-ignore
                      className="space-y-2"
                    >
                      <label className="text-sm font-medium text-gray-300">{field.label}</label>
                      <input
                        type="text"
                        value={formData[field.key as keyof typeof formData]}
                        onChange={e => setFormData({...formData, [field.key]: e.target.value})}
                        className="w-full px-6 py-4 rounded-xl bg-gray-800/50 border border-gray-700 focus:border-primary focus:ring-1 focus:ring-primary text-white placeholder:text-gray-500 transition-all backdrop-blur-sm"
                        placeholder={`Enter your ${field.label.toLowerCase()}`}
                      />
                    </motion.div>
                  ))}
                </div>
              </div>
            )}
  
            {/* Step 2: Physical Details */}
            {step === 2 && (
              <div className="space-y-8">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  // @ts-ignore
                  className="space-y-3"
                >
                  <div className="inline-flex px-4 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium">
                    Step 2 of 3
                  </div>
                  <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
                    Physical Details
                  </h1>
                  <p className="text-gray-400 text-lg">Help us understand your body better.</p>
                </motion.div>
  
                <div className="grid gap-6">
                  <div className="grid grid-cols-2 gap-6">
                     {/*  @ts-ignore */}
                    <motion.div className="space-y-2" whileHover={{ scale: 1.02 }}>
                      <label className="text-sm font-medium text-gray-300">Height (cm)</label>
                      <input
                        type="number"
                        value={formData.height}
                        onChange={e => setFormData({...formData, height: e.target.value})}
                        className="w-full px-6 py-4 rounded-xl bg-gray-800/50 border border-gray-700 focus:border-primary focus:ring-1 focus:ring-primary text-white placeholder:text-gray-500 transition-all backdrop-blur-sm"
                        placeholder="Height"
                      />
                    </motion.div>
                    {/*  @ts-ignore */}
                    <motion.div className="space-y-2" whileHover={{ scale: 1.02 }}>
                      <label className="text-sm font-medium text-gray-300">Weight (kg)</label>
                      <input
                        type="number"
                        value={formData.weight}
                        onChange={e => setFormData({...formData, weight: e.target.value})}
                        className="w-full px-6 py-4 rounded-xl bg-gray-800/50 border border-gray-700 focus:border-primary focus:ring-1 focus:ring-primary text-white placeholder:text-gray-500 transition-all backdrop-blur-sm"
                        placeholder="Weight"
                      />
                    </motion.div>
                  </div>
  
                  <div className="grid grid-cols-2 gap-6">
                     {/*  @ts-ignore */}
                    <motion.div className="space-y-2" whileHover={{ scale: 1.02 }}>
                      <label className="text-sm font-medium text-gray-300">Age</label>
                      <input
                        type="number"
                        value={formData.age}
                        onChange={e => setFormData({...formData, age: e.target.value})}
                        className="w-full px-6 py-4 rounded-xl bg-gray-800/50 border border-gray-700 focus:border-primary focus:ring-1 focus:ring-primary text-white placeholder:text-gray-500 transition-all backdrop-blur-sm"
                        placeholder="Age"
                      />
                    </motion.div>
                     {/*  @ts-ignore */}
                    <motion.div className="space-y-2" whileHover={{ scale: 1.02 }}>
                      <label className="text-sm font-medium text-gray-300">Gender</label>
                      <select
                        value={formData.gender}
                        onChange={e => setFormData({...formData, gender: e.target.value})}
                        className="w-full px-6 py-4 rounded-xl bg-gray-800/50 border border-gray-700 focus:border-primary focus:ring-1 focus:ring-primary text-white placeholder:text-gray-500 transition-all backdrop-blur-sm"
                      >
                        <option value="">Select Gender</option>
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                        <option value="other">Other</option>
                        <option value="prefer-not-to-say">Prefer not to say</option>
                      </select>
                    </motion.div>
                  </div>
  
                  <div className="space-y-4">
                    <label className="text-sm font-medium text-gray-300">Activity Level</label>
                    <div className="grid gap-4">
                      {activityLevels.map((level, index) => (
                        <motion.button
                          key={level.value}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: index * 0.1 }}
                          whileHover={{ scale: 1.02 }}
                           /*  @ts-ignore */
                          onClick={() => setFormData({...formData, activity_level: level.value})}
                          className={`w-full p-6 rounded-xl text-left transition-all flex items-center space-x-4
                            ${formData.activity_level === level.value 
                              ? 'bg-gradient-to-r from-primary to-blue-600 text-white shadow-lg shadow-primary/20' 
                              : 'bg-gray-800/50 hover:bg-gray-700/50 text-gray-300 border border-gray-700'}
                          `}
                        >
                           {/*  @ts-ignore */}
                          <span className="text-2xl">{level.icon}</span>
                          <div>
                            <div className="font-semibold">{level.label}</div>
                            <div className="text-sm text-gray-400">{level.desc}</div>
                          </div>
                        </motion.button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}
  
            {/* Step 3: Fitness Goals */}
            {step === 3 && (
              <div className="space-y-8">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                   /*  @ts-ignore */
                  className="space-y-3"
                >
                  <div className="inline-flex px-4 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium">
                    Step 3 of 3
                  </div>
                  <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
                    Your Goals
                  </h1>
                  <p className="text-gray-400 text-lg">Select all that apply to you.</p>
                </motion.div>
  
                <div className="grid gap-4 md:grid-cols-2">
                  {fitnessGoals.map((goal, index) => (
                    <motion.button
                      key={goal.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      whileHover={{ scale: 1.02 }}

                        // @ts-ignore
                      onClick={() => setFormData({
                        ...formData,
                        fitness_goals: formData.fitness_goals.includes(goal.id)
                          ? formData.fitness_goals.filter(g => g !== goal.id)
                          : [...formData.fitness_goals, goal.id]
                      })}
                      className={`p-6 rounded-xl text-left transition-all group relative overflow-hidden
                        ${formData.fitness_goals.includes(goal.id)
                          ? 'bg-gradient-to-r from-primary to-blue-600 text-black shadow-lg shadow-primary/20'
                          : 'bg-gray-800/50 hover:bg-gray-700/50 text-gray-300 border border-gray-700'}
                      `}
                    >
                      <div className="flex items-center space-x-3">
                          {/* @ts-ignore  */}
                        <span className="text-2xl">{goal.icon}</span>
                        <div>
                          <div className="font-semibold">{goal.id}</div>
                          <div className="text-sm text-gray-400 group-hover:text-gray-300">{goal.desc}</div>
                        </div>
                      </div>
                    </motion.button>
                  ))}
                </div>
              </div>
            )}
          </motion.div>
        </AnimatePresence>
  
        {/* Navigation Buttons */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
            //  @ts-ignore *
          className="mt-12 flex justify-between items-center"
        >
          {step > 1 && (
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              //  @ts-ignore 
              onClick={() => setStep(step - 1)}
              className="flex items-center space-x-2 text-gray-400 hover:text-white transition-colors group"
            >
              <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
              <span>Back</span>
            </motion.button>
          )}
  
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
              // @ts-ignore 
            onClick={step === 3 ? handleSubmit : () => setStep(step + 1)}
            className="ml-auto flex items-center space-x-2 px-8 py-4 bg-primary rounded-xl hover:bg-primary/90 transition-colors group"
            disabled={isSubmitting}
          >
            <span className="text-black">{step === 3 ? (isSubmitting ? 'Submitting...' : 'Complete Setup') : 'Continue'}</span>
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform text-black" />
          </motion.button>
        </motion.div>
      </div>
    </div>
  )
}
