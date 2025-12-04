"use client"

import { useState } from "react"
import { PageHeader } from "@/components/page-header"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { lifestylePlan } from "@/lib/mock-data"
import { useAppStore } from "@/lib/store"
import {
  Sparkles,
  Snowflake,
  Flame,
  Wind,
  Heart,
  Brain,
  Activity,
  Zap,
  Target,
  Calendar,
  Clock,
  Star,
  Check,
  Waves,
  Sun,
  Syringe,
  Stethoscope,
  Scan,
  Droplets,
  Music,
  Users,
} from "lucide-react"

export default function LifestylePage() {
  const { userProfile } = useAppStore()
  const [completedToday, setCompletedToday] = useState<string[]>([])
  const [favorites, setFavorites] = useState<string[]>(["sauna", "breathwork", "redlight"])

  const toggleCompleted = (id: string) => {
    setCompletedToday((prev) => (prev.includes(id) ? prev.filter((c) => c !== id) : [...prev, id]))
  }

  const toggleFavorite = (id: string) => {
    setFavorites((prev) => (prev.includes(id) ? prev.filter((f) => f !== id) : [...prev, id]))
  }

  const techRemedies = [
    {
      id: "icebath",
      name: "Guided Ice Bath",
      icon: Snowflake,
      duration: "3-10 min",
      frequency: "2-3x/week",
      benefits: ["Reduces inflammation", "Boosts dopamine", "Improves recovery", "Mental resilience"],
      description: "Cold exposure therapy with guided breathing. Start at 50°F and progress to colder temps.",
      color: "primary",
    },
    {
      id: "sauna",
      name: "Sauna Suite",
      icon: Flame,
      duration: "15-20 min",
      frequency: "3-4x/week",
      benefits: ["Heat shock proteins", "Cardiovascular health", "Detoxification", "Relaxation"],
      description: "Infrared or traditional sauna sessions. Ideal after workouts or on recovery days.",
      color: "accent",
    },
    {
      id: "contrast",
      name: "Contrast Therapy",
      icon: Waves,
      duration: "20-30 min",
      frequency: "2x/week",
      benefits: ["Lymphatic drainage", "Circulation", "Recovery", "Immune boost"],
      description: "Alternating hot and cold immersion. 3 min hot, 1 min cold, repeat 4-5 cycles.",
      color: "secondary",
    },
    {
      id: "hyperbaric",
      name: "Hyperbaric Chamber",
      icon: Wind,
      duration: "60 min",
      frequency: "1-2x/week",
      benefits: ["Oxygen delivery", "Tissue healing", "Brain health", "Anti-aging"],
      description: "Pressurized oxygen therapy. Great for recovery, brain fog, and cellular regeneration.",
      color: "warning",
    },
    {
      id: "compression",
      name: "Lymphatic Compression",
      icon: Activity,
      duration: "30 min",
      frequency: "2-3x/week",
      benefits: ["Reduces swelling", "Muscle recovery", "Lymph flow", "Relaxation"],
      description: "NormaTec or similar compression boots. Perfect post-workout or during recovery days.",
      color: "primary",
    },
    {
      id: "cryo",
      name: "Whole Body Cryo",
      icon: Snowflake,
      duration: "3 min",
      frequency: "2-3x/week",
      benefits: ["Rapid cooling", "Endorphin release", "Inflammation", "Energy boost"],
      description: "Full body cryotherapy chamber at -200°F. Quick and effective cold therapy.",
      color: "primary",
    },
    {
      id: "massage",
      name: "AI Massage Chair",
      icon: Heart,
      duration: "15-30 min",
      frequency: "Daily",
      benefits: ["Muscle tension", "Stress relief", "Circulation", "Recovery"],
      description: "AI-powered massage targeting your specific tension areas and recovery needs.",
      color: "secondary",
    },
    {
      id: "redlight",
      name: "Red Light Therapy",
      icon: Sun,
      duration: "10-20 min",
      frequency: "Daily",
      benefits: ["Mitochondria", "Skin health", "Joint pain", "Testosterone"],
      description: "Full spectrum red and near-infrared light. Best in morning for circadian benefits.",
      color: "accent",
    },
  ]

  const alternativeMedicine = [
    {
      id: "acupuncture",
      name: "Acupuncture",
      icon: Zap,
      frequency: "Weekly",
      benefits: ["Pain relief", "Stress reduction", "Hormone balance", "Energy flow"],
      description: "Traditional Chinese medicine for energy flow and specific health concerns.",
    },
    {
      id: "chiropractic",
      name: "Chiropractic",
      icon: Activity,
      frequency: "Bi-weekly",
      benefits: ["Spinal alignment", "Nervous system", "Mobility", "Pain relief"],
      description: "Structural adjustments and nervous system optimization.",
    },
    {
      id: "functional",
      name: "Functional Medicine",
      icon: Stethoscope,
      frequency: "Monthly",
      benefits: ["Root cause", "Personalized care", "Prevention", "Optimization"],
      description: "Your ongoing functional medicine consultations for protocol adjustments.",
    },
    {
      id: "ivdrips",
      name: "Vitamin IV Drips",
      icon: Droplets,
      frequency: "Bi-weekly",
      benefits: ["100% absorption", "Rapid hydration", "Energy boost", "Immune support"],
      description: "Custom IV formulas based on your labs. Myers cocktail, NAD+, glutathione.",
    },
    {
      id: "shots",
      name: "Vitamin Shots",
      icon: Syringe,
      frequency: "Weekly",
      benefits: ["B12 energy", "Quick boost", "Immune support", "Fat burning"],
      description: "Quick intramuscular injections for targeted nutrient delivery.",
    },
    {
      id: "peptides",
      name: "Peptide Therapy",
      icon: Sparkles,
      frequency: "As prescribed",
      benefits: ["Recovery", "Anti-aging", "Performance", "Healing"],
      description: "BPC-157, TB-500, and other peptides for targeted therapeutic effects.",
    },
  ]

  const biometricTesting = [
    {
      id: "vo2max",
      name: "VO2 Max Testing",
      icon: Activity,
      frequency: "Quarterly",
      description: "Gold standard cardiovascular fitness assessment.",
    },
    {
      id: "rmr",
      name: "RMR Testing",
      icon: Flame,
      frequency: "Quarterly",
      description: "Resting metabolic rate to optimize nutrition.",
    },
    {
      id: "dexa",
      name: "DEXA Body Scan",
      icon: Scan,
      frequency: "Quarterly",
      description: "Precise body composition and bone density analysis.",
    },
    {
      id: "bloodwork",
      name: "Advanced Bloodwork",
      icon: Droplets,
      frequency: "Quarterly",
      description: "Comprehensive panels beyond standard tests.",
    },
  ]

  const classes = [
    { id: "breathwork", name: "Breathwork", icon: Wind, frequency: "2-3x/week", color: "primary" },
    { id: "meditation", name: "Meditation", icon: Brain, frequency: "Daily", color: "secondary" },
    { id: "pilates", name: "Pilates", icon: Activity, frequency: "2x/week", color: "accent" },
    { id: "soundbath", name: "Sound Bath", icon: Music, frequency: "Weekly", color: "warning" },
    { id: "yoga", name: "Yoga", icon: Users, frequency: "2-3x/week", color: "primary" },
  ]

  const getColorClasses = (color: string) => {
    switch (color) {
      case "primary":
        return "border-primary/30 bg-primary/10 text-primary"
      case "secondary":
        return "border-secondary/30 bg-secondary/10 text-secondary"
      case "accent":
        return "border-accent/30 bg-accent/10 text-accent"
      case "warning":
        return "border-warning/30 bg-warning/10 text-warning"
      default:
        return "border-border/50 bg-card/50 text-foreground"
    }
  }

  return (
    <div className="space-y-8">
      <PageHeader
        title="Lifestyle Optimization"
        description="Advanced therapies, treatments, and practices to accelerate your health journey"
      />

      <Tabs defaultValue="tech" className="space-y-6">
        <TabsList className="glass-card border-primary/20 flex-wrap h-auto gap-1 p-1">
          <TabsTrigger value="tech" className="data-[state=active]:bg-primary/20 data-[state=active]:text-primary">
            <Zap className="h-4 w-4 mr-2" />
            Tech Remedies
          </TabsTrigger>
          <TabsTrigger
            value="alternative"
            className="data-[state=active]:bg-primary/20 data-[state=active]:text-primary"
          >
            <Stethoscope className="h-4 w-4 mr-2" />
            Alternative
          </TabsTrigger>
          <TabsTrigger value="testing" className="data-[state=active]:bg-primary/20 data-[state=active]:text-primary">
            <Scan className="h-4 w-4 mr-2" />
            Testing
          </TabsTrigger>
          <TabsTrigger value="classes" className="data-[state=active]:bg-primary/20 data-[state=active]:text-primary">
            <Users className="h-4 w-4 mr-2" />
            Classes
          </TabsTrigger>
        </TabsList>

        <TabsContent value="tech" className="space-y-6">
          {/* Today's Recommendations */}
          <Card className="glass-card border-primary/20">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-foreground">
                <Target className="h-5 w-5 text-primary neon-text-cyan" />
                Today's Recommendations
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-4">
                Based on your recovery score (78%) and recent workouts, we recommend these therapies today:
              </p>
              <div className="flex flex-wrap gap-2">
                {["sauna", "compression", "redlight"].map((id) => {
                  const therapy = techRemedies.find((t) => t.id === id)
                  if (!therapy) return null
                  return (
                    <Badge key={id} className={getColorClasses(therapy.color)}>
                      <therapy.icon className="h-3 w-3 mr-1" />
                      {therapy.name}
                    </Badge>
                  )
                })}
              </div>
            </CardContent>
          </Card>

          {/* Tech Remedies Grid */}
          <div className="grid gap-4 sm:grid-cols-2">
            {techRemedies.map((therapy) => (
              <Card
                key={therapy.id}
                className={`glass-card transition-all ${
                  completedToday.includes(therapy.id)
                    ? "border-primary/40 bg-primary/5"
                    : `border-${therapy.color}/20 hover:border-${therapy.color}/40`
                }`}
              >
                <CardContent className="p-4">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <div className={`p-2 rounded-lg ${getColorClasses(therapy.color)}`}>
                        <therapy.icon className="h-5 w-5" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-foreground">{therapy.name}</h4>
                        <div className="flex items-center gap-2 text-xs text-muted-foreground">
                          <Clock className="h-3 w-3" />
                          {therapy.duration} • {therapy.frequency}
                        </div>
                      </div>
                    </div>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => toggleFavorite(therapy.id)}
                      className={favorites.includes(therapy.id) ? "text-warning" : "text-muted-foreground"}
                    >
                      <Star className={`h-4 w-4 ${favorites.includes(therapy.id) ? "fill-warning" : ""}`} />
                    </Button>
                  </div>
                  <p className="text-sm text-muted-foreground mb-3">{therapy.description}</p>
                  <div className="flex flex-wrap gap-1 mb-4">
                    {therapy.benefits.map((benefit) => (
                      <Badge key={benefit} variant="outline" className="text-xs border-border/50">
                        {benefit}
                      </Badge>
                    ))}
                  </div>
                  <Button
                    variant={completedToday.includes(therapy.id) ? "default" : "outline"}
                    size="sm"
                    className="w-full"
                    onClick={() => toggleCompleted(therapy.id)}
                  >
                    {completedToday.includes(therapy.id) ? (
                      <>
                        <Check className="h-4 w-4 mr-2" />
                        Completed
                      </>
                    ) : (
                      <>
                        <Calendar className="h-4 w-4 mr-2" />
                        Log Session
                      </>
                    )}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="alternative" className="space-y-6">
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {alternativeMedicine.map((treatment) => (
              <Card
                key={treatment.id}
                className="glass-card border-secondary/20 hover:border-secondary/40 transition-all"
              >
                <CardContent className="p-4">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="p-2 rounded-lg bg-secondary/10 text-secondary border border-secondary/30">
                      <treatment.icon className="h-5 w-5" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-foreground">{treatment.name}</h4>
                      <span className="text-xs text-muted-foreground">{treatment.frequency}</span>
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground mb-3">{treatment.description}</p>
                  <div className="flex flex-wrap gap-1">
                    {treatment.benefits.map((benefit) => (
                      <Badge key={benefit} variant="outline" className="text-xs border-secondary/30 text-secondary">
                        {benefit}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="testing" className="space-y-6">
          <Card className="glass-card border-accent/20">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-foreground">
                <Scan className="h-5 w-5 text-accent" />
                Biometric Testing Schedule
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {biometricTesting.map((test) => (
                <div
                  key={test.id}
                  className="flex items-center justify-between rounded-xl border border-border/50 bg-card/50 p-4"
                >
                  <div className="flex items-center gap-4">
                    <div className="p-2 rounded-lg bg-accent/10 text-accent border border-accent/30">
                      <test.icon className="h-5 w-5" />
                    </div>
                    <div>
                      <h4 className="font-medium text-foreground">{test.name}</h4>
                      <p className="text-sm text-muted-foreground">{test.description}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <Badge variant="outline" className="border-accent/30 text-accent">
                      {test.frequency}
                    </Badge>
                    <p className="text-xs text-muted-foreground mt-1">Next: Jan 15</p>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="classes" className="space-y-6">
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {classes.map((cls) => (
              <Card
                key={cls.id}
                className={`glass-card border-${cls.color}/20 hover:border-${cls.color}/40 transition-all`}
              >
                <CardContent className="p-6 text-center">
                  <div
                    className={`p-4 rounded-full ${getColorClasses(cls.color)} w-16 h-16 mx-auto mb-4 flex items-center justify-center`}
                  >
                    <cls.icon className="h-8 w-8" />
                  </div>
                  <h4 className="font-semibold text-foreground text-lg mb-1">{cls.name}</h4>
                  <p className="text-sm text-muted-foreground mb-4">{cls.frequency}</p>
                  <Button
                    variant={completedToday.includes(cls.id) ? "default" : "outline"}
                    size="sm"
                    className="w-full"
                    onClick={() => toggleCompleted(cls.id)}
                  >
                    {completedToday.includes(cls.id) ? "Attended" : "Log Attendance"}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Stress & Recovery from mock data */}
          <Card className="glass-card border-primary/20">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-foreground">
                <Heart className="h-5 w-5 text-primary neon-text-cyan" />
                Stress & Recovery Protocol
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {lifestylePlan.stress.recommendations.map((rec, i) => (
                <div
                  key={i}
                  className="rounded-xl border border-border/50 bg-card/50 p-4 hover:border-primary/30 transition-all"
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
