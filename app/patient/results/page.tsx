"use client"

import { PageHeader } from "@/components/page-header"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { labResults } from "@/lib/mock-data"
import { Dna, Flame, Pill, Bug, Apple, Info } from "lucide-react"

export default function PatientResultsPage() {
  return (
    <div className="space-y-8">
      <PageHeader
        title="Your Health Results"
        description="Easy-to-understand breakdown of your lab tests and what they mean for you"
      />

      {/* Overall Summary */}
      <Card className="border-border bg-card">
        <CardContent className="p-6">
          <div className="flex items-center gap-4">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
              <Dna className="h-8 w-8 text-primary" />
            </div>
            <div>
              <h2 className="text-xl font-semibold text-card-foreground">Your Health Snapshot</h2>
              <p className="text-muted-foreground">
                Based on your recent tests, here are the key areas we&apos;re focusing on.
              </p>
            </div>
          </div>
          <div className="mt-6 grid gap-4 sm:grid-cols-3">
            <div className="rounded-lg border border-destructive/20 bg-destructive/5 p-4 text-center">
              <p className="text-3xl font-bold text-destructive">3</p>
              <p className="text-sm text-destructive">Priority Areas</p>
            </div>
            <div className="rounded-lg border border-warning/20 bg-warning/5 p-4 text-center">
              <p className="text-3xl font-bold text-warning">4</p>
              <p className="text-sm text-warning">Areas to Monitor</p>
            </div>
            <div className="rounded-lg border border-success/20 bg-success/5 p-4 text-center">
              <p className="text-3xl font-bold text-success">8</p>
              <p className="text-sm text-success">Looking Great</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Priority Focus - Vitamin D */}
      <Card className="border-destructive/20 bg-card">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2 text-lg">
              <Pill className="h-5 w-5 text-destructive" />
              Vitamin D
            </CardTitle>
            <Badge variant="outline" className="bg-destructive/10 text-destructive border-destructive/20">
              Priority Focus
            </Badge>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-3xl font-bold text-card-foreground">12 ng/mL</p>
              <p className="text-sm text-muted-foreground">Optimal range: 40-80 ng/mL</p>
            </div>
            <div className="w-32">
              <Progress value={15} className="h-3" />
            </div>
          </div>
          <div className="rounded-lg bg-muted/50 p-4">
            <h4 className="font-medium text-card-foreground flex items-center gap-2">
              <Info className="h-4 w-4 text-primary" />
              What this means for you
            </h4>
            <p className="mt-2 text-sm text-muted-foreground">
              Your vitamin D is very low. This might affect your mood, energy levels, and how well your immune system
              works. The good news? This is very treatable with supplementation and some sunlight exposure.
            </p>
          </div>
          <div className="rounded-lg bg-primary/10 p-4">
            <h4 className="font-medium text-primary">Your Action Plan</h4>
            <ul className="mt-2 space-y-1 text-sm text-muted-foreground">
              <li>• Take 5000 IU Vitamin D3 daily with a fatty meal</li>
              <li>• Get 15-20 minutes of morning sunlight when possible</li>
              <li>• We&apos;ll retest in 8 weeks to check progress</li>
            </ul>
          </div>
        </CardContent>
      </Card>

      {/* Gut Health */}
      <Card className="border-border bg-card">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2 text-lg">
              <Bug className="h-5 w-5 text-primary" />
              Gut Health
            </CardTitle>
            <Badge variant="outline" className="bg-warning/10 text-warning border-warning/20">
              Needs Attention
            </Badge>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="rounded-lg bg-muted/50 p-4">
            <h4 className="font-medium text-card-foreground flex items-center gap-2">
              <Info className="h-4 w-4 text-primary" />
              What we found
            </h4>
            <p className="mt-2 text-sm text-muted-foreground">
              Your gut bacteria is slightly out of balance. You have lower levels of some helpful bacteria (like
              Akkermansia) that protect your gut lining. This can affect digestion, energy, and even mood.
            </p>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="rounded-lg border border-warning/20 bg-warning/5 p-4">
              <h4 className="font-medium text-warning">Low Beneficial Bacteria</h4>
              <ul className="mt-2 space-y-1 text-sm text-muted-foreground">
                <li>• Akkermansia muciniphila</li>
                <li>• Bifidobacterium</li>
              </ul>
            </div>
            <div className="rounded-lg border border-success/20 bg-success/5 p-4">
              <h4 className="font-medium text-success">Good News</h4>
              <ul className="mt-2 space-y-1 text-sm text-muted-foreground">
                <li>• No harmful pathogens detected</li>
                <li>• Lactobacillus levels are healthy</li>
              </ul>
            </div>
          </div>
          <div className="rounded-lg bg-primary/10 p-4">
            <h4 className="font-medium text-primary">Your Action Plan</h4>
            <ul className="mt-2 space-y-1 text-sm text-muted-foreground">
              <li>• Take your probiotic supplement daily on an empty stomach</li>
              <li>• Eat prebiotic foods: asparagus, garlic, onions</li>
              <li>• Add bone broth or collagen to support gut lining</li>
            </ul>
          </div>
        </CardContent>
      </Card>

      {/* Food Sensitivities */}
      <Card className="border-border bg-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-lg">
            <Apple className="h-5 w-5 text-primary" />
            Food Sensitivities
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="rounded-lg bg-muted/50 p-4">
            <p className="text-sm text-muted-foreground">
              Your MRT test shows which foods may be causing inflammation or discomfort. By avoiding reactive foods and
              eating more of your safe foods, you should notice improvements in energy, digestion, and overall
              well-being.
            </p>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="rounded-lg border border-destructive/20 bg-destructive/5 p-4">
              <h4 className="font-medium text-destructive">Avoid These (12 weeks)</h4>
              <div className="mt-2 flex flex-wrap gap-2">
                {labResults.mrt.reactive
                  .filter((r) => r.level === "high")
                  .map((item) => (
                    <Badge key={item.food} variant="destructive" className="text-xs">
                      {item.food}
                    </Badge>
                  ))}
              </div>
            </div>
            <div className="rounded-lg border border-warning/20 bg-warning/5 p-4">
              <h4 className="font-medium text-warning">Rotate These (every 4 days)</h4>
              <div className="mt-2 flex flex-wrap gap-2">
                {labResults.mrt.reactive
                  .filter((r) => r.level === "moderate")
                  .map((item) => (
                    <Badge
                      key={item.food}
                      variant="outline"
                      className="text-xs bg-warning/10 text-warning border-warning/20"
                    >
                      {item.food}
                    </Badge>
                  ))}
              </div>
            </div>
          </div>
          <div className="rounded-lg border border-success/20 bg-success/5 p-4">
            <h4 className="font-medium text-success">Your Safe Foods</h4>
            <p className="mt-2 text-sm text-muted-foreground">
              These foods tested well for you. Build your meals around these!
            </p>
            <div className="mt-2 flex flex-wrap gap-2">
              {labResults.mrt.safe.map((food) => (
                <Badge key={food} variant="secondary" className="text-xs">
                  {food}
                </Badge>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Inflammation */}
      <Card className="border-border bg-card">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2 text-lg">
              <Flame className="h-5 w-5 text-primary" />
              Inflammation
            </CardTitle>
            <Badge variant="outline" className="bg-success/10 text-success border-success/20">
              Looking Good
            </Badge>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">CRP (C-Reactive Protein)</p>
              <p className="text-2xl font-bold text-card-foreground">0.8 mg/L</p>
            </div>
            <div className="text-right">
              <p className="text-sm text-muted-foreground">Optimal</p>
              <p className="text-sm text-success">Below 1.0 mg/L</p>
            </div>
          </div>
          <div className="rounded-lg bg-success/10 p-4">
            <p className="text-sm text-success">
              Great news! Your inflammation markers are in the healthy range. Keep following your anti-inflammatory diet
              to maintain these levels.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
