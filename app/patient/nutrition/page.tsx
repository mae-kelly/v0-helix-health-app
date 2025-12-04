"use client"

import { useState } from "react"
import { PageHeader } from "@/components/page-header"
import { EvidenceCard } from "@/components/evidence-card"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { lifestylePlan } from "@/lib/mock-data"
import { useAppStore } from "@/lib/store"
import {
  Apple,
  RefreshCw,
  Info,
  Target,
  Utensils,
  Clock,
  Droplets,
  Flame,
  Check,
  Calendar,
  Dna,
  FlaskConical,
  ShieldCheck,
  AlertTriangle,
} from "lucide-react"
import Link from "next/link"

export default function NutritionPage() {
  const { userProfile } = useAppStore()
  const [swappedFoods, setSwappedFoods] = useState<Record<string, string>>({})
  const [completedMeals, setCompletedMeals] = useState<string[]>([])

  const foodAlternatives: Record<string, string[]> = {
    "fatty fish": ["walnuts", "chia seeds", "flax seeds", "hemp seeds"],
    "leafy greens": ["broccoli", "asparagus", "green beans", "bok choy"],
    berries: ["pomegranate", "cherries", "grapes", "acai"],
    asparagus: ["artichokes", "leeks", "bananas", "jicama"],
    salmon: ["sardines", "mackerel", "trout", "arctic char"],
    eggs: ["tofu scramble", "chickpea flour omelette", "tempeh"],
  }

  const handleSwap = (original: string) => {
    const alternatives = foodAlternatives[original.toLowerCase()]
    if (alternatives) {
      const currentSwap = swappedFoods[original]
      const currentIndex = currentSwap ? alternatives.indexOf(currentSwap) : -1
      const nextIndex = (currentIndex + 1) % alternatives.length
      setSwappedFoods((prev) => ({ ...prev, [original]: alternatives[nextIndex] }))
    }
  }

  const toggleMeal = (meal: string) => {
    setCompletedMeals((prev) => (prev.includes(meal) ? prev.filter((m) => m !== meal) : [...prev, meal]))
  }

  const todaysMeals = [
    {
      id: "breakfast",
      name: "Breakfast",
      time: "7:00 AM",
      foods: ["Omega-3 eggs with sautéed spinach", "Avocado toast on gluten-free bread", "Green tea"],
      calories: 450,
      protein: 22,
      carbs: 35,
      fat: 28,
    },
    {
      id: "lunch",
      name: "Lunch",
      time: "12:30 PM",
      foods: ["Grilled salmon salad", "Mixed greens with olive oil dressing", "Quinoa pilaf"],
      calories: 580,
      protein: 38,
      carbs: 42,
      fat: 26,
    },
    {
      id: "snack",
      name: "Snack",
      time: "3:30 PM",
      foods: ["Mixed berries", "Handful of walnuts", "Bone broth"],
      calories: 220,
      protein: 8,
      carbs: 18,
      fat: 14,
    },
    {
      id: "dinner",
      name: "Dinner",
      time: "6:30 PM",
      foods: ["Grass-fed beef with roasted vegetables", "Fermented sauerkraut", "Sweet potato mash"],
      calories: 620,
      protein: 42,
      carbs: 48,
      fat: 28,
    },
  ]

  const macroTargets = { calories: 1900, protein: 120, carbs: 150, fat: 90 }
  const currentMacros = todaysMeals
    .filter((m) => completedMeals.includes(m.id))
    .reduce(
      (acc, m) => ({
        calories: acc.calories + m.calories,
        protein: acc.protein + m.protein,
        carbs: acc.carbs + m.carbs,
        fat: acc.fat + m.fat,
      }),
      { calories: 0, protein: 0, carbs: 0, fat: 0 },
    )

  // Evidence-based nutrition recommendations tied to genetics and biomarkers
  const nutritionEvidence = [
    {
      recommendation: "Eliminate gluten from your diet",
      category: "Elimination",
      confidenceLevel: "high" as const,
      evidence: [
        {
          type: "genetic" as const,
          name: "HLA-DQ2.5",
          status: "positive",
          detail:
            "You carry the HLA-DQ2.5 gene variant present in 95% of celiac patients. While this doesn't mean you have celiac, it indicates a genetic predisposition to gluten sensitivity.",
        },
        {
          type: "biomarker" as const,
          name: "MRT Food Sensitivity",
          value: "High",
          status: "reactive",
          detail:
            "Your MRT test showed high reactivity to gluten, indicating an immune response that can cause inflammation and gut permeability.",
        },
        {
          type: "biomarker" as const,
          name: "GI-MAP Dysbiosis",
          detail:
            "Your gut analysis shows elevated Enterococcus and low Akkermansia, which can be exacerbated by gluten consumption in sensitive individuals.",
        },
        {
          type: "research" as const,
          name: "J Allergy Clin Immunol 2023",
          detail: "MRT-guided elimination diets show 76% improvement in GI symptoms within 6 weeks.",
        },
      ],
    },
    {
      recommendation: "Eat fatty fish (salmon, sardines, mackerel) 3-4x per week",
      category: "Omega-3 Support",
      confidenceLevel: "high" as const,
      evidence: [
        {
          type: "genetic" as const,
          name: "APOE e3/e4",
          status: "carrier",
          detail:
            "As an APOE4 carrier, you have a 3x increased Alzheimer's risk. High omega-3 intake has been shown to reduce dementia risk by 50% in APOE4 carriers specifically.",
        },
        {
          type: "biomarker" as const,
          name: "DHA-PC",
          value: "2.1%",
          status: "low",
          detail:
            "Your DHA-PC is at 2.1%, well below the optimal range of 3.5-6.0%. This indicates your brain and cell membranes are not getting adequate omega-3s.",
        },
        {
          type: "research" as const,
          name: "Alzheimers Dement 2024",
          detail: "APOE4 carriers with high omega-3 intake show 50% reduced dementia risk compared to low intake.",
        },
      ],
    },
    {
      recommendation: "Eliminate dairy products for 12 weeks",
      category: "Elimination",
      confidenceLevel: "high" as const,
      evidence: [
        {
          type: "biomarker" as const,
          name: "MRT Food Sensitivity",
          value: "High",
          status: "reactive",
          detail:
            "Your MRT test showed high reactivity to cow dairy, indicating an immune-mediated response that causes inflammation.",
        },
        {
          type: "biomarker" as const,
          name: "CRP",
          value: "2.8 mg/L",
          status: "elevated",
          detail:
            "Your C-reactive protein is elevated, indicating systemic inflammation. Eliminating reactive foods like dairy can help reduce this.",
        },
        {
          type: "research" as const,
          name: "Nutrients 2023",
          detail: "Dairy elimination in reactive individuals reduces CRP by an average of 35% within 8 weeks.",
        },
      ],
    },
    {
      recommendation: "Eat leafy greens daily (spinach, kale, chard)",
      category: "Methylation Support",
      confidenceLevel: "high" as const,
      evidence: [
        {
          type: "genetic" as const,
          name: "MTHFR C677T",
          status: "heterozygous",
          detail:
            "Your MTHFR variant reduces folate-to-methylfolate conversion by 40-60%. Eating natural folate from leafy greens bypasses this enzyme limitation better than synthetic folic acid.",
        },
        {
          type: "biomarker" as const,
          name: "Homocysteine",
          value: "12 μmol/L",
          status: "elevated",
          detail:
            "Your homocysteine is elevated at 12 (optimal <8), increasing cardiovascular risk. Natural folate helps lower homocysteine.",
        },
        {
          type: "research" as const,
          name: "Circulation 2024",
          detail:
            "Natural folate from food sources is 2x more effective at lowering homocysteine than synthetic folic acid in MTHFR carriers.",
        },
      ],
    },
    {
      recommendation: "Limit saturated fat to <15g daily, prioritize olive oil and avocado",
      category: "Heart Health",
      confidenceLevel: "high" as const,
      evidence: [
        {
          type: "genetic" as const,
          name: "APOE e3/e4",
          status: "carrier",
          detail:
            "APOE4 carriers have a heightened LDL cholesterol response to saturated fat. Reducing saturated fat is more important for you than the general population.",
        },
        {
          type: "research" as const,
          name: "JAMA Cardiol 2023",
          detail:
            "APOE4 carriers on Mediterranean diet show 40% greater cardiovascular risk reduction than non-carriers on the same diet.",
        },
      ],
    },
    {
      recommendation: "Limit caffeine to 1 cup in the morning only",
      category: "Caffeine Management",
      confidenceLevel: "moderate" as const,
      evidence: [
        {
          type: "genetic" as const,
          name: "CYP1A2",
          status: "slow metabolizer",
          detail:
            "You're a slow caffeine metabolizer - caffeine stays in your system longer, potentially disrupting sleep and increasing anxiety.",
        },
        {
          type: "genetic" as const,
          name: "COMT Met/Met",
          status: "slow",
          detail:
            "Your slow COMT variant means you already have higher baseline dopamine. Caffeine can push this too high, causing anxiety and overstimulation.",
        },
        {
          type: "research" as const,
          name: "Sleep Med Rev 2023",
          detail: "Slow CYP1A2 metabolizers who consume caffeine after noon have 45% worse sleep quality scores.",
        },
      ],
    },
  ]

  return (
    <div className="space-y-8">
      <PageHeader
        title="Nutrition Protocol"
        description="Personalized meal plans and dietary recommendations based on your genetics and biomarkers"
      />

      {/* Doctor Oversight Banner */}
      <Card className="glass-card border-green-500/30 bg-green-500/5">
        <CardContent className="py-3 px-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <ShieldCheck className="h-5 w-5 text-green-400" />
              <div>
                <p className="text-sm font-medium text-foreground">Physician Approved Protocol</p>
                <p className="text-xs text-muted-foreground">Reviewed by Dr. Sarah Chen, MD on Dec 1, 2024</p>
              </div>
            </div>
            <Link href="/patient/science">
              <Button
                variant="outline"
                size="sm"
                className="border-green-500/30 text-green-400 hover:bg-green-500/10 bg-transparent"
              >
                <Dna className="h-4 w-4 mr-2" />
                View Your Science
              </Button>
            </Link>
          </div>
        </CardContent>
      </Card>

      <Tabs defaultValue="today" className="space-y-6">
        <TabsList className="glass-card border-primary/20">
          <TabsTrigger value="today" className="data-[state=active]:bg-primary/20 data-[state=active]:text-primary">
            <Calendar className="h-4 w-4 mr-2" />
            Today's Plan
          </TabsTrigger>
          <TabsTrigger value="why" className="data-[state=active]:bg-primary/20 data-[state=active]:text-primary">
            <FlaskConical className="h-4 w-4 mr-2" />
            Why These Foods
          </TabsTrigger>
          <TabsTrigger
            value="guidelines"
            className="data-[state=active]:bg-primary/20 data-[state=active]:text-primary"
          >
            <Target className="h-4 w-4 mr-2" />
            Guidelines
          </TabsTrigger>
          <TabsTrigger value="foods" className="data-[state=active]:bg-primary/20 data-[state=active]:text-primary">
            <Utensils className="h-4 w-4 mr-2" />
            Food Lists
          </TabsTrigger>
        </TabsList>

        <TabsContent value="today" className="space-y-6">
          {/* Macro Progress */}
          <div className="grid gap-4 sm:grid-cols-4">
            <Card className="glass-card border-primary/20">
              <CardContent className="pt-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-muted-foreground">Calories</span>
                  <Flame className="h-4 w-4 text-accent" />
                </div>
                <div className="text-2xl font-bold text-foreground">{currentMacros.calories}</div>
                <Progress value={(currentMacros.calories / macroTargets.calories) * 100} className="mt-2 h-2" />
                <span className="text-xs text-muted-foreground">of {macroTargets.calories} kcal</span>
              </CardContent>
            </Card>
            <Card className="glass-card border-accent/20">
              <CardContent className="pt-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-muted-foreground">Protein</span>
                  <span className="text-xs font-medium text-accent">💪</span>
                </div>
                <div className="text-2xl font-bold text-foreground">{currentMacros.protein}g</div>
                <Progress
                  value={(currentMacros.protein / macroTargets.protein) * 100}
                  className="mt-2 h-2 [&>div]:bg-accent"
                />
                <span className="text-xs text-muted-foreground">of {macroTargets.protein}g</span>
              </CardContent>
            </Card>
            <Card className="glass-card border-warning/20">
              <CardContent className="pt-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-muted-foreground">Carbs</span>
                  <span className="text-xs font-medium text-warning">🍞</span>
                </div>
                <div className="text-2xl font-bold text-foreground">{currentMacros.carbs}g</div>
                <Progress
                  value={(currentMacros.carbs / macroTargets.carbs) * 100}
                  className="mt-2 h-2 [&>div]:bg-warning"
                />
                <span className="text-xs text-muted-foreground">of {macroTargets.carbs}g</span>
              </CardContent>
            </Card>
            <Card className="glass-card border-secondary/20">
              <CardContent className="pt-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-muted-foreground">Fat</span>
                  <Droplets className="h-4 w-4 text-secondary" />
                </div>
                <div className="text-2xl font-bold text-foreground">{currentMacros.fat}g</div>
                <Progress
                  value={(currentMacros.fat / macroTargets.fat) * 100}
                  className="mt-2 h-2 [&>div]:bg-secondary"
                />
                <span className="text-xs text-muted-foreground">of {macroTargets.fat}g</span>
              </CardContent>
            </Card>
          </div>

          {/* Today's Meals */}
          <Card className="glass-card border-primary/20">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-foreground">
                <Apple className="h-5 w-5 text-primary neon-text-cyan" />
                Today's Meal Plan
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {todaysMeals.map((meal) => (
                <div
                  key={meal.id}
                  className={`rounded-xl border p-4 transition-all ${
                    completedMeals.includes(meal.id)
                      ? "border-primary/40 bg-primary/10"
                      : "border-border/50 bg-card/50 hover:border-primary/30"
                  }`}
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => toggleMeal(meal.id)}
                          className={`h-6 w-6 rounded-full p-0 ${
                            completedMeals.includes(meal.id)
                              ? "bg-primary text-primary-foreground"
                              : "border border-border"
                          }`}
                        >
                          {completedMeals.includes(meal.id) && <Check className="h-4 w-4" />}
                        </Button>
                        <h4 className="font-semibold text-foreground">{meal.name}</h4>
                        <Badge variant="outline" className="text-xs border-primary/30 text-primary">
                          <Clock className="h-3 w-3 mr-1" />
                          {meal.time}
                        </Badge>
                      </div>
                      <ul className="space-y-1 ml-9">
                        {meal.foods.map((food, i) => (
                          <li key={i} className="text-sm text-muted-foreground flex items-center gap-2">
                            <span className="h-1 w-1 rounded-full bg-primary/50" />
                            {food}
                            {foodAlternatives[food.toLowerCase().split(" ")[0]] && (
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => handleSwap(food.split(" ")[0])}
                                className="h-5 px-2 text-xs"
                              >
                                <RefreshCw className="h-3 w-3" />
                              </Button>
                            )}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div className="text-right text-xs text-muted-foreground space-y-1">
                      <div>{meal.calories} kcal</div>
                      <div>P: {meal.protein}g</div>
                      <div>C: {meal.carbs}g</div>
                      <div>F: {meal.fat}g</div>
                    </div>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Hydration */}
          <Card className="glass-card border-secondary/20">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-foreground">
                <Droplets className="h-5 w-5 text-secondary" />
                Hydration Goal
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-4">
                <div className="flex-1">
                  <Progress value={62} className="h-3 [&>div]:bg-secondary" />
                </div>
                <span className="text-lg font-bold text-foreground">5/8 glasses</span>
              </div>
              <p className="mt-2 text-sm text-muted-foreground">
                Drink water 30 minutes before meals for optimal digestion. Avoid drinking during meals.
              </p>
            </CardContent>
          </Card>
        </TabsContent>

        {/* NEW: Why These Foods Tab with Evidence Cards */}
        <TabsContent value="why" className="space-y-6">
          <Card className="glass-card border-accent/20">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-foreground">
                <Dna className="h-5 w-5 text-accent" />
                Why These Nutrition Recommendations?
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-6">
                Every recommendation below is backed by YOUR specific genetic variants and biomarker results. Click
                "Why?" on any card to see the full evidence chain.
              </p>
              <div className="space-y-4">
                {nutritionEvidence.map((item, i) => (
                  <EvidenceCard
                    key={i}
                    recommendation={item.recommendation}
                    category={item.category}
                    evidence={item.evidence}
                    confidenceLevel={item.confidenceLevel}
                    doctorApproved={true}
                  />
                ))}
              </div>
            </CardContent>
          </Card>

          <Card className="glass-card border-warning/20">
            <CardContent className="py-4">
              <div className="flex items-start gap-3">
                <AlertTriangle className="h-5 w-5 text-warning mt-0.5" />
                <div>
                  <h4 className="font-medium text-foreground">Research Updates</h4>
                  <p className="text-sm text-muted-foreground mt-1">
                    Your nutrition protocol automatically updates when new research emerges relevant to your APOE4,
                    MTHFR, or other genetic variants.{" "}
                    <Link href="/patient/science?tab=updates" className="text-primary hover:underline">
                      View recent updates →
                    </Link>
                  </p>
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
                Your Personalized Guidelines
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {lifestylePlan.diet.recommendations.map((rec, i) => (
                <div
                  key={i}
                  className="rounded-xl border border-border/50 bg-card/50 p-4 hover:border-primary/30 transition-all"
                >
                  <p className="text-foreground">{rec}</p>
                </div>
              ))}

              <div className="rounded-xl bg-accent/10 border border-accent/20 p-4">
                <h4 className="font-medium text-foreground flex items-center gap-2">
                  <Info className="h-4 w-4 text-accent" />
                  Connected to Your Biology
                </h4>
                <p className="mt-2 text-sm text-muted-foreground">
                  These guidelines are specifically designed based on your{" "}
                  <span className="text-accent font-medium">APOE4 carrier status</span>,{" "}
                  <span className="text-accent font-medium">MTHFR C677T variant</span>,{" "}
                  <span className="text-accent font-medium">MRT food sensitivities</span>, and current biomarker levels
                  including low DHA-PC and elevated homocysteine.
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="foods" className="space-y-6">
          <div className="grid gap-6 lg:grid-cols-2">
            <Card className="glass-card border-primary/20">
              <CardHeader>
                <CardTitle className="text-primary flex items-center gap-2">
                  <Check className="h-5 w-5" />
                  Foods to Embrace
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {[
                    "Wild salmon",
                    "Leafy greens",
                    "Berries",
                    "Avocado",
                    "Olive oil",
                    "Bone broth",
                    "Fermented foods",
                    "Turmeric",
                    "Ginger",
                    "Grass-fed beef",
                    "Pasture-raised eggs",
                    "Sweet potatoes",
                  ].map((food) => (
                    <Badge key={food} className="bg-primary/20 text-primary border-primary/30 hover:bg-primary/30">
                      {food}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="glass-card border-destructive/20">
              <CardHeader>
                <CardTitle className="text-destructive flex items-center gap-2">
                  <span className="h-5 w-5 flex items-center justify-center">✕</span>
                  Foods to Avoid
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {lifestylePlan.diet.avoidList.map((food) => (
                    <Badge
                      key={food}
                      variant="destructive"
                      className="bg-destructive/20 text-destructive border-destructive/30"
                    >
                      {food}
                    </Badge>
                  ))}
                </div>
                <p className="mt-4 text-sm text-muted-foreground">
                  Based on your <span className="text-warning font-medium">MRT food sensitivity test</span> and{" "}
                  <span className="text-warning font-medium">HLA-DQ2.5 genetic variant</span>. Avoid for 90 days, then
                  slowly reintroduce.
                </p>
              </CardContent>
            </Card>

            <Card className="glass-card border-warning/20 lg:col-span-2">
              <CardHeader>
                <CardTitle className="text-warning flex items-center gap-2">
                  <RefreshCw className="h-5 w-5" />
                  Rotation Foods (Every 4 Days)
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {lifestylePlan.diet.rotateList.map((food) => (
                    <Badge key={food} className="bg-warning/20 text-warning border-warning/30">
                      {food}
                    </Badge>
                  ))}
                </div>
                <p className="mt-4 text-sm text-muted-foreground">
                  These foods showed moderate reactivity in your MRT test. You can eat them, but rotate them every 4
                  days to prevent building up sensitivity.
                </p>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
