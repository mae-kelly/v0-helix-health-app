"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { useAppStore, type UserProfile } from "@/lib/store"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import {
  Dna,
  ArrowRight,
  ArrowLeft,
  Check,
  Dumbbell,
  Apple,
  Moon,
  Pill,
  Heart,
  Target,
  Clock,
  Sparkles,
  User,
  Stethoscope,
} from "lucide-react"
import { cn } from "@/lib/utils"

const STEPS = [
  { id: "role", title: "Your Role", icon: User },
  { id: "goals", title: "Health Goals", icon: Target },
  { id: "fitness", title: "Fitness Level", icon: Dumbbell },
  { id: "nutrition", title: "Nutrition", icon: Apple },
  { id: "sleep", title: "Sleep", icon: Moon },
  { id: "supplements", title: "Supplements", icon: Pill },
  { id: "conditions", title: "Health History", icon: Heart },
  { id: "motivation", title: "Motivation", icon: Sparkles },
  { id: "timeline", title: "Timeline", icon: Clock },
]

const GOALS = [
  { id: "weight-loss", label: "Lose Weight", icon: "📉" },
  { id: "muscle-gain", label: "Build Muscle", icon: "💪" },
  { id: "energy", label: "Increase Energy", icon: "⚡" },
  { id: "sleep-quality", label: "Better Sleep", icon: "😴" },
  { id: "mental-clarity", label: "Mental Clarity", icon: "🧠" },
  { id: "longevity", label: "Longevity", icon: "🧬" },
  { id: "gut-health", label: "Gut Health", icon: "🦠" },
  { id: "hormone-balance", label: "Hormone Balance", icon: "⚖️" },
  { id: "stress-reduction", label: "Reduce Stress", icon: "🧘" },
  { id: "athletic-performance", label: "Athletic Performance", icon: "🏃" },
  { id: "immune-support", label: "Immune Support", icon: "🛡️" },
  { id: "skin-health", label: "Skin Health", icon: "✨" },
]

const FITNESS_LEVELS = [
  { id: "sedentary", label: "Sedentary", desc: "Little to no exercise", color: "destructive" },
  { id: "light", label: "Lightly Active", desc: "Light exercise 1-2 days/week", color: "warning" },
  { id: "moderate", label: "Moderately Active", desc: "Moderate exercise 3-5 days/week", color: "primary" },
  { id: "very-active", label: "Very Active", desc: "Hard exercise 6-7 days/week", color: "success" },
  { id: "athlete", label: "Athlete", desc: "Professional or competitive training", color: "accent" },
]

const DIETARY_PREFS = [
  "No restrictions",
  "Vegetarian",
  "Vegan",
  "Pescatarian",
  "Keto",
  "Paleo",
  "Mediterranean",
  "Low-carb",
  "Gluten-free",
  "Dairy-free",
  "Halal",
  "Kosher",
]

const SUPPLEMENTS = [
  "Multivitamin",
  "Vitamin D",
  "Omega-3",
  "Magnesium",
  "Probiotics",
  "B-Complex",
  "Vitamin C",
  "Zinc",
  "Iron",
  "Creatine",
  "Protein Powder",
  "Collagen",
  "Ashwagandha",
  "None",
]

const CONDITIONS = [
  "None",
  "Diabetes",
  "High Blood Pressure",
  "Heart Disease",
  "Thyroid Issues",
  "Autoimmune Condition",
  "Digestive Issues",
  "Allergies",
  "Anxiety/Depression",
  "Sleep Disorders",
  "Joint Pain",
  "Chronic Fatigue",
]

const TIMELINES = [
  { id: "1-month", label: "1 Month", desc: "Quick wins and foundation" },
  { id: "3-months", label: "3 Months", desc: "Sustainable habit building" },
  { id: "6-months", label: "6 Months", desc: "Major transformation" },
  { id: "12-months", label: "12 Months", desc: "Complete lifestyle overhaul" },
  { id: "ongoing", label: "Ongoing", desc: "Continuous optimization" },
]

export default function OnboardingPage() {
  const router = useRouter()
  const { setOnboardingComplete, setUserProfile, setMode } = useAppStore()
  const [currentStep, setCurrentStep] = useState(0)
  const [isCompleting, setIsCompleting] = useState(false)

  const [formData, setFormData] = useState({
    name: "",
    role: "" as "doctor" | "patient" | "",
    goals: [] as string[],
    fitnessLevel: "",
    dietaryPreferences: [] as string[],
    sleepGoal: 8,
    supplements: [] as string[],
    healthConditions: [] as string[],
    motivation: "",
    timeline: "",
  })

  const toggleSelection = (
    field: "goals" | "dietaryPreferences" | "supplements" | "healthConditions",
    value: string,
  ) => {
    setFormData((prev) => {
      const current = prev[field]
      if (current.includes(value)) {
        return { ...prev, [field]: current.filter((v) => v !== value) }
      }
      return { ...prev, [field]: [...current, value] }
    })
  }

  const canProceed = () => {
    switch (STEPS[currentStep].id) {
      case "role":
        return formData.role !== ""
      case "goals":
        return formData.goals.length > 0
      case "fitness":
        return formData.fitnessLevel !== ""
      case "nutrition":
        return formData.dietaryPreferences.length > 0
      case "sleep":
        return formData.sleepGoal > 0
      case "supplements":
        return formData.supplements.length > 0
      case "conditions":
        return formData.healthConditions.length > 0
      case "motivation":
        return formData.motivation.length > 10
      case "timeline":
        return formData.timeline !== ""
      default:
        return true
    }
  }

  const handleComplete = async () => {
    setIsCompleting(true)
    await new Promise((resolve) => setTimeout(resolve, 2000))

    const profile: UserProfile = {
      name: formData.name || "User",
      email: "user@example.com",
      role: formData.role as "doctor" | "patient",
      goals: formData.goals,
      fitnessLevel: formData.fitnessLevel,
      dietaryPreferences: formData.dietaryPreferences,
      sleepGoal: formData.sleepGoal,
      supplements: formData.supplements,
      healthConditions: formData.healthConditions,
      motivation: formData.motivation,
      timeline: formData.timeline,
    }

    setUserProfile(profile)
    setMode(formData.role as "doctor" | "patient")
    setOnboardingComplete(true)

    router.push(formData.role === "doctor" ? "/doctor" : "/patient")
  }

  const renderStepContent = () => {
    switch (STEPS[currentStep].id) {
      case "role":
        return (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold text-foreground mb-2">Welcome to Helix</h2>
              <p className="text-muted-foreground">Let us know how you will be using the platform</p>
            </div>

            <div className="space-y-2">
              <Label className="text-sm text-muted-foreground">Your Name</Label>
              <Input
                value={formData.name}
                onChange={(e) => setFormData((prev) => ({ ...prev, name: e.target.value }))}
                placeholder="Enter your name"
                className="bg-input border-border h-12"
              />
            </div>

            <div className="grid grid-cols-2 gap-4 mt-6">
              <button
                type="button"
                onClick={() => setFormData((prev) => ({ ...prev, role: "doctor" }))}
                className={cn(
                  "p-6 rounded-xl border-2 transition-all text-left",
                  formData.role === "doctor"
                    ? "border-primary bg-primary/10 neon-glow-cyan"
                    : "border-border bg-card hover:border-primary/50",
                )}
              >
                <Stethoscope
                  className={cn("w-8 h-8 mb-3", formData.role === "doctor" ? "text-primary" : "text-muted-foreground")}
                />
                <h3 className="font-semibold text-foreground">Healthcare Provider</h3>
                <p className="text-sm text-muted-foreground mt-1">Manage patients, review results, approve AI plans</p>
              </button>

              <button
                type="button"
                onClick={() => setFormData((prev) => ({ ...prev, role: "patient" }))}
                className={cn(
                  "p-6 rounded-xl border-2 transition-all text-left",
                  formData.role === "patient"
                    ? "border-accent bg-accent/10 neon-glow-magenta"
                    : "border-border bg-card hover:border-accent/50",
                )}
              >
                <User
                  className={cn("w-8 h-8 mb-3", formData.role === "patient" ? "text-accent" : "text-muted-foreground")}
                />
                <h3 className="font-semibold text-foreground">Patient / User</h3>
                <p className="text-sm text-muted-foreground mt-1">Track health, follow plans, achieve goals</p>
              </button>
            </div>
          </div>
        )

      case "goals":
        return (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold text-foreground mb-2">What are your health goals?</h2>
              <p className="text-muted-foreground">Select all that apply - we will create a personalized plan</p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {GOALS.map((goal) => (
                <button
                  key={goal.id}
                  type="button"
                  onClick={() => toggleSelection("goals", goal.id)}
                  className={cn(
                    "p-4 rounded-xl border transition-all text-left",
                    formData.goals.includes(goal.id)
                      ? "border-primary bg-primary/10 neon-glow-cyan"
                      : "border-border bg-card hover:border-primary/50",
                  )}
                >
                  <span className="text-2xl mb-2 block">{goal.icon}</span>
                  <span className="text-sm font-medium text-foreground">{goal.label}</span>
                </button>
              ))}
            </div>

            {formData.goals.length > 0 && (
              <p className="text-center text-sm text-primary">
                {formData.goals.length} goal{formData.goals.length > 1 ? "s" : ""} selected
              </p>
            )}
          </div>
        )

      case "fitness":
        return (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold text-foreground mb-2">Current fitness level?</h2>
              <p className="text-muted-foreground">Be honest - this helps us create the right plan for you</p>
            </div>

            <div className="space-y-3">
              {FITNESS_LEVELS.map((level) => (
                <button
                  key={level.id}
                  type="button"
                  onClick={() => setFormData((prev) => ({ ...prev, fitnessLevel: level.id }))}
                  className={cn(
                    "w-full p-4 rounded-xl border transition-all text-left flex items-center gap-4",
                    formData.fitnessLevel === level.id
                      ? "border-primary bg-primary/10 neon-glow-cyan"
                      : "border-border bg-card hover:border-primary/50",
                  )}
                >
                  <div
                    className={cn(
                      "w-3 h-3 rounded-full",
                      level.color === "destructive" && "bg-destructive",
                      level.color === "warning" && "bg-warning",
                      level.color === "primary" && "bg-primary",
                      level.color === "success" && "bg-success",
                      level.color === "accent" && "bg-accent",
                    )}
                  />
                  <div>
                    <h3 className="font-semibold text-foreground">{level.label}</h3>
                    <p className="text-sm text-muted-foreground">{level.desc}</p>
                  </div>
                  {formData.fitnessLevel === level.id && <Check className="w-5 h-5 text-primary ml-auto" />}
                </button>
              ))}
            </div>
          </div>
        )

      case "nutrition":
        return (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold text-foreground mb-2">Dietary preferences?</h2>
              <p className="text-muted-foreground">Select all that apply to your current diet</p>
            </div>

            <div className="flex flex-wrap gap-2">
              {DIETARY_PREFS.map((pref) => (
                <button
                  key={pref}
                  type="button"
                  onClick={() => toggleSelection("dietaryPreferences", pref)}
                  className={cn(
                    "px-4 py-2 rounded-full border transition-all text-sm",
                    formData.dietaryPreferences.includes(pref)
                      ? "border-accent bg-accent text-accent-foreground neon-glow-magenta"
                      : "border-border bg-card text-foreground hover:border-accent/50",
                  )}
                >
                  {pref}
                </button>
              ))}
            </div>
          </div>
        )

      case "sleep":
        return (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold text-foreground mb-2">Sleep goals</h2>
              <p className="text-muted-foreground">How many hours of sleep do you want per night?</p>
            </div>

            <div className="flex flex-col items-center gap-6">
              <div className="text-7xl font-bold text-primary neon-text-cyan">{formData.sleepGoal}h</div>

              <input
                type="range"
                min="5"
                max="10"
                step="0.5"
                value={formData.sleepGoal}
                onChange={(e) => setFormData((prev) => ({ ...prev, sleepGoal: Number.parseFloat(e.target.value) }))}
                className="w-full max-w-xs accent-primary"
              />

              <div className="flex justify-between w-full max-w-xs text-sm text-muted-foreground">
                <span>5 hours</span>
                <span>10 hours</span>
              </div>

              <p className="text-sm text-muted-foreground text-center max-w-sm">
                {formData.sleepGoal < 7
                  ? "Consider aiming for more sleep - 7-9 hours is optimal for most adults"
                  : formData.sleepGoal > 9
                    ? "Great ambition! Make sure your schedule allows for this"
                    : "Perfect target for optimal recovery and cognitive function"}
              </p>
            </div>
          </div>
        )

      case "supplements":
        return (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold text-foreground mb-2">Current supplements?</h2>
              <p className="text-muted-foreground">Select any supplements you are currently taking</p>
            </div>

            <div className="flex flex-wrap gap-2">
              {SUPPLEMENTS.map((supp) => (
                <button
                  key={supp}
                  type="button"
                  onClick={() => toggleSelection("supplements", supp)}
                  className={cn(
                    "px-4 py-2 rounded-full border transition-all text-sm",
                    formData.supplements.includes(supp)
                      ? "border-success bg-success text-success-foreground neon-glow-lime"
                      : "border-border bg-card text-foreground hover:border-success/50",
                  )}
                >
                  {supp}
                </button>
              ))}
            </div>
          </div>
        )

      case "conditions":
        return (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold text-foreground mb-2">Health history</h2>
              <p className="text-muted-foreground">Any conditions we should know about?</p>
            </div>

            <div className="flex flex-wrap gap-2">
              {CONDITIONS.map((condition) => (
                <button
                  key={condition}
                  type="button"
                  onClick={() => toggleSelection("healthConditions", condition)}
                  className={cn(
                    "px-4 py-2 rounded-full border transition-all text-sm",
                    formData.healthConditions.includes(condition)
                      ? "border-warning bg-warning text-warning-foreground"
                      : "border-border bg-card text-foreground hover:border-warning/50",
                  )}
                >
                  {condition}
                </button>
              ))}
            </div>

            <p className="text-xs text-muted-foreground text-center">
              This information is kept private and only used to personalize your health plan
            </p>
          </div>
        )

      case "motivation":
        return (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold text-foreground mb-2">What drives you?</h2>
              <p className="text-muted-foreground">Tell us why health matters to you</p>
            </div>

            <Textarea
              value={formData.motivation}
              onChange={(e) => setFormData((prev) => ({ ...prev, motivation: e.target.value }))}
              placeholder="I want to have more energy to play with my kids, perform better at work, and feel confident in my body..."
              className="min-h-[150px] bg-input border-border resize-none"
            />

            <div className="flex flex-wrap gap-2">
              {["More energy", "Look better", "Live longer", "Better performance", "Be a role model"].map((quick) => (
                <button
                  key={quick}
                  type="button"
                  onClick={() =>
                    setFormData((prev) => ({
                      ...prev,
                      motivation: prev.motivation + (prev.motivation ? ", " : "") + quick.toLowerCase(),
                    }))
                  }
                  className="px-3 py-1 rounded-full border border-border bg-card text-xs text-muted-foreground hover:border-primary/50 transition-all"
                >
                  + {quick}
                </button>
              ))}
            </div>
          </div>
        )

      case "timeline":
        return (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold text-foreground mb-2">Your timeline</h2>
              <p className="text-muted-foreground">When do you want to see results?</p>
            </div>

            <div className="space-y-3">
              {TIMELINES.map((timeline) => (
                <button
                  key={timeline.id}
                  type="button"
                  onClick={() => setFormData((prev) => ({ ...prev, timeline: timeline.id }))}
                  className={cn(
                    "w-full p-4 rounded-xl border transition-all text-left",
                    formData.timeline === timeline.id
                      ? "border-primary bg-primary/10 neon-glow-cyan"
                      : "border-border bg-card hover:border-primary/50",
                  )}
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-semibold text-foreground">{timeline.label}</h3>
                      <p className="text-sm text-muted-foreground">{timeline.desc}</p>
                    </div>
                    {formData.timeline === timeline.id && <Check className="w-5 h-5 text-primary" />}
                  </div>
                </button>
              ))}
            </div>
          </div>
        )

      default:
        return null
    }
  }

  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-accent/5 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 max-w-2xl mx-auto px-4 py-8">
        {/* Progress */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <Dna className="w-6 h-6 text-primary" />
              <span className="font-semibold text-foreground">Helix</span>
            </div>
            <span className="text-sm text-muted-foreground">
              Step {currentStep + 1} of {STEPS.length}
            </span>
          </div>

          {/* Progress bar */}
          <div className="h-1 bg-secondary rounded-full overflow-hidden">
            <div
              className="h-full bg-primary transition-all duration-500 neon-glow-cyan"
              style={{ width: `${((currentStep + 1) / STEPS.length) * 100}%` }}
            />
          </div>

          {/* Step indicators */}
          <div className="flex justify-between mt-4">
            {STEPS.map((step, index) => {
              const Icon = step.icon
              return (
                <button
                  key={step.id}
                  type="button"
                  onClick={() => index < currentStep && setCurrentStep(index)}
                  disabled={index > currentStep}
                  className={cn(
                    "w-8 h-8 rounded-full flex items-center justify-center transition-all",
                    index < currentStep
                      ? "bg-primary text-primary-foreground cursor-pointer"
                      : index === currentStep
                        ? "bg-primary/20 text-primary border-2 border-primary"
                        : "bg-secondary text-muted-foreground",
                  )}
                >
                  {index < currentStep ? <Check className="w-4 h-4" /> : <Icon className="w-4 h-4" />}
                </button>
              )
            })}
          </div>
        </div>

        {/* Content */}
        <div className="glass-card rounded-2xl p-8 mb-6">{renderStepContent()}</div>

        {/* Navigation */}
        <div className="flex gap-4">
          {currentStep > 0 && (
            <Button variant="outline" onClick={() => setCurrentStep((prev) => prev - 1)} className="flex-1 h-12">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Button>
          )}

          {currentStep < STEPS.length - 1 ? (
            <Button
              onClick={() => setCurrentStep((prev) => prev + 1)}
              disabled={!canProceed()}
              className="flex-1 h-12 bg-primary hover:bg-primary/90 text-primary-foreground neon-glow-cyan"
            >
              Continue
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          ) : (
            <Button
              onClick={handleComplete}
              disabled={!canProceed() || isCompleting}
              className="flex-1 h-12 bg-primary hover:bg-primary/90 text-primary-foreground neon-glow-cyan"
            >
              {isCompleting ? (
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 border-2 border-primary-foreground border-t-transparent rounded-full animate-spin" />
                  <span>Creating your plan...</span>
                </div>
              ) : (
                <div className="flex items-center gap-2">
                  <Sparkles className="w-4 h-4" />
                  <span>Complete Setup</span>
                </div>
              )}
            </Button>
          )}
        </div>
      </div>
    </div>
  )
}
