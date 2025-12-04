"use client"

import type React from "react"

import { PageHeader } from "@/components/page-header"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { useAppStore } from "@/lib/store"
import { Trophy, Flame, Crown, Star, Sparkles, Medal, Sunrise, CheckCircle, Lock } from "lucide-react"

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  footprints: CheckCircle,
  flame: Flame,
  crown: Crown,
  star: Star,
  sparkles: Sparkles,
  trophy: Trophy,
  medal: Medal,
  sunrise: Sunrise,
  "check-circle": CheckCircle,
}

export default function AchievementsPage() {
  const { gamification } = useAppStore()

  const unlockedBadges = gamification.badges.filter((b) => b.unlockedAt)
  const lockedBadges = gamification.badges.filter((b) => !b.unlockedAt)

  // Calculate XP needed for next level
  const currentLevelXP = (gamification.level - 1) * 500
  const nextLevelXP = gamification.level * 500
  const progressToNextLevel = ((gamification.xp - currentLevelXP) / (nextLevelXP - currentLevelXP)) * 100

  // Weekly XP chart data
  const weekDays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]
  const maxWeeklyXP = Math.max(...gamification.weeklyXP, 1)

  return (
    <div className="space-y-8">
      <PageHeader title="Achievements" description="Track your progress and unlock badges" />

      {/* Level & XP */}
      <Card className="glass-card border-primary/30">
        <CardContent className="p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-3xl font-bold text-primary neon-text-cyan">Level {gamification.level}</h2>
              <p className="text-muted-foreground">Health Champion</p>
            </div>
            <div className="text-right">
              <div className="text-2xl font-mono font-bold text-accent neon-text-magenta">{gamification.xp} XP</div>
              <p className="text-sm text-muted-foreground">{nextLevelXP - gamification.xp} XP to next level</p>
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Level {gamification.level}</span>
              <span className="text-muted-foreground">Level {gamification.level + 1}</span>
            </div>
            <Progress
              value={progressToNextLevel}
              className="h-4 bg-secondary [&>div]:bg-gradient-to-r [&>div]:from-primary [&>div]:to-accent [&>div]:neon-glow-cyan"
            />
          </div>
        </CardContent>
      </Card>

      {/* Stats Grid */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Card className="glass-card border-border">
          <CardContent className="p-6 text-center">
            <Flame className="h-8 w-8 text-accent mx-auto mb-2" />
            <div className="text-3xl font-bold text-card-foreground">{gamification.currentStreak}</div>
            <div className="text-sm text-muted-foreground">Current Streak</div>
          </CardContent>
        </Card>
        <Card className="glass-card border-border">
          <CardContent className="p-6 text-center">
            <Trophy className="h-8 w-8 text-primary mx-auto mb-2" />
            <div className="text-3xl font-bold text-card-foreground">{gamification.longestStreak}</div>
            <div className="text-sm text-muted-foreground">Best Streak</div>
          </CardContent>
        </Card>
        <Card className="glass-card border-border">
          <CardContent className="p-6 text-center">
            <Star className="h-8 w-8 text-success mx-auto mb-2" />
            <div className="text-3xl font-bold text-card-foreground">{gamification.totalDaysLogged}</div>
            <div className="text-sm text-muted-foreground">Days Logged</div>
          </CardContent>
        </Card>
        <Card className="glass-card border-border">
          <CardContent className="p-6 text-center">
            <Medal className="h-8 w-8 text-accent mx-auto mb-2" />
            <div className="text-3xl font-bold text-card-foreground">{unlockedBadges.length}</div>
            <div className="text-sm text-muted-foreground">Badges Earned</div>
          </CardContent>
        </Card>
      </div>

      {/* Weekly XP Chart */}
      <Card className="glass-card border-border">
        <CardHeader>
          <CardTitle className="text-card-foreground">Weekly XP</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-end justify-between h-40 gap-2">
            {gamification.weeklyXP.map((xp, i) => (
              <div key={i} className="flex-1 flex flex-col items-center gap-2">
                <div
                  className="w-full bg-primary/20 rounded-t-md transition-all duration-500 relative group"
                  style={{ height: `${(xp / maxWeeklyXP) * 100}%`, minHeight: xp > 0 ? "8px" : "2px" }}
                >
                  <div
                    className="absolute inset-0 bg-gradient-to-t from-primary to-accent rounded-t-md neon-glow-cyan"
                    style={{ height: "100%" }}
                  />
                  <div className="absolute -top-6 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <Badge variant="secondary" className="text-xs">
                      {xp}
                    </Badge>
                  </div>
                </div>
                <span className="text-xs text-muted-foreground">{weekDays[i]}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Badges */}
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Unlocked Badges */}
        <Card className="glass-card border-success/30">
          <CardHeader>
            <div className="flex items-center gap-2">
              <Trophy className="h-5 w-5 text-success" />
              <CardTitle className="text-card-foreground">Unlocked ({unlockedBadges.length})</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            {unlockedBadges.length === 0 ? (
              <p className="text-muted-foreground text-center py-8">
                Complete tasks and maintain streaks to earn badges!
              </p>
            ) : (
              <div className="grid grid-cols-2 gap-4">
                {unlockedBadges.map((badge) => {
                  const IconComponent = iconMap[badge.icon] || Star
                  return (
                    <div key={badge.id} className="p-4 rounded-xl bg-success/10 border border-success/30 text-center">
                      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-success/20 neon-glow-lime mx-auto mb-2">
                        <IconComponent className="h-6 w-6 text-success" />
                      </div>
                      <h4 className="font-medium text-card-foreground">{badge.name}</h4>
                      <p className="text-xs text-muted-foreground mt-1">{badge.description}</p>
                      <Badge className="mt-2 bg-success/20 text-success border-success/30 text-xs">Unlocked!</Badge>
                    </div>
                  )
                })}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Locked Badges */}
        <Card className="glass-card border-border">
          <CardHeader>
            <div className="flex items-center gap-2">
              <Lock className="h-5 w-5 text-muted-foreground" />
              <CardTitle className="text-card-foreground">Locked ({lockedBadges.length})</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-4">
              {lockedBadges.map((badge) => {
                const IconComponent = iconMap[badge.icon] || Star
                let progress = 0
                if (badge.type === "streak") {
                  progress = (gamification.currentStreak / badge.requirement) * 100
                } else if (badge.type === "xp") {
                  progress = (gamification.xp / badge.requirement) * 100
                }

                return (
                  <div
                    key={badge.id}
                    className="p-4 rounded-xl bg-secondary/50 border border-border text-center opacity-75"
                  >
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-secondary mx-auto mb-2 relative">
                      <IconComponent className="h-6 w-6 text-muted-foreground" />
                      <Lock className="h-4 w-4 text-muted-foreground absolute -bottom-1 -right-1" />
                    </div>
                    <h4 className="font-medium text-muted-foreground">{badge.name}</h4>
                    <p className="text-xs text-muted-foreground mt-1">{badge.description}</p>
                    {progress > 0 && (
                      <div className="mt-2">
                        <Progress value={Math.min(progress, 100)} className="h-1 bg-secondary" />
                        <span className="text-xs text-muted-foreground">{Math.round(progress)}%</span>
                      </div>
                    )}
                  </div>
                )
              })}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
