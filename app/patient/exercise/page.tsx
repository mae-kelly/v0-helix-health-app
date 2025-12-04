"use client"

import { useState } from "react"
import { PageHeader } from "@/components/page-header"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { lifestylePlan } from "@/lib/mock-data"
import { useAppStore } from "@/lib/store"
import { Dumbbell, Check, Clock, Flame, Activity, Target, Calendar, TrendingUp, Info, Zap, Timer } from "lucide-react"

export default function ExercisePage() {
  const { userProfile } = useAppStore()
  const [completedWorkouts, setCompletedWorkouts] = useState<string[]>([])

  const toggleWorkout = (id: string) => {
    setCompletedWorkouts((prev) => (prev.includes(id) ? prev.filter((w) => w !== id) : [...prev, id]))
  }

  const weeklyPlan = [
    {
      id: "mon",
      day: "Monday",
      type: "Strength",
      name: "Upper Body Push",
      duration: "45 min",
      intensity: "Moderate",
      exercises: [
        { name: "Bench Press", sets: "3x8", rest: "90s" },
        { name: "Overhead Press", sets: "3x10", rest: "60s" },
        { name: "Incline Dumbbell Press", sets: "3x12", rest: "60s" },
        { name: "Tricep Dips", sets: "3x12", rest: "45s" },
        { name: "Face Pulls", sets: "3x15", rest: "45s" },
      ],
      calories: 320,
    },
    {
      id: "tue",
      day: "Tuesday",
      type: "Cardio",
      name: "Zone 2 Training",
      duration: "40 min",
      intensity: "Low",
      exercises: [
        { name: "Steady-state cycling or walking", sets: "40 min", rest: "—" },
        { name: "Heart rate: 120-140 BPM", sets: "—", rest: "—" },
      ],
      calories: 280,
    },
    {
      id: "wed",
      day: "Wednesday",
      type: "Strength",
      name: "Lower Body",
      duration: "50 min",
      intensity: "Moderate",
      exercises: [
        { name: "Goblet Squats", sets: "3x10", rest: "90s" },
        { name: "Romanian Deadlifts", sets: "3x10", rest: "90s" },
        { name: "Walking Lunges", sets: "3x12 each", rest: "60s" },
        { name: "Leg Curls", sets: "3x12", rest: "45s" },
        { name: "Calf Raises", sets: "3x15", rest: "45s" },
      ],
      calories: 380,
    },
    {
      id: "thu",
      day: "Thursday",
      type: "Recovery",
      name: "Active Recovery",
      duration: "30 min",
      intensity: "Very Low",
      exercises: [
        { name: "Yoga or stretching", sets: "20 min", rest: "—" },
        { name: "Foam rolling", sets: "10 min", rest: "—" },
      ],
      calories: 120,
    },
    {
      id: "fri",
      day: "Friday",
      type: "Strength",
      name: "Upper Body Pull",
      duration: "45 min",
      intensity: "Moderate",
      exercises: [
        { name: "Pull-ups or Lat Pulldown", sets: "3x8", rest: "90s" },
        { name: "Barbell Rows", sets: "3x10", rest: "60s" },
        { name: "Cable Rows", sets: "3x12", rest: "60s" },
        { name: "Bicep Curls", sets: "3x12", rest: "45s" },
        { name: "Rear Delt Flyes", sets: "3x15", rest: "45s" },
      ],
      calories: 300,
    },
    {
      id: "sat",
      day: "Saturday",
      type: "Cardio",
      name: "LISS or Outdoor Activity",
      duration: "45-60 min",
      intensity: "Low-Moderate",
      exercises: [
        { name: "Hiking, swimming, or cycling", sets: "45-60 min", rest: "—" },
        { name: "Enjoy nature!", sets: "—", rest: "—" },
      ],
      calories: 350,
    },
    {
      id: "sun",
      day: "Sunday",
      type: "Rest",
      name: "Full Rest Day",
      duration: "—",
      intensity: "None",
      exercises: [{ name: "Complete rest or light walking", sets: "—", rest: "—" }],
      calories: 0,
    },
  ]

  const weeklyStats = {
    workoutsCompleted: completedWorkouts.length,
    totalWorkouts: 6,
    caloriesBurned: weeklyPlan.filter((w) => completedWorkouts.includes(w.id)).reduce((acc, w) => acc + w.calories, 0),
    targetCalories: 1750,
    activeMinutes: weeklyPlan
      .filter((w) => completedWorkouts.includes(w.id))
      .reduce((acc, w) => acc + (Number.parseInt(w.duration) || 0), 0),
  }

  const getTypeColor = (type: string) => {
    switch (type) {
      case "Strength":
        return "bg-accent/20 text-accent border-accent/30"
      case "Cardio":
        return "bg-primary/20 text-primary border-primary/30"
      case "Recovery":
        return "bg-secondary/20 text-secondary border-secondary/30"
      case "Rest":
        return "bg-muted text-muted-foreground border-muted"
      default:
        return "bg-primary/20 text-primary border-primary/30"
    }
  }

  return (
    <div className="space-y-8">
      <PageHeader
        title="Exercise Protocol"
        description="Your personalized workout plan optimized for your biomarkers and fitness goals"
      />

      <Tabs defaultValue="weekly" className="space-y-6">
        <TabsList className="glass-card border-primary/20">
          <TabsTrigger value="weekly" className="data-[state=active]:bg-primary/20 data-[state=active]:text-primary">
            <Calendar className="h-4 w-4 mr-2" />
            Weekly Plan
          </TabsTrigger>
          <TabsTrigger value="progress" className="data-[state=active]:bg-primary/20 data-[state=active]:text-primary">
            <TrendingUp className="h-4 w-4 mr-2" />
            Progress
          </TabsTrigger>
          <TabsTrigger
            value="guidelines"
            className="data-[state=active]:bg-primary/20 data-[state=active]:text-primary"
          >
            <Target className="h-4 w-4 mr-2" />
            Guidelines
          </TabsTrigger>
        </TabsList>

        <TabsContent value="weekly" className="space-y-6">
          {/* Weekly Stats */}
          <div className="grid gap-4 sm:grid-cols-4">
            <Card className="glass-card border-primary/20">
              <CardContent className="pt-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-muted-foreground">Workouts</span>
                  <Dumbbell className="h-4 w-4 text-primary" />
                </div>
                <div className="text-2xl font-bold text-foreground">
                  {weeklyStats.workoutsCompleted}/{weeklyStats.totalWorkouts}
                </div>
                <Progress
                  value={(weeklyStats.workoutsCompleted / weeklyStats.totalWorkouts) * 100}
                  className="mt-2 h-2"
                />
              </CardContent>
            </Card>
            <Card className="glass-card border-accent/20">
              <CardContent className="pt-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-muted-foreground">Calories Burned</span>
                  <Flame className="h-4 w-4 text-accent" />
                </div>
                <div className="text-2xl font-bold text-foreground">{weeklyStats.caloriesBurned}</div>
                <Progress
                  value={(weeklyStats.caloriesBurned / weeklyStats.targetCalories) * 100}
                  className="mt-2 h-2 [&>div]:bg-accent"
                />
                <span className="text-xs text-muted-foreground">of {weeklyStats.targetCalories} kcal</span>
              </CardContent>
            </Card>
            <Card className="glass-card border-secondary/20">
              <CardContent className="pt-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-muted-foreground">Active Minutes</span>
                  <Timer className="h-4 w-4 text-secondary" />
                </div>
                <div className="text-2xl font-bold text-foreground">{weeklyStats.activeMinutes}</div>
                <span className="text-xs text-muted-foreground">this week</span>
              </CardContent>
            </Card>
            <Card className="glass-card border-warning/20">
              <CardContent className="pt-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-muted-foreground">Streak</span>
                  <Zap className="h-4 w-4 text-warning" />
                </div>
                <div className="text-2xl font-bold text-foreground">12 days</div>
                <span className="text-xs text-muted-foreground">keep it up!</span>
              </CardContent>
            </Card>
          </div>

          {/* Weekly Plan */}
          <div className="space-y-4">
            {weeklyPlan.map((workout) => (
              <Card
                key={workout.id}
                className={`glass-card transition-all ${
                  completedWorkouts.includes(workout.id)
                    ? "border-primary/40 bg-primary/5"
                    : "border-border/50 hover:border-primary/30"
                }`}
              >
                <CardContent className="p-4">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex items-start gap-4 flex-1">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => toggleWorkout(workout.id)}
                        className={`h-8 w-8 rounded-full p-0 mt-1 ${
                          completedWorkouts.includes(workout.id)
                            ? "bg-primary text-primary-foreground neon-glow-cyan"
                            : "border border-border"
                        }`}
                      >
                        {completedWorkouts.includes(workout.id) && <Check className="h-4 w-4" />}
                      </Button>
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h4 className="font-semibold text-foreground">{workout.day}</h4>
                          <Badge className={getTypeColor(workout.type)}>{workout.type}</Badge>
                          {workout.duration !== "—" && (
                            <Badge variant="outline" className="text-xs border-border/50">
                              <Clock className="h-3 w-3 mr-1" />
                              {workout.duration}
                            </Badge>
                          )}
                        </div>
                        <p className="text-lg font-medium text-foreground mb-3">{workout.name}</p>
                        {workout.exercises.length > 0 && workout.type !== "Rest" && (
                          <div className="space-y-2">
                            {workout.exercises.map((ex, i) => (
                              <div
                                key={i}
                                className="flex items-center justify-between text-sm text-muted-foreground bg-card/30 rounded-lg px-3 py-2"
                              >
                                <span>{ex.name}</span>
                                <div className="flex items-center gap-4">
                                  {ex.sets !== "—" && <span className="font-mono text-primary">{ex.sets}</span>}
                                  {ex.rest !== "—" && <span className="text-xs">Rest: {ex.rest}</span>}
                                </div>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                    {workout.calories > 0 && (
                      <div className="text-right">
                        <div className="text-lg font-bold text-accent">{workout.calories}</div>
                        <div className="text-xs text-muted-foreground">kcal</div>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="progress" className="space-y-6">
          <Card className="glass-card border-primary/20">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-foreground">
                <Activity className="h-5 w-5 text-primary neon-text-cyan" />
                Fitness Metrics
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="rounded-xl border border-border/50 p-4">
                  <h4 className="text-sm text-muted-foreground mb-2">Estimated VO2 Max</h4>
                  <div className="text-3xl font-bold text-primary">42.5</div>
                  <p className="text-xs text-muted-foreground mt-1">ml/kg/min • Above Average</p>
                  <Progress value={68} className="mt-2 h-2" />
                </div>
                <div className="rounded-xl border border-border/50 p-4">
                  <h4 className="text-sm text-muted-foreground mb-2">Resting Heart Rate</h4>
                  <div className="text-3xl font-bold text-accent">62</div>
                  <p className="text-xs text-muted-foreground mt-1">BPM • Good</p>
                  <Progress value={75} className="mt-2 h-2 [&>div]:bg-accent" />
                </div>
                <div className="rounded-xl border border-border/50 p-4">
                  <h4 className="text-sm text-muted-foreground mb-2">HRV (Heart Rate Variability)</h4>
                  <div className="text-3xl font-bold text-secondary">48</div>
                  <p className="text-xs text-muted-foreground mt-1">ms • Room for Improvement</p>
                  <Progress value={55} className="mt-2 h-2 [&>div]:bg-secondary" />
                </div>
                <div className="rounded-xl border border-border/50 p-4">
                  <h4 className="text-sm text-muted-foreground mb-2">Recovery Score</h4>
                  <div className="text-3xl font-bold text-warning">78%</div>
                  <p className="text-xs text-muted-foreground mt-1">Ready for moderate intensity</p>
                  <Progress value={78} className="mt-2 h-2 [&>div]:bg-warning" />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="guidelines" className="space-y-6">
          <Card className="glass-card border-primary/20">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-foreground">
                <Target className="h-5 w-5 text-primary neon-text-cyan" />
                Your Exercise Guidelines
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {lifestylePlan.exercise.recommendations.map((rec, i) => (
                <div
                  key={i}
                  className="rounded-xl border border-border/50 bg-card/50 p-4 hover:border-primary/30 transition-all"
                >
                  <p className="text-foreground">{rec}</p>
                </div>
              ))}

              <div className="rounded-xl bg-warning/10 border border-warning/30 p-4">
                <h4 className="font-medium text-warning flex items-center gap-2">
                  <Info className="h-4 w-4" />
                  Important Note
                </h4>
                <p className="mt-2 text-sm text-muted-foreground">
                  Due to your low ferritin levels, we recommend avoiding high-intensity training until your iron stores
                  improve. Focus on Zone 2 cardio and moderate strength training. Your protocol will automatically
                  adjust as your labs improve.
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
