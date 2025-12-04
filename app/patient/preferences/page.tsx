"use client"

import { useState } from "react"
import { PageHeader } from "@/components/page-header"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox"
import { X, Plus, Target, Apple, AlertTriangle, Save } from "lucide-react"

const healthGoals = [
  { id: "weight", label: "Lose weight / body recomposition" },
  { id: "muscle", label: "Build muscle" },
  { id: "energy", label: "Improve energy levels" },
  { id: "gut", label: "Improve gut health" },
  { id: "hormones", label: "Balance hormones" },
  { id: "inflammation", label: "Reduce inflammation" },
  { id: "sleep", label: "Better sleep" },
  { id: "mental", label: "Mental clarity / focus" },
]

const dietaryRestrictions = [
  { id: "vegetarian", label: "Vegetarian" },
  { id: "vegan", label: "Vegan" },
  { id: "gluten-free", label: "Gluten-free" },
  { id: "dairy-free", label: "Dairy-free" },
  { id: "keto", label: "Keto / Low-carb" },
  { id: "paleo", label: "Paleo" },
  { id: "halal", label: "Halal" },
  { id: "kosher", label: "Kosher" },
]

export default function PatientPreferencesPage() {
  const [selectedGoals, setSelectedGoals] = useState<string[]>(["gut", "energy", "inflammation"])
  const [selectedRestrictions, setSelectedRestrictions] = useState<string[]>(["gluten-free", "dairy-free"])
  const [dislikedFoods, setDislikedFoods] = useState<string[]>(["Brussels sprouts", "Liver", "Sardines"])
  const [newFood, setNewFood] = useState("")

  const toggleGoal = (id: string) => {
    setSelectedGoals((prev) => (prev.includes(id) ? prev.filter((g) => g !== id) : [...prev, id]))
  }

  const toggleRestriction = (id: string) => {
    setSelectedRestrictions((prev) => (prev.includes(id) ? prev.filter((r) => r !== id) : [...prev, id]))
  }

  const addDislikedFood = () => {
    if (newFood.trim() && !dislikedFoods.includes(newFood.trim())) {
      setDislikedFoods((prev) => [...prev, newFood.trim()])
      setNewFood("")
    }
  }

  const removeDislikedFood = (food: string) => {
    setDislikedFoods((prev) => prev.filter((f) => f !== food))
  }

  return (
    <div className="space-y-8">
      <PageHeader title="Preferences" description="Customize your health plan based on your goals and dietary needs">
        <Button>
          <Save className="mr-2 h-4 w-4" />
          Save Changes
        </Button>
      </PageHeader>

      {/* Health Goals */}
      <Card className="border-border bg-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Target className="h-5 w-5 text-primary" />
            Health Goals
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="mb-4 text-sm text-muted-foreground">
            Select your primary health goals. Your plan will be tailored to help you achieve these.
          </p>
          <div className="grid gap-3 sm:grid-cols-2">
            {healthGoals.map((goal) => (
              <div key={goal.id} className="flex items-center space-x-3 rounded-lg border border-border p-3">
                <Checkbox
                  id={goal.id}
                  checked={selectedGoals.includes(goal.id)}
                  onCheckedChange={() => toggleGoal(goal.id)}
                />
                <label htmlFor={goal.id} className="flex-1 text-sm font-medium text-card-foreground cursor-pointer">
                  {goal.label}
                </label>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Dietary Restrictions */}
      <Card className="border-border bg-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <AlertTriangle className="h-5 w-5 text-warning" />
            Dietary Restrictions
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="mb-4 text-sm text-muted-foreground">
            Let us know about any dietary restrictions so we can adjust your food recommendations.
          </p>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {dietaryRestrictions.map((restriction) => (
              <div key={restriction.id} className="flex items-center space-x-3 rounded-lg border border-border p-3">
                <Checkbox
                  id={restriction.id}
                  checked={selectedRestrictions.includes(restriction.id)}
                  onCheckedChange={() => toggleRestriction(restriction.id)}
                />
                <label
                  htmlFor={restriction.id}
                  className="flex-1 text-sm font-medium text-card-foreground cursor-pointer"
                >
                  {restriction.label}
                </label>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Foods I Don't Like */}
      <Card className="border-border bg-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Apple className="h-5 w-5 text-primary" />
            Foods I Don&apos;t Like
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="mb-4 text-sm text-muted-foreground">
            List any foods you don&apos;t enjoy. We&apos;ll suggest alternatives in your meal plans.
          </p>

          {/* Add new food */}
          <div className="flex gap-2 mb-4">
            <Input
              placeholder="Enter a food you don't like..."
              value={newFood}
              onChange={(e) => setNewFood(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && addDislikedFood()}
            />
            <Button onClick={addDislikedFood}>
              <Plus className="h-4 w-4" />
            </Button>
          </div>

          {/* Food list */}
          <div className="flex flex-wrap gap-2">
            {dislikedFoods.map((food) => (
              <Badge key={food} variant="secondary" className="text-sm py-1 pl-3 pr-1 flex items-center gap-1">
                {food}
                <button onClick={() => removeDislikedFood(food)} className="ml-1 rounded-full p-0.5 hover:bg-muted">
                  <X className="h-3 w-3" />
                </button>
              </Badge>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* AI Adaptation Notice */}
      <Card className="border-primary/20 bg-primary/5">
        <CardContent className="p-6">
          <div className="flex items-start gap-4">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 shrink-0">
              <Target className="h-5 w-5 text-primary" />
            </div>
            <div>
              <h3 className="font-medium text-card-foreground">Your Plan Adapts Instantly</h3>
              <p className="mt-1 text-sm text-muted-foreground">
                When you save changes to your preferences, our AI automatically updates your lifestyle plan, meal
                suggestions, and recommendations. Check your plan page after saving to see your personalized updates!
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
