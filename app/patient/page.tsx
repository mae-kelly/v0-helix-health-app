"use client"

import { useState } from "react"
import { PageHeader } from "@/components/page-header"
import { StatCard } from "@/components/stat-card"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Progress } from "@/components/ui/progress"
import { lifestylePlan } from "@/lib/mock-data"
import { useAppStore } from "@/lib/store"
import { Flame, Target, Zap, ChevronRight, Trophy, Calendar, CheckCircle, AlertTriangle, Sparkles } from "lucide-react"
import Link from "next/link"
import { cn } from "@/lib/utils"

const dailyTasks = [
  { id: "1", task: "Take Vitamin D3 (5000 IU)", category: "Supplements", completed: true, xp: 10 },
  { id: "2", task: "Take Omega-3 (2000mg)", category: "Supplements", completed: true, xp: 10 },
  { id: "3", task: "Morning sunlight (30 min)", category: "Sleep", completed: false, xp: 15 },
  { id: "4", task: "Zone 2 cardio (30 min)", category: "Exercise", completed: false, xp: 25 },
  { id: "5", task: "8,000 steps", category: "Exercise", completed: false, xp: 20 },
  { id: "6", task: "Take probiotic", category: "Supplements", completed: false, xp: 10 },
  { id: "7", task: "Meditation (10 min)", category: "Stress", completed: false, xp: 15 },
]

export default function PatientDashboard() {
  const { userProfile, gamification, addXP, dailyCheckIn } = useAppStore()
  const [tasks, setTasks] = useState(dailyTasks)
  const completedCount = tasks.filter((t) => t.completed).length
  const totalXPToday = tasks.filter((t) => t.completed).reduce((sum, t) => sum + t.xp, 0)
  const potentialXP = tasks.reduce((sum, t) => sum + t.xp, 0)

  const today = new Date()
  const hasCheckedInToday = dailyCheckIn?.date === today.toDateString()

  const toggleTask = (id: string) => {
    setTasks((prev) =>
      prev.map((task) => {
        if (task.id === id) {
          if (!task.completed) {
            addXP(task.xp)
          }
          return { ...task, completed: !task.completed }
        }
        return task
      }),
    )
  }

  return (
    <div className="space-y-8">
      <PageHeader
        title={`Welcome back, ${userProfile?.name?.split(" ")[0] || "Sarah"}`}
        description="Stay consistent with your personalized health plan"
      />

      {!hasCheckedInToday && (
        <Card className="glass-card border-accent/50 bg-accent/5">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-accent/20 animate-pulse">
                  <AlertTriangle className="h-5 w-5 text-accent" />
                </div>
                <div>
                  <h3 className="font-semibold text-card-foreground">Daily Check-In Required</h3>
                  <p className="text-sm text-muted-foreground">
                    Complete your check-in to earn +75 XP and maintain your streak!
                  </p>
                </div>
              </div>
              <Button asChild className="bg-accent hover:bg-accent/90 text-accent-foreground neon-glow-magenta">
                <Link href="/patient/check-in">
                  Check In Now
                  <ChevronRight className="ml-1 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Stats */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard
          title="Current Streak"
          value={`${gamification.currentStreak} days`}
          subtitle={gamification.currentStreak > 0 ? "Keep it going!" : "Start today!"}
          icon={Flame}
          variant="success"
        />
        <StatCard
          title="Today's Progress"
          value={`${Math.round((completedCount / tasks.length) * 100)}%`}
          subtitle={`${completedCount}/${tasks.length} tasks done`}
          icon={Target}
        />
        <StatCard
          title="XP Today"
          value={`+${totalXPToday}`}
          subtitle={`${potentialXP - totalXPToday} XP remaining`}
          icon={Zap}
          variant="success"
        />
        <StatCard
          title="Level"
          value={gamification.level.toString()}
          subtitle={`${gamification.xp} total XP`}
          icon={Trophy}
        />
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <Card className="glass-card border-border lg:col-span-2">
          <CardHeader className="flex flex-row items-center justify-between">
            <div className="flex items-center gap-2">
              <Calendar className="h-5 w-5 text-primary" />
              <CardTitle className="text-lg font-semibold text-card-foreground">Today's Tasks</CardTitle>
            </div>
            <Badge variant="secondary" className="bg-primary/20 text-primary border-primary/30">
              {completedCount}/{tasks.length} done
            </Badge>
          </CardHeader>
          <CardContent>
            <div className="mb-4">
              <Progress
                value={(completedCount / tasks.length) * 100}
                className="h-2 bg-secondary [&>div]:bg-primary [&>div]:neon-glow-cyan"
              />
            </div>
            <div className="space-y-3">
              {tasks.map((task) => (
                <div
                  key={task.id}
                  className={cn(
                    "flex items-center gap-3 rounded-lg border p-3 transition-all",
                    task.completed
                      ? "border-success/30 bg-success/5"
                      : "border-border bg-secondary/30 hover:bg-secondary/50 hover:border-primary/30",
                  )}
                >
                  <Checkbox
                    id={task.id}
                    checked={task.completed}
                    onCheckedChange={() => toggleTask(task.id)}
                    className="border-primary data-[state=checked]:bg-success data-[state=checked]:border-success"
                  />
                  <label
                    htmlFor={task.id}
                    className={cn(
                      "flex-1 text-sm cursor-pointer",
                      task.completed ? "text-muted-foreground line-through" : "text-card-foreground",
                    )}
                  >
                    {task.task}
                  </label>
                  <Badge variant="outline" className="text-xs">
                    {task.category}
                  </Badge>
                  <Badge
                    className={cn(
                      "text-xs",
                      task.completed
                        ? "bg-success/20 text-success border-success/30"
                        : "bg-primary/20 text-primary border-primary/30",
                    )}
                  >
                    +{task.xp} XP
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <div className="space-y-6">
          {/* Streak Card */}
          <Card className="glass-card border-border">
            <CardContent className="flex flex-col items-center justify-center p-6 text-center">
              <div
                className={cn(
                  "flex h-20 w-20 items-center justify-center rounded-full",
                  gamification.currentStreak > 0 ? "bg-accent/20 neon-glow-magenta" : "bg-secondary",
                )}
              >
                <Flame
                  className={cn("h-10 w-10", gamification.currentStreak > 0 ? "text-accent" : "text-muted-foreground")}
                />
              </div>
              <h3
                className={cn(
                  "mt-4 text-3xl font-bold",
                  gamification.currentStreak > 0 ? "text-accent neon-text-magenta" : "text-muted-foreground",
                )}
              >
                {gamification.currentStreak}
              </h3>
              <p className="text-sm text-muted-foreground">Day Streak</p>
              <p className="mt-4 text-sm text-muted-foreground">
                {gamification.currentStreak > 0
                  ? "You're doing amazing! Consistency is key to seeing results."
                  : "Complete today's check-in to start your streak!"}
              </p>
              <Button
                className="mt-4 w-full bg-primary hover:bg-primary/90 text-primary-foreground neon-glow-cyan"
                asChild
              >
                <Link href="/patient/progress">
                  Log Today's Progress
                  <ChevronRight className="ml-1 h-4 w-4" />
                </Link>
              </Button>
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <Card className="glass-card border-border">
            <CardHeader>
              <CardTitle className="text-card-foreground text-base">Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="grid grid-cols-2 gap-2">
              <Button
                variant="outline"
                size="sm"
                asChild
                className="border-primary/30 hover:bg-primary/10 bg-transparent"
              >
                <Link href="/patient/challenges">
                  <Target className="h-4 w-4 mr-1" />
                  Challenges
                </Link>
              </Button>
              <Button
                variant="outline"
                size="sm"
                asChild
                className="border-accent/30 hover:bg-accent/10 bg-transparent"
              >
                <Link href="/patient/achievements">
                  <Trophy className="h-4 w-4 mr-1" />
                  Badges
                </Link>
              </Button>
              <Button
                variant="outline"
                size="sm"
                asChild
                className="border-success/30 hover:bg-success/10 bg-transparent"
              >
                <Link href="/patient/accountability">
                  <CheckCircle className="h-4 w-4 mr-1" />
                  Partner
                </Link>
              </Button>
              <Button variant="outline" size="sm" asChild className="border-border hover:bg-secondary bg-transparent">
                <Link href="/patient/upload">
                  <Sparkles className="h-4 w-4 mr-1" />
                  Upload
                </Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>

      <Card className="glass-card border-border">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="text-lg font-semibold text-card-foreground">Your Plan at a Glance</CardTitle>
          <Button variant="ghost" size="sm" asChild className="text-primary hover:text-primary">
            <Link href="/patient/plan">
              View Full Plan <ChevronRight className="ml-1 h-4 w-4" />
            </Link>
          </Button>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {/* Supplements Summary */}
            <div className="rounded-lg border border-primary/30 bg-primary/5 p-4">
              <h4 className="font-medium text-primary">Daily Supplements</h4>
              <ul className="mt-2 space-y-1">
                {lifestylePlan.supplements.items.slice(0, 3).map((supp) => (
                  <li key={supp.name} className="text-sm text-muted-foreground">
                    - {supp.name} - {supp.dosage}
                  </li>
                ))}
              </ul>
            </div>

            {/* Foods to Avoid */}
            <div className="rounded-lg border border-destructive/30 bg-destructive/5 p-4">
              <h4 className="font-medium text-destructive">Foods to Avoid</h4>
              <div className="mt-2 flex flex-wrap gap-1">
                {lifestylePlan.diet.avoidList.slice(0, 4).map((food) => (
                  <Badge key={food} variant="destructive" className="text-xs">
                    {food}
                  </Badge>
                ))}
              </div>
            </div>

            {/* Safe Foods */}
            <div className="rounded-lg border border-success/30 bg-success/5 p-4">
              <h4 className="font-medium text-success neon-text-lime">Safe Foods</h4>
              <p className="mt-2 text-sm text-muted-foreground">Chicken, Rice, Salmon, Sweet Potato, Spinach...</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="glass-card border-border">
        <CardHeader>
          <CardTitle className="text-lg font-semibold text-card-foreground">AI Insights This Week</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="rounded-lg bg-success/10 border border-success/30 p-4">
              <p className="text-sm text-success">
                Your inflammation markers are improving! Keep following the anti-inflammatory diet.
              </p>
            </div>
            <div className="rounded-lg bg-primary/10 border border-primary/30 p-4">
              <p className="text-sm text-primary">
                Based on your progress logs, your energy levels correlate with consistent supplement intake.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
