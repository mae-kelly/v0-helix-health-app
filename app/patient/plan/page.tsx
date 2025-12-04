"use client"

import { useState } from "react"
import { PageHeader } from "@/components/page-header"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { lifestylePlan, literature } from "@/lib/mock-data"
import { Apple, Pill, Flame, Moon, Heart, Bug, BookOpen, RefreshCw, Info } from "lucide-react"

export default function PatientPlanPage() {
  const [swappedFoods, setSwappedFoods] = useState<Record<string, string>>({})

  const foodAlternatives: Record<string, string[]> = {
    "fatty fish": ["walnuts", "chia seeds", "flax seeds"],
    "leafy greens": ["broccoli", "asparagus", "green beans"],
    berries: ["pomegranate", "cherries", "grapes"],
    asparagus: ["artichokes", "leeks", "bananas"],
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

  return (
    <div className="space-y-8">
      <PageHeader
        title="Your Lifestyle Plan"
        description="Personalized recommendations based on your genetics, blood tests, and gut health"
      />

      <Tabs defaultValue="diet" className="space-y-6">
        <TabsList className="grid w-full grid-cols-6">
          <TabsTrigger value="diet" className="gap-2">
            <Apple className="h-4 w-4" />
            <span className="hidden sm:inline">Diet</span>
          </TabsTrigger>
          <TabsTrigger value="supplements" className="gap-2">
            <Pill className="h-4 w-4" />
            <span className="hidden sm:inline">Supps</span>
          </TabsTrigger>
          <TabsTrigger value="exercise" className="gap-2">
            <Flame className="h-4 w-4" />
            <span className="hidden sm:inline">Exercise</span>
          </TabsTrigger>
          <TabsTrigger value="sleep" className="gap-2">
            <Moon className="h-4 w-4" />
            <span className="hidden sm:inline">Sleep</span>
          </TabsTrigger>
          <TabsTrigger value="stress" className="gap-2">
            <Heart className="h-4 w-4" />
            <span className="hidden sm:inline">Stress</span>
          </TabsTrigger>
          <TabsTrigger value="gut" className="gap-2">
            <Bug className="h-4 w-4" />
            <span className="hidden sm:inline">Gut</span>
          </TabsTrigger>
        </TabsList>

        {/* Diet Tab */}
        <TabsContent value="diet" className="space-y-6">
          <Card className="border-border bg-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Apple className="h-5 w-5 text-primary" />
                Your Diet Protocol
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Main Recommendations */}
              <div className="space-y-3">
                {lifestylePlan.diet.recommendations.map((rec, i) => (
                  <div key={i} className="rounded-lg border border-border p-4">
                    <div className="flex items-start justify-between gap-4">
                      <p className="text-card-foreground">{rec}</p>
                      {rec.toLowerCase().includes("fatty fish") && (
                        <Button variant="ghost" size="sm" onClick={() => handleSwap("fatty fish")} className="shrink-0">
                          <RefreshCw className="mr-1 h-4 w-4" />
                          Swap
                        </Button>
                      )}
                    </div>
                    {rec.toLowerCase().includes("fatty fish") && swappedFoods["fatty fish"] && (
                      <p className="mt-2 text-sm text-primary">Alternative: {swappedFoods["fatty fish"]}</p>
                    )}
                  </div>
                ))}
              </div>

              {/* Why This Matters */}
              <div className="rounded-lg bg-accent/50 p-4">
                <h4 className="font-medium text-accent-foreground flex items-center gap-2">
                  <Info className="h-4 w-4" />
                  Why This Matters
                </h4>
                <p className="mt-2 text-sm text-muted-foreground">
                  Your diet plan is designed to reduce inflammation, support your gut health, and address the food
                  sensitivities identified in your MRT test. Following this plan can improve energy, digestion, and
                  overall wellbeing.
                </p>
              </div>

              {/* Food Lists */}
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="rounded-lg border border-destructive/20 bg-destructive/5 p-4">
                  <h4 className="font-medium text-destructive">Avoid</h4>
                  <div className="mt-2 flex flex-wrap gap-2">
                    {lifestylePlan.diet.avoidList.map((food) => (
                      <Badge key={food} variant="destructive" className="text-xs">
                        {food}
                      </Badge>
                    ))}
                  </div>
                </div>
                <div className="rounded-lg border border-warning/20 bg-warning/5 p-4">
                  <h4 className="font-medium text-warning">Rotate (every 4 days)</h4>
                  <div className="mt-2 flex flex-wrap gap-2">
                    {lifestylePlan.diet.rotateList.map((food) => (
                      <Badge
                        key={food}
                        variant="outline"
                        className="text-xs bg-warning/10 text-warning border-warning/20"
                      >
                        {food}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>

              {/* Related Research */}
              <div className="rounded-lg border border-border p-4">
                <h4 className="font-medium text-card-foreground flex items-center gap-2 mb-3">
                  <BookOpen className="h-4 w-4 text-primary" />
                  Supporting Research
                </h4>
                <div className="space-y-2">
                  {literature.slice(0, 2).map((item) => (
                    <div key={item.id} className="text-sm">
                      <p className="text-card-foreground">{item.title}</p>
                      <p className="text-xs text-muted-foreground">
                        {item.journal}, {item.year}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Supplements Tab */}
        <TabsContent value="supplements" className="space-y-6">
          <Card className="border-border bg-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Pill className="h-5 w-5 text-primary" />
                Your Supplement Protocol
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {lifestylePlan.supplements.items.map((supp) => (
                <div key={supp.name} className="rounded-lg border border-border p-4">
                  <div className="flex items-center justify-between">
                    <h4 className="font-medium text-card-foreground">{supp.name}</h4>
                    <Badge variant="secondary">{supp.dosage}</Badge>
                  </div>
                  <p className="mt-1 text-sm text-muted-foreground">{supp.frequency}</p>
                  <div className="mt-3 rounded-lg bg-primary/10 p-3">
                    <p className="text-sm text-primary">
                      <strong>Why:</strong> {supp.reason}
                    </p>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>

        {/* Exercise Tab */}
        <TabsContent value="exercise" className="space-y-6">
          <Card className="border-border bg-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Flame className="h-5 w-5 text-primary" />
                Your Exercise Protocol
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {lifestylePlan.exercise.recommendations.map((rec, i) => (
                <div key={i} className="rounded-lg border border-border p-4">
                  <p className="text-card-foreground">{rec}</p>
                </div>
              ))}
              <div className="rounded-lg bg-warning/10 p-4">
                <h4 className="font-medium text-warning">Important Note</h4>
                <p className="mt-1 text-sm text-muted-foreground">
                  Due to your low ferritin levels, we recommend avoiding high-intensity training until your iron stores
                  improve. Focus on Zone 2 cardio and moderate strength training.
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Sleep Tab */}
        <TabsContent value="sleep" className="space-y-6">
          <Card className="border-border bg-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Moon className="h-5 w-5 text-primary" />
                Your Sleep Protocol
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {lifestylePlan.sleep.recommendations.map((rec, i) => (
                <div key={i} className="rounded-lg border border-border p-4">
                  <p className="text-card-foreground">{rec}</p>
                </div>
              ))}
              <div className="rounded-lg bg-accent/50 p-4">
                <h4 className="font-medium text-accent-foreground flex items-center gap-2">
                  <Info className="h-4 w-4" />
                  Why Sleep Matters
                </h4>
                <p className="mt-2 text-sm text-muted-foreground">
                  Quality sleep is essential for hormone regulation, immune function, and gut repair. Your low vitamin D
                  may be affecting sleep quality, so the morning sunlight exposure serves double duty.
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Stress Tab */}
        <TabsContent value="stress" className="space-y-6">
          <Card className="border-border bg-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Heart className="h-5 w-5 text-primary" />
                Stress & Recovery
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {lifestylePlan.stress.recommendations.map((rec, i) => (
                <div key={i} className="rounded-lg border border-border p-4">
                  <p className="text-card-foreground">{rec}</p>
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>

        {/* Gut Tab */}
        <TabsContent value="gut" className="space-y-6">
          <Card className="border-border bg-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Bug className="h-5 w-5 text-primary" />
                Your Gut Protocol
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {lifestylePlan.gut.recommendations.map((rec, i) => (
                <div key={i} className="rounded-lg border border-border p-4">
                  <p className="text-card-foreground">{rec}</p>
                </div>
              ))}
              <div className="rounded-lg bg-accent/50 p-4">
                <h4 className="font-medium text-accent-foreground flex items-center gap-2">
                  <Info className="h-4 w-4" />
                  The 4R Protocol
                </h4>
                <ul className="mt-2 space-y-1 text-sm text-muted-foreground">
                  <li>
                    <strong>Remove:</strong> Eliminate reactive foods and potential irritants
                  </li>
                  <li>
                    <strong>Replace:</strong> Add digestive support (enzymes if needed)
                  </li>
                  <li>
                    <strong>Reinoculate:</strong> Restore beneficial bacteria with probiotics
                  </li>
                  <li>
                    <strong>Repair:</strong> Heal the gut lining with L-glutamine and collagen
                  </li>
                </ul>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
