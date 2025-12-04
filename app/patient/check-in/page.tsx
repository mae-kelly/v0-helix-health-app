"use client"

import { useState } from "react"
import { PageHeader } from "@/components/page-header"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import { Badge } from "@/components/ui/badge"
import { useAppStore } from "@/lib/store"
import { Sun, Moon, Zap, Heart, Brain, Sparkles, Trophy, Target, Plus, X, CheckCircle, ArrowRight } from "lucide-react"
import { cn } from "@/lib/utils"

export default function DailyCheckInPage() {
  const { gamification, addXP, setDailyCheckIn, dailyCheckIn, userProfile } = useAppStore()
  const [step, setStep] = useState<"morning" | "evening" | "complete">("morning")
  const [morningIntention, setMorningIntention] = useState("")
  const [energyLevel, setEnergyLevel] = useState([5])
  const [moodLevel, setMoodLevel] = useState([5])
  const [sleepQuality, setSleepQuality] = useState([5])
  const [eveningReflection, setEveningReflection] = useState("")
  const [gratitude, setGratitude] = useState<string[]>(["", "", ""])
  const [wins, setWins] = useState<string[]>([])
  const [newWin, setNewWin] = useState("")
  const [challenges, setChallenges] = useState<string[]>([])
  const [newChallenge, setNewChallenge] = useState("")

  const today = new Date()
  const isToday = dailyCheckIn?.date === today.toDateString()

  const handleMorningSubmit = () => {
    setStep("evening")
    addXP(25) // XP for morning check-in
  }

  const handleEveningSubmit = () => {
    const checkIn = {
      date: today.toDateString(),
      morningIntention,
      energyLevel: energyLevel[0],
      moodLevel: moodLevel[0],
      sleepQuality: sleepQuality[0],
      eveningReflection,
      gratitude: gratitude.filter((g) => g.trim()),
      wins,
      challenges,
    }
    setDailyCheckIn(checkIn)
    addXP(50) // XP for completing full daily check-in
    setStep("complete")
  }

  const addWin = () => {
    if (newWin.trim()) {
      setWins([...wins, newWin.trim()])
      setNewWin("")
    }
  }

  const addChallengeItem = () => {
    if (newChallenge.trim()) {
      setChallenges([...challenges, newChallenge.trim()])
      setNewChallenge("")
    }
  }

  if (step === "complete" || isToday) {
    return (
      <div className="space-y-8">
        <PageHeader
          title="Daily Check-In Complete"
          description="Great job staying consistent with your health journey!"
        />

        <Card className="glass-card border-success/30 max-w-2xl mx-auto">
          <CardContent className="flex flex-col items-center justify-center p-12 text-center">
            <div className="flex h-24 w-24 items-center justify-center rounded-full bg-success/20 neon-glow-lime mb-6">
              <CheckCircle className="h-12 w-12 text-success" />
            </div>
            <h2 className="text-2xl font-bold text-card-foreground mb-2">You're All Set!</h2>
            <p className="text-muted-foreground mb-6">
              You've completed your daily check-in. Keep up the amazing work!
            </p>

            <div className="grid grid-cols-3 gap-6 w-full max-w-md mb-8">
              <div className="text-center">
                <div className="text-3xl font-bold text-primary neon-text-cyan">{gamification.currentStreak}</div>
                <div className="text-xs text-muted-foreground">Day Streak</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-accent neon-text-magenta">{gamification.xp}</div>
                <div className="text-xs text-muted-foreground">Total XP</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-success neon-text-lime">Lv.{gamification.level}</div>
                <div className="text-xs text-muted-foreground">Current Level</div>
              </div>
            </div>

            <Badge className="bg-primary/20 text-primary border-primary/30 text-sm px-4 py-2">
              +75 XP earned today
            </Badge>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="space-y-8">
      <PageHeader
        title={`Good ${step === "morning" ? "Morning" : "Evening"}, ${userProfile?.name?.split(" ")[0] || "there"}!`}
        description={
          step === "morning"
            ? "Start your day with intention and clarity"
            : "Reflect on your day and celebrate your wins"
        }
      />

      {/* Progress indicator */}
      <div className="flex items-center justify-center gap-4 mb-8">
        <div
          className={cn(
            "flex items-center gap-2 px-4 py-2 rounded-full",
            step === "morning" ? "bg-primary/20 border border-primary/30" : "bg-success/20 border border-success/30",
          )}
        >
          <Sun className={cn("h-4 w-4", step === "morning" ? "text-primary" : "text-success")} />
          <span className={cn("text-sm font-medium", step === "morning" ? "text-primary" : "text-success")}>
            Morning
          </span>
          {step !== "morning" && <CheckCircle className="h-4 w-4 text-success" />}
        </div>
        <ArrowRight className="h-4 w-4 text-muted-foreground" />
        <div
          className={cn(
            "flex items-center gap-2 px-4 py-2 rounded-full",
            step === "evening" ? "bg-accent/20 border border-accent/30" : "bg-secondary border border-border",
          )}
        >
          <Moon className={cn("h-4 w-4", step === "evening" ? "text-accent" : "text-muted-foreground")} />
          <span className={cn("text-sm font-medium", step === "evening" ? "text-accent" : "text-muted-foreground")}>
            Evening
          </span>
        </div>
      </div>

      {step === "morning" ? (
        <Card className="glass-card border-primary/30 max-w-2xl mx-auto">
          <CardHeader>
            <div className="flex items-center gap-2">
              <Sun className="h-5 w-5 text-primary" />
              <CardTitle className="text-card-foreground">Morning Check-In</CardTitle>
            </div>
            <CardDescription>Set your intention for today</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Sleep Quality */}
            <div className="space-y-3">
              <Label className="flex items-center gap-2">
                <Moon className="h-4 w-4 text-accent" />
                How did you sleep last night?
              </Label>
              <div className="flex items-center gap-4">
                <span className="text-sm text-muted-foreground">Poor</span>
                <Slider value={sleepQuality} onValueChange={setSleepQuality} max={10} step={1} className="flex-1" />
                <span className="text-sm text-muted-foreground">Amazing</span>
              </div>
              <div className="text-center">
                <Badge variant="outline" className="text-lg px-4 py-1">
                  {sleepQuality[0]}/10
                </Badge>
              </div>
            </div>

            {/* Energy Level */}
            <div className="space-y-3">
              <Label className="flex items-center gap-2">
                <Zap className="h-4 w-4 text-primary" />
                Current energy level
              </Label>
              <div className="flex items-center gap-4">
                <span className="text-sm text-muted-foreground">Low</span>
                <Slider value={energyLevel} onValueChange={setEnergyLevel} max={10} step={1} className="flex-1" />
                <span className="text-sm text-muted-foreground">High</span>
              </div>
              <div className="text-center">
                <Badge variant="outline" className="text-lg px-4 py-1">
                  {energyLevel[0]}/10
                </Badge>
              </div>
            </div>

            {/* Mood */}
            <div className="space-y-3">
              <Label className="flex items-center gap-2">
                <Heart className="h-4 w-4 text-accent" />
                How are you feeling emotionally?
              </Label>
              <div className="flex items-center gap-4">
                <span className="text-sm text-muted-foreground">Stressed</span>
                <Slider value={moodLevel} onValueChange={setMoodLevel} max={10} step={1} className="flex-1" />
                <span className="text-sm text-muted-foreground">Great</span>
              </div>
              <div className="text-center">
                <Badge variant="outline" className="text-lg px-4 py-1">
                  {moodLevel[0]}/10
                </Badge>
              </div>
            </div>

            {/* Morning Intention */}
            <div className="space-y-3">
              <Label className="flex items-center gap-2">
                <Target className="h-4 w-4 text-success" />
                What's your main intention for today?
              </Label>
              <Textarea
                placeholder="Today I will focus on..."
                value={morningIntention}
                onChange={(e) => setMorningIntention(e.target.value)}
                className="min-h-[100px] bg-secondary/50 border-border"
              />
            </div>

            <Button
              onClick={handleMorningSubmit}
              className="w-full bg-primary hover:bg-primary/90 text-primary-foreground neon-glow-cyan"
              disabled={!morningIntention.trim()}
            >
              Complete Morning Check-In (+25 XP)
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </CardContent>
        </Card>
      ) : (
        <Card className="glass-card border-accent/30 max-w-2xl mx-auto">
          <CardHeader>
            <div className="flex items-center gap-2">
              <Moon className="h-5 w-5 text-accent" />
              <CardTitle className="text-card-foreground">Evening Reflection</CardTitle>
            </div>
            <CardDescription>Celebrate your wins and plan for tomorrow</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Gratitude */}
            <div className="space-y-3">
              <Label className="flex items-center gap-2">
                <Sparkles className="h-4 w-4 text-accent" />3 things you're grateful for today
              </Label>
              {gratitude.map((item, i) => (
                <Input
                  key={i}
                  placeholder={`Gratitude ${i + 1}...`}
                  value={item}
                  onChange={(e) => {
                    const newGratitude = [...gratitude]
                    newGratitude[i] = e.target.value
                    setGratitude(newGratitude)
                  }}
                  className="bg-secondary/50 border-border"
                />
              ))}
            </div>

            {/* Wins */}
            <div className="space-y-3">
              <Label className="flex items-center gap-2">
                <Trophy className="h-4 w-4 text-success" />
                Today's wins (big or small)
              </Label>
              <div className="flex gap-2">
                <Input
                  placeholder="I accomplished..."
                  value={newWin}
                  onChange={(e) => setNewWin(e.target.value)}
                  onKeyPress={(e) => e.key === "Enter" && addWin()}
                  className="bg-secondary/50 border-border"
                />
                <Button variant="outline" size="icon" onClick={addWin}>
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
              <div className="flex flex-wrap gap-2">
                {wins.map((win, i) => (
                  <Badge key={i} variant="secondary" className="bg-success/20 text-success border-success/30 px-3 py-1">
                    {win}
                    <button onClick={() => setWins(wins.filter((_, j) => j !== i))} className="ml-2">
                      <X className="h-3 w-3" />
                    </button>
                  </Badge>
                ))}
              </div>
            </div>

            {/* Challenges */}
            <div className="space-y-3">
              <Label className="flex items-center gap-2">
                <Brain className="h-4 w-4 text-primary" />
                Challenges faced (for learning)
              </Label>
              <div className="flex gap-2">
                <Input
                  placeholder="Something I struggled with..."
                  value={newChallenge}
                  onChange={(e) => setNewChallenge(e.target.value)}
                  onKeyPress={(e) => e.key === "Enter" && addChallengeItem()}
                  className="bg-secondary/50 border-border"
                />
                <Button variant="outline" size="icon" onClick={addChallengeItem}>
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
              <div className="flex flex-wrap gap-2">
                {challenges.map((challenge, i) => (
                  <Badge key={i} variant="secondary" className="bg-primary/20 text-primary border-primary/30 px-3 py-1">
                    {challenge}
                    <button onClick={() => setChallenges(challenges.filter((_, j) => j !== i))} className="ml-2">
                      <X className="h-3 w-3" />
                    </button>
                  </Badge>
                ))}
              </div>
            </div>

            {/* Evening Reflection */}
            <div className="space-y-3">
              <Label>Any final thoughts or reflections?</Label>
              <Textarea
                placeholder="Today I learned... Tomorrow I will..."
                value={eveningReflection}
                onChange={(e) => setEveningReflection(e.target.value)}
                className="min-h-[100px] bg-secondary/50 border-border"
              />
            </div>

            <Button
              onClick={handleEveningSubmit}
              className="w-full bg-accent hover:bg-accent/90 text-accent-foreground neon-glow-magenta"
            >
              Complete Evening Reflection (+50 XP)
              <CheckCircle className="ml-2 h-4 w-4" />
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
