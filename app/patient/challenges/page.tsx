"use client"

import { useState } from "react"
import { PageHeader } from "@/components/page-header"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useAppStore } from "@/lib/store"
import {
  Target,
  Users,
  Trophy,
  Clock,
  Flame,
  Zap,
  Apple,
  Dumbbell,
  Moon,
  Brain,
  ChevronRight,
  Star,
  Crown,
} from "lucide-react"
import { cn } from "@/lib/utils"

const challengeIcons = {
  nutrition: Apple,
  exercise: Dumbbell,
  sleep: Moon,
  mindfulness: Brain,
  custom: Target,
}

export default function ChallengesPage() {
  const { challenges, joinChallenge, gamification } = useAppStore()
  const [activeTab, setActiveTab] = useState("available")

  const availableChallenges = challenges.filter((c) => !c.joined)
  const activeChallenges = challenges.filter((c) => c.joined)

  const leaderboard = [
    { rank: 1, name: "Alex M.", xp: 4850, streak: 45, avatar: "A" },
    { rank: 2, name: "Sarah J.", xp: 4200, streak: 38, avatar: "S" },
    { rank: 3, name: "Mike R.", xp: 3950, streak: 32, avatar: "M" },
    { rank: 4, name: "You", xp: gamification.xp, streak: gamification.currentStreak, avatar: "Y", isYou: true },
    { rank: 5, name: "Emma L.", xp: 3100, streak: 28, avatar: "E" },
  ]
    .sort((a, b) => b.xp - a.xp)
    .map((u, i) => ({ ...u, rank: i + 1 }))

  return (
    <div className="space-y-8">
      <PageHeader title="Challenges" description="Join challenges to stay motivated and compete with the community" />

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid w-full grid-cols-2 bg-secondary">
              <TabsTrigger value="available">Available ({availableChallenges.length})</TabsTrigger>
              <TabsTrigger value="active">My Challenges ({activeChallenges.length})</TabsTrigger>
            </TabsList>

            <TabsContent value="available" className="space-y-4 mt-4">
              {availableChallenges.map((challenge) => {
                const IconComponent = challengeIcons[challenge.type]
                const daysLeft = Math.ceil((new Date(challenge.endDate).getTime() - Date.now()) / (1000 * 60 * 60 * 24))

                return (
                  <Card
                    key={challenge.id}
                    className="glass-card border-border hover:border-primary/30 transition-colors"
                  >
                    <CardContent className="p-6">
                      <div className="flex items-start gap-4">
                        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/20 neon-glow-cyan">
                          <IconComponent className="h-6 w-6 text-primary" />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center justify-between mb-1">
                            <h3 className="font-semibold text-card-foreground">{challenge.name}</h3>
                            <Badge variant="outline" className="border-primary/30 text-primary">
                              {challenge.duration} days
                            </Badge>
                          </div>
                          <p className="text-sm text-muted-foreground mb-3">{challenge.description}</p>

                          <div className="flex items-center gap-4 mb-4">
                            <div className="flex items-center gap-1 text-xs text-muted-foreground">
                              <Users className="h-3 w-3" />
                              {challenge.participants.toLocaleString()} joined
                            </div>
                            <div className="flex items-center gap-1 text-xs text-muted-foreground">
                              <Clock className="h-3 w-3" />
                              {daysLeft} days left to join
                            </div>
                            <div className="flex items-center gap-1 text-xs text-accent">
                              <Trophy className="h-3 w-3" />
                              {challenge.prize}
                            </div>
                          </div>

                          <div className="flex items-center gap-2">
                            <Button
                              onClick={() => joinChallenge(challenge.id)}
                              className="bg-primary hover:bg-primary/90 text-primary-foreground neon-glow-cyan"
                            >
                              Join Challenge
                              <ChevronRight className="ml-1 h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                )
              })}
            </TabsContent>

            <TabsContent value="active" className="space-y-4 mt-4">
              {activeChallenges.length === 0 ? (
                <Card className="glass-card border-border">
                  <CardContent className="flex flex-col items-center justify-center p-12 text-center">
                    <Target className="h-12 w-12 text-muted-foreground mb-4" />
                    <h3 className="text-lg font-semibold text-card-foreground mb-2">No Active Challenges</h3>
                    <p className="text-muted-foreground mb-4">Join a challenge to start competing!</p>
                    <Button variant="outline" onClick={() => setActiveTab("available")}>
                      Browse Challenges
                    </Button>
                  </CardContent>
                </Card>
              ) : (
                activeChallenges.map((challenge) => {
                  const IconComponent = challengeIcons[challenge.type]
                  const daysCompleted = Math.min(
                    Math.ceil((Date.now() - new Date(challenge.startDate).getTime()) / (1000 * 60 * 60 * 24)),
                    challenge.duration,
                  )
                  const progressPercent = (daysCompleted / challenge.duration) * 100

                  return (
                    <Card key={challenge.id} className="glass-card border-success/30">
                      <CardContent className="p-6">
                        <div className="flex items-start gap-4">
                          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-success/20 neon-glow-lime">
                            <IconComponent className="h-6 w-6 text-success" />
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center justify-between mb-1">
                              <h3 className="font-semibold text-card-foreground">{challenge.name}</h3>
                              <Badge className="bg-success/20 text-success border-success/30">Active</Badge>
                            </div>

                            <div className="mt-4">
                              <div className="flex items-center justify-between text-sm mb-2">
                                <span className="text-muted-foreground">Progress</span>
                                <span className="font-mono text-success">
                                  {daysCompleted}/{challenge.duration} days
                                </span>
                              </div>
                              <Progress
                                value={progressPercent}
                                className="h-3 bg-secondary [&>div]:bg-success [&>div]:neon-glow-lime"
                              />
                            </div>

                            <div className="mt-4 p-3 rounded-lg bg-secondary/50 border border-border">
                              <h4 className="text-xs font-medium text-muted-foreground mb-2">TODAY'S TASKS</h4>
                              {challenge.dailyTasks.map((task, i) => (
                                <div key={i} className="flex items-center gap-2 text-sm text-card-foreground">
                                  <div className="h-1.5 w-1.5 rounded-full bg-primary" />
                                  {task}
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  )
                })
              )}
            </TabsContent>
          </Tabs>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Leaderboard */}
          <Card className="glass-card border-accent/30">
            <CardHeader>
              <div className="flex items-center gap-2">
                <Crown className="h-5 w-5 text-accent" />
                <CardTitle className="text-card-foreground">Leaderboard</CardTitle>
              </div>
              <CardDescription>Top performers this month</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {leaderboard.map((user) => (
                  <div
                    key={user.rank}
                    className={cn(
                      "flex items-center gap-3 p-3 rounded-lg",
                      user.isYou ? "bg-primary/20 border border-primary/30" : "bg-secondary/50",
                    )}
                  >
                    <div
                      className={cn(
                        "flex h-8 w-8 items-center justify-center rounded-full text-sm font-bold",
                        user.rank === 1 && "bg-accent text-accent-foreground",
                        user.rank === 2 && "bg-muted text-muted-foreground",
                        user.rank === 3 && "bg-orange-500/20 text-orange-400",
                        user.rank > 3 && "bg-secondary text-muted-foreground",
                      )}
                    >
                      {user.rank <= 3 ? (
                        user.rank === 1 ? (
                          <Crown className="h-4 w-4" />
                        ) : user.rank === 2 ? (
                          <Star className="h-4 w-4" />
                        ) : (
                          <Trophy className="h-4 w-4" />
                        )
                      ) : (
                        user.rank
                      )}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <span
                          className={cn("text-sm font-medium", user.isYou ? "text-primary" : "text-card-foreground")}
                        >
                          {user.name}
                        </span>
                        {user.isYou && <Badge className="bg-primary/20 text-primary text-xs">You</Badge>}
                      </div>
                      <div className="flex items-center gap-2 text-xs text-muted-foreground">
                        <Zap className="h-3 w-3" />
                        {user.xp.toLocaleString()} XP
                        <Flame className="h-3 w-3 ml-2" />
                        {user.streak} days
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Stats */}
          <Card className="glass-card border-border">
            <CardHeader>
              <CardTitle className="text-card-foreground">Your Stats</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center p-4 rounded-lg bg-primary/10 border border-primary/30">
                  <div className="text-2xl font-bold text-primary neon-text-cyan">{gamification.currentStreak}</div>
                  <div className="text-xs text-muted-foreground">Current Streak</div>
                </div>
                <div className="text-center p-4 rounded-lg bg-accent/10 border border-accent/30">
                  <div className="text-2xl font-bold text-accent neon-text-magenta">{gamification.longestStreak}</div>
                  <div className="text-xs text-muted-foreground">Best Streak</div>
                </div>
                <div className="text-center p-4 rounded-lg bg-success/10 border border-success/30">
                  <div className="text-2xl font-bold text-success neon-text-lime">{gamification.totalDaysLogged}</div>
                  <div className="text-xs text-muted-foreground">Days Logged</div>
                </div>
                <div className="text-center p-4 rounded-lg bg-secondary border border-border">
                  <div className="text-2xl font-bold text-card-foreground">{activeChallenges.length}</div>
                  <div className="text-xs text-muted-foreground">Active Challenges</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
