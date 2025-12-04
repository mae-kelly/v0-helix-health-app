"use client"

import { useState } from "react"
import { PageHeader } from "@/components/page-header"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Slider } from "@/components/ui/slider"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { lifestylePlan } from "@/lib/mock-data"
import { useAppStore } from "@/lib/store"
import {
  Moon,
  Sun,
  Clock,
  Bed,
  AlarmClock,
  Thermometer,
  Volume2,
  Smartphone,
  Coffee,
  Target,
  TrendingUp,
  Info,
  Check,
  Sparkles,
  Brain,
  Battery,
} from "lucide-react"

export default function SleepPage() {
  const { userProfile } = useAppStore()
  const [sleepGoal, setSleepGoal] = useState(userProfile?.sleepGoal || 8)
  const [completedRoutine, setCompletedRoutine] = useState<string[]>([])

  const toggleRoutine = (id: string) => {
    setCompletedRoutine((prev) => (prev.includes(id) ? prev.filter((r) => r !== id) : [...prev, id]))
  }

  const eveningRoutine = [
    { id: "caffeine", name: "No caffeine after 2 PM", icon: Coffee, time: "2:00 PM cutoff" },
    { id: "screens", name: "Blue light glasses on", icon: Smartphone, time: "7:00 PM" },
    { id: "temp", name: "Cool bedroom to 65-68°F", icon: Thermometer, time: "8:00 PM" },
    { id: "magnesium", name: "Take magnesium glycinate", icon: Sparkles, time: "9:00 PM" },
    { id: "devices", name: "Devices out of bedroom", icon: Smartphone, time: "9:30 PM" },
    { id: "relax", name: "Relaxation practice", icon: Brain, time: "9:45 PM" },
    { id: "bed", name: "Lights out", icon: Moon, time: "10:30 PM" },
  ]

  const morningRoutine = [
    { id: "wake", name: "Wake at consistent time", icon: AlarmClock, time: "6:30 AM" },
    { id: "sunlight", name: "Morning sunlight exposure", icon: Sun, time: "6:45 AM" },
    { id: "hydrate", name: "Hydrate with lemon water", icon: Sparkles, time: "6:50 AM" },
  ]

  const sleepStats = {
    avgDuration: 7.2,
    avgQuality: 78,
    avgDeep: 1.5,
    avgRem: 1.8,
    avgLatency: 18,
    streak: 8,
  }

  const weeklyData = [
    { day: "Mon", hours: 7.5, quality: 82 },
    { day: "Tue", hours: 6.8, quality: 68 },
    { day: "Wed", hours: 7.2, quality: 75 },
    { day: "Thu", hours: 8.1, quality: 88 },
    { day: "Fri", hours: 7.0, quality: 72 },
    { day: "Sat", hours: 8.5, quality: 85 },
    { day: "Sun", hours: 7.8, quality: 80 },
  ]

  return (
    <div className="space-y-8">
      <PageHeader
        title="Sleep Protocol"
        description="Optimize your sleep for recovery, hormone balance, and cognitive performance"
      />

      <Tabs defaultValue="routine" className="space-y-6">
        <TabsList className="glass-card border-primary/20">
          <TabsTrigger value="routine" className="data-[state=active]:bg-primary/20 data-[state=active]:text-primary">
            <Moon className="h-4 w-4 mr-2" />
            Routine
          </TabsTrigger>
          <TabsTrigger value="tracking" className="data-[state=active]:bg-primary/20 data-[state=active]:text-primary">
            <TrendingUp className="h-4 w-4 mr-2" />
            Tracking
          </TabsTrigger>
          <TabsTrigger
            value="environment"
            className="data-[state=active]:bg-primary/20 data-[state=active]:text-primary"
          >
            <Bed className="h-4 w-4 mr-2" />
            Environment
          </TabsTrigger>
        </TabsList>

        <TabsContent value="routine" className="space-y-6">
          {/* Sleep Goal */}
          <Card className="glass-card border-primary/20">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-foreground">
                <Target className="h-5 w-5 text-primary neon-text-cyan" />
                Your Sleep Goal
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-6">
                <div className="flex-1">
                  <Slider
                    value={[sleepGoal]}
                    onValueChange={(v) => setSleepGoal(v[0])}
                    min={6}
                    max={10}
                    step={0.5}
                    className="[&>span]:bg-primary"
                  />
                  <div className="flex justify-between mt-2 text-xs text-muted-foreground">
                    <span>6h</span>
                    <span>10h</span>
                  </div>
                </div>
                <div className="text-center">
                  <div className="text-4xl font-bold text-primary neon-text-cyan">{sleepGoal}</div>
                  <div className="text-sm text-muted-foreground">hours/night</div>
                </div>
              </div>
              <p className="mt-4 text-sm text-muted-foreground">
                Based on your goals and biomarkers, we recommend {sleepGoal} hours of sleep. Your low vitamin D levels
                suggest you may benefit from extra rest for immune recovery.
              </p>
            </CardContent>
          </Card>

          {/* Evening Routine */}
          <Card className="glass-card border-secondary/20">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-foreground">
                <Moon className="h-5 w-5 text-secondary" />
                Evening Wind-Down Routine
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {eveningRoutine.map((item) => (
                <div
                  key={item.id}
                  className={`flex items-center justify-between rounded-xl border p-4 transition-all cursor-pointer ${
                    completedRoutine.includes(item.id)
                      ? "border-secondary/40 bg-secondary/10"
                      : "border-border/50 bg-card/50 hover:border-secondary/30"
                  }`}
                  onClick={() => toggleRoutine(item.id)}
                >
                  <div className="flex items-center gap-4">
                    <Button
                      variant="ghost"
                      size="sm"
                      className={`h-8 w-8 rounded-full p-0 ${
                        completedRoutine.includes(item.id)
                          ? "bg-secondary text-secondary-foreground"
                          : "border border-border"
                      }`}
                    >
                      {completedRoutine.includes(item.id) && <Check className="h-4 w-4" />}
                    </Button>
                    <item.icon
                      className={`h-5 w-5 ${completedRoutine.includes(item.id) ? "text-secondary" : "text-muted-foreground"}`}
                    />
                    <span className={completedRoutine.includes(item.id) ? "text-foreground" : "text-muted-foreground"}>
                      {item.name}
                    </span>
                  </div>
                  <Badge variant="outline" className="border-secondary/30 text-secondary">
                    <Clock className="h-3 w-3 mr-1" />
                    {item.time}
                  </Badge>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Morning Routine */}
          <Card className="glass-card border-warning/20">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-foreground">
                <Sun className="h-5 w-5 text-warning" />
                Morning Wake-Up Routine
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {morningRoutine.map((item) => (
                <div
                  key={item.id}
                  className={`flex items-center justify-between rounded-xl border p-4 transition-all cursor-pointer ${
                    completedRoutine.includes(item.id)
                      ? "border-warning/40 bg-warning/10"
                      : "border-border/50 bg-card/50 hover:border-warning/30"
                  }`}
                  onClick={() => toggleRoutine(item.id)}
                >
                  <div className="flex items-center gap-4">
                    <Button
                      variant="ghost"
                      size="sm"
                      className={`h-8 w-8 rounded-full p-0 ${
                        completedRoutine.includes(item.id)
                          ? "bg-warning text-warning-foreground"
                          : "border border-border"
                      }`}
                    >
                      {completedRoutine.includes(item.id) && <Check className="h-4 w-4" />}
                    </Button>
                    <item.icon
                      className={`h-5 w-5 ${completedRoutine.includes(item.id) ? "text-warning" : "text-muted-foreground"}`}
                    />
                    <span className={completedRoutine.includes(item.id) ? "text-foreground" : "text-muted-foreground"}>
                      {item.name}
                    </span>
                  </div>
                  <Badge variant="outline" className="border-warning/30 text-warning">
                    <Clock className="h-3 w-3 mr-1" />
                    {item.time}
                  </Badge>
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="tracking" className="space-y-6">
          {/* Sleep Stats */}
          <div className="grid gap-4 sm:grid-cols-3 lg:grid-cols-6">
            <Card className="glass-card border-primary/20">
              <CardContent className="pt-4 text-center">
                <Moon className="h-5 w-5 text-primary mx-auto mb-2" />
                <div className="text-2xl font-bold text-foreground">{sleepStats.avgDuration}h</div>
                <div className="text-xs text-muted-foreground">Avg Duration</div>
              </CardContent>
            </Card>
            <Card className="glass-card border-secondary/20">
              <CardContent className="pt-4 text-center">
                <Battery className="h-5 w-5 text-secondary mx-auto mb-2" />
                <div className="text-2xl font-bold text-foreground">{sleepStats.avgQuality}%</div>
                <div className="text-xs text-muted-foreground">Avg Quality</div>
              </CardContent>
            </Card>
            <Card className="glass-card border-accent/20">
              <CardContent className="pt-4 text-center">
                <Brain className="h-5 w-5 text-accent mx-auto mb-2" />
                <div className="text-2xl font-bold text-foreground">{sleepStats.avgDeep}h</div>
                <div className="text-xs text-muted-foreground">Deep Sleep</div>
              </CardContent>
            </Card>
            <Card className="glass-card border-warning/20">
              <CardContent className="pt-4 text-center">
                <Sparkles className="h-5 w-5 text-warning mx-auto mb-2" />
                <div className="text-2xl font-bold text-foreground">{sleepStats.avgRem}h</div>
                <div className="text-xs text-muted-foreground">REM Sleep</div>
              </CardContent>
            </Card>
            <Card className="glass-card border-border/20">
              <CardContent className="pt-4 text-center">
                <Clock className="h-5 w-5 text-muted-foreground mx-auto mb-2" />
                <div className="text-2xl font-bold text-foreground">{sleepStats.avgLatency}m</div>
                <div className="text-xs text-muted-foreground">Fall Asleep</div>
              </CardContent>
            </Card>
            <Card className="glass-card border-primary/20">
              <CardContent className="pt-4 text-center">
                <TrendingUp className="h-5 w-5 text-primary mx-auto mb-2" />
                <div className="text-2xl font-bold text-foreground">{sleepStats.streak}</div>
                <div className="text-xs text-muted-foreground">Day Streak</div>
              </CardContent>
            </Card>
          </div>

          {/* Weekly Chart */}
          <Card className="glass-card border-primary/20">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-foreground">
                <TrendingUp className="h-5 w-5 text-primary neon-text-cyan" />
                This Week's Sleep
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-end justify-between gap-2 h-48">
                {weeklyData.map((day) => (
                  <div key={day.day} className="flex-1 flex flex-col items-center gap-2">
                    <div className="w-full flex flex-col items-center gap-1">
                      <span className="text-xs text-muted-foreground">{day.quality}%</span>
                      <div
                        className="w-full rounded-t-lg bg-gradient-to-t from-primary/50 to-primary transition-all"
                        style={{ height: `${(day.hours / 10) * 150}px` }}
                      />
                    </div>
                    <span className="text-xs font-medium text-foreground">{day.day}</span>
                    <span className="text-xs text-muted-foreground">{day.hours}h</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="environment" className="space-y-6">
          <Card className="glass-card border-primary/20">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-foreground">
                <Bed className="h-5 w-5 text-primary neon-text-cyan" />
                Sleep Environment Checklist
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="rounded-xl border border-border/50 p-4">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <Thermometer className="h-5 w-5 text-primary" />
                      <span className="font-medium text-foreground">Temperature</span>
                    </div>
                    <Badge className="bg-primary/20 text-primary">65-68°F</Badge>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Cool temperatures promote deeper sleep. Your body temperature naturally drops during sleep.
                  </p>
                </div>
                <div className="rounded-xl border border-border/50 p-4">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <Moon className="h-5 w-5 text-secondary" />
                      <span className="font-medium text-foreground">Darkness</span>
                    </div>
                    <Badge className="bg-secondary/20 text-secondary">Complete</Badge>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Use blackout curtains and cover all LED lights. Even small amounts of light can disrupt melatonin.
                  </p>
                </div>
                <div className="rounded-xl border border-border/50 p-4">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <Volume2 className="h-5 w-5 text-accent" />
                      <span className="font-medium text-foreground">Sound</span>
                    </div>
                    <Badge className="bg-accent/20 text-accent">White Noise</Badge>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Consider white noise or earplugs if your environment is noisy. Consistent sound is better than
                    silence in noisy areas.
                  </p>
                </div>
                <div className="rounded-xl border border-border/50 p-4">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <Smartphone className="h-5 w-5 text-warning" />
                      <span className="font-medium text-foreground">Electronics</span>
                    </div>
                    <Badge className="bg-warning/20 text-warning">Remove</Badge>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Keep phones and tablets outside the bedroom. EMF and notification anxiety disrupt sleep
                    architecture.
                  </p>
                </div>
              </div>

              <div className="rounded-xl bg-accent/10 border border-accent/20 p-4">
                <h4 className="font-medium text-foreground flex items-center gap-2">
                  <Info className="h-4 w-4 text-accent" />
                  Why Sleep Environment Matters
                </h4>
                <p className="mt-2 text-sm text-muted-foreground">
                  Your sleep environment directly impacts sleep quality and hormone production. Optimizing these factors
                  can increase deep sleep by 20-30% and improve HRV, recovery, and cognitive function.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Protocol from mock data */}
          <Card className="glass-card border-secondary/20">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-foreground">
                <Target className="h-5 w-5 text-secondary" />
                Your Sleep Protocol
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {lifestylePlan.sleep.recommendations.map((rec, i) => (
                <div
                  key={i}
                  className="rounded-xl border border-border/50 bg-card/50 p-4 hover:border-secondary/30 transition-all"
                >
                  <p className="text-foreground">{rec}</p>
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
