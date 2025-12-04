"use client"

import { useState } from "react"
import { PageHeader } from "@/components/page-header"
import { EvidenceCard } from "@/components/evidence-card"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Switch } from "@/components/ui/switch"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useAppStore } from "@/lib/store"
import {
  Clock,
  Sun,
  Moon,
  Utensils,
  Check,
  BookOpen,
  Calendar,
  AlertTriangle,
  Sparkles,
  Droplets,
  Flame,
  ShoppingCart,
  Dna,
  FlaskConical,
  ShieldCheck,
} from "lucide-react"
import Link from "next/link"

export default function SupplementsPage() {
  const { userProfile } = useAppStore()
  const [takenToday, setTakenToday] = useState<string[]>([])
  const [reminders, setReminders] = useState(true)

  const toggleTaken = (id: string) => {
    setTakenToday((prev) => (prev.includes(id) ? prev.filter((t) => t !== id) : [...prev, id]))
  }

  const supplementStack = [
    {
      id: "vitd",
      name: "Vitamin D3 + K2",
      dosage: "5000 IU D3 + 100mcg K2",
      timing: "Morning",
      withFood: true,
      reason: "Your vitamin D is at 28 ng/mL (optimal: 50-80). VDR gene variant requires higher supplementation.",
      icon: Sun,
      priority: "high",
      geneticLink: "VDR variant",
      biomarkerLink: "Vitamin D: 28 ng/mL",
    },
    {
      id: "omega3",
      name: "Omega-3 Fish Oil",
      dosage: "2000mg EPA/DHA",
      timing: "Morning",
      withFood: true,
      reason: "APOE4 carrier status makes omega-3s critical for brain health. Your DHA-PC is low at 2.1%.",
      icon: Droplets,
      priority: "high",
      geneticLink: "APOE e3/e4",
      biomarkerLink: "DHA-PC: 2.1%",
    },
    {
      id: "magnesium",
      name: "Magnesium Glycinate",
      dosage: "400mg",
      timing: "Evening",
      withFood: false,
      reason:
        "Supports sleep, muscle recovery, and vitamin D activation. COMT slow metabolizer benefits from calming support.",
      icon: Moon,
      priority: "high",
      geneticLink: "COMT Met/Met",
      biomarkerLink: "Sleep optimization",
    },
    {
      id: "methylfolate",
      name: "Methylfolate (L-5-MTHF)",
      dosage: "800mcg",
      timing: "Morning",
      withFood: true,
      reason: "Your MTHFR C677T variant reduces folate conversion by 40-60%. Methylfolate bypasses this enzyme.",
      icon: Sparkles,
      priority: "high",
      geneticLink: "MTHFR C677T",
      biomarkerLink: "Homocysteine: 12 μmol/L",
    },
    {
      id: "b12",
      name: "Methylcobalamin (B12)",
      dosage: "1000mcg",
      timing: "Morning",
      withFood: true,
      reason: "Works with methylfolate to support methylation and lower homocysteine. Critical for MTHFR carriers.",
      icon: Flame,
      priority: "high",
      geneticLink: "MTHFR C677T",
      biomarkerLink: "Homocysteine: 12 μmol/L",
    },
    {
      id: "probiotic",
      name: "Multi-Strain Probiotic",
      dosage: "50 billion CFU",
      timing: "Morning",
      withFood: false,
      reason: "Your GI-MAP shows low Akkermansia and Bifidobacterium. Targeted probiotic support for gut healing.",
      icon: Sparkles,
      priority: "high",
      geneticLink: null,
      biomarkerLink: "GI-MAP Dysbiosis",
    },
    {
      id: "zinc",
      name: "Zinc Picolinate",
      dosage: "30mg",
      timing: "Evening",
      withFood: true,
      reason: "Supports immune function and hormone production. Take away from iron for best absorption.",
      icon: Sparkles,
      priority: "medium",
      geneticLink: null,
      biomarkerLink: "Immune support",
    },
    {
      id: "glutamine",
      name: "L-Glutamine",
      dosage: "5g",
      timing: "Before bed",
      withFood: false,
      reason:
        "Supports gut lining repair. Your elevated Enterococcus and low Akkermansia indicate need for gut barrier support.",
      icon: Sparkles,
      priority: "medium",
      geneticLink: null,
      biomarkerLink: "GI-MAP markers",
    },
  ]

  const morningSupps = supplementStack.filter((s) => s.timing === "Morning")
  const eveningSupps = supplementStack.filter((s) => s.timing === "Evening" || s.timing === "Before bed")

  const adherenceRate = (takenToday.length / supplementStack.length) * 100

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "bg-destructive/20 text-destructive border-destructive/30"
      case "medium":
        return "bg-warning/20 text-warning border-warning/30"
      default:
        return "bg-muted text-muted-foreground border-muted"
    }
  }

  // Evidence-based supplement recommendations
  const supplementEvidence = [
    {
      recommendation: "Take Vitamin D3 5000-10000 IU daily with K2",
      category: "Vitamin D",
      confidenceLevel: "high" as const,
      evidence: [
        {
          type: "genetic" as const,
          name: "VDR Bsm/Taq variant",
          status: "variant",
          detail:
            "Your VDR gene variants reduce vitamin D receptor sensitivity, meaning you need higher blood levels to achieve the same cellular effect.",
        },
        {
          type: "biomarker" as const,
          name: "Vitamin D (25-OH)",
          value: "28 ng/mL",
          status: "low",
          detail:
            "Your current level is 28 ng/mL. Optimal is 50-80 ng/mL for immune function and bone health. VDR carriers often need levels >60.",
        },
        {
          type: "research" as const,
          name: "J Clin Endocrinol Metab 2024",
          detail:
            "VDR variant carriers require 2-3x higher D3 intake to achieve the same serum levels as non-carriers.",
        },
      ],
    },
    {
      recommendation: "Take Methylfolate 800mcg + Methylcobalamin 1000mcg daily",
      category: "Methylation",
      confidenceLevel: "high" as const,
      evidence: [
        {
          type: "genetic" as const,
          name: "MTHFR C677T",
          status: "heterozygous",
          detail:
            "Your MTHFR variant reduces your ability to convert folic acid to active methylfolate by 40-60%. You need the pre-converted form.",
        },
        {
          type: "biomarker" as const,
          name: "Homocysteine",
          value: "12 μmol/L",
          status: "elevated",
          detail:
            "Elevated homocysteine (optimal <8) increases cardiovascular risk. Methylated B vitamins are the most effective way to lower it.",
        },
        {
          type: "research" as const,
          name: "Circulation 2024",
          detail:
            "Methylated B vitamin supplementation reduces homocysteine by 25-30% in MTHFR C677T carriers within 8 weeks.",
        },
      ],
    },
    {
      recommendation: "Take Omega-3 (EPA/DHA) 2000-3000mg daily",
      category: "Brain & Heart",
      confidenceLevel: "high" as const,
      evidence: [
        {
          type: "genetic" as const,
          name: "APOE e3/e4",
          status: "carrier",
          detail:
            "As an APOE4 carrier, omega-3s are especially critical for you. Research shows high omega-3 intake reduces dementia risk by 50% specifically in APOE4 carriers.",
        },
        {
          type: "biomarker" as const,
          name: "DHA-PC",
          value: "2.1%",
          status: "low",
          detail:
            "Your DHA-PC is significantly below optimal (3.5-6.0%), indicating your brain and cell membranes are not getting adequate omega-3s.",
        },
        {
          type: "research" as const,
          name: "Alzheimers Dement 2024",
          detail: "APOE4 carriers with omega-3 index >8% have 50% reduced dementia risk compared to those <4%.",
        },
      ],
    },
    {
      recommendation: "Take Magnesium Glycinate 400mg in the evening",
      category: "Sleep & Recovery",
      confidenceLevel: "high" as const,
      evidence: [
        {
          type: "genetic" as const,
          name: "COMT Met/Met",
          status: "slow",
          detail:
            "Your slow COMT variant means you have higher baseline dopamine/norepinephrine. Magnesium helps calm the nervous system and support better sleep.",
        },
        {
          type: "biomarker" as const,
          name: "Vitamin D activation",
          detail:
            "Magnesium is required to activate vitamin D. Without adequate magnesium, your D3 supplementation is less effective.",
        },
        {
          type: "research" as const,
          name: "Sleep Med Rev 2023",
          detail:
            "Magnesium glycinate improves sleep onset latency by 17 minutes and increases sleep efficiency by 8% in anxious individuals.",
        },
      ],
    },
  ]

  return (
    <div className="space-y-8">
      <PageHeader
        title="Supplement Protocol"
        description="Targeted supplementation based on your genetic variants and biomarker deficiencies"
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

      <Tabs defaultValue="daily" className="space-y-6">
        <TabsList className="glass-card border-primary/20">
          <TabsTrigger value="daily" className="data-[state=active]:bg-primary/20 data-[state=active]:text-primary">
            <Calendar className="h-4 w-4 mr-2" />
            Daily Stack
          </TabsTrigger>
          <TabsTrigger value="why" className="data-[state=active]:bg-primary/20 data-[state=active]:text-primary">
            <FlaskConical className="h-4 w-4 mr-2" />
            Why These Supplements
          </TabsTrigger>
          <TabsTrigger
            value="interactions"
            className="data-[state=active]:bg-primary/20 data-[state=active]:text-primary"
          >
            <AlertTriangle className="h-4 w-4 mr-2" />
            Interactions
          </TabsTrigger>
        </TabsList>

        <TabsContent value="daily" className="space-y-6">
          {/* Adherence */}
          <Card className="glass-card border-primary/20">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="text-lg font-semibold text-foreground">Today's Progress</h3>
                  <p className="text-sm text-muted-foreground">
                    {takenToday.length} of {supplementStack.length} supplements taken
                  </p>
                </div>
                <div className="text-right">
                  <div className="text-3xl font-bold text-primary neon-text-cyan">{Math.round(adherenceRate)}%</div>
                  <div className="text-xs text-muted-foreground">adherence</div>
                </div>
              </div>
              <Progress value={adherenceRate} className="h-3" />
              <div className="flex items-center justify-between mt-4">
                <span className="text-sm text-muted-foreground">Reminder notifications</span>
                <Switch checked={reminders} onCheckedChange={setReminders} />
              </div>
            </CardContent>
          </Card>

          {/* Morning Stack */}
          <Card className="glass-card border-warning/20">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-foreground">
                <Sun className="h-5 w-5 text-warning" />
                Morning Stack
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {morningSupps.map((supp) => (
                <div
                  key={supp.id}
                  className={`flex items-center justify-between rounded-xl border p-4 transition-all cursor-pointer ${
                    takenToday.includes(supp.id)
                      ? "border-primary/40 bg-primary/10"
                      : "border-border/50 bg-card/50 hover:border-primary/30"
                  }`}
                  onClick={() => toggleTaken(supp.id)}
                >
                  <div className="flex items-center gap-4">
                    <Button
                      variant="ghost"
                      size="sm"
                      className={`h-8 w-8 rounded-full p-0 ${
                        takenToday.includes(supp.id)
                          ? "bg-primary text-primary-foreground neon-glow-cyan"
                          : "border border-border"
                      }`}
                    >
                      {takenToday.includes(supp.id) && <Check className="h-4 w-4" />}
                    </Button>
                    <supp.icon
                      className={`h-5 w-5 ${takenToday.includes(supp.id) ? "text-primary" : "text-muted-foreground"}`}
                    />
                    <div>
                      <span
                        className={`font-medium ${takenToday.includes(supp.id) ? "text-foreground" : "text-muted-foreground"}`}
                      >
                        {supp.name}
                      </span>
                      <div className="flex items-center gap-2 mt-1 flex-wrap">
                        <Badge variant="outline" className="text-xs border-border/50">
                          {supp.dosage}
                        </Badge>
                        {supp.withFood && (
                          <Badge variant="outline" className="text-xs border-warning/30 text-warning">
                            <Utensils className="h-3 w-3 mr-1" />
                            With food
                          </Badge>
                        )}
                        {supp.geneticLink && (
                          <Badge variant="outline" className="text-xs border-accent/30 text-accent">
                            <Dna className="h-3 w-3 mr-1" />
                            {supp.geneticLink}
                          </Badge>
                        )}
                      </div>
                    </div>
                  </div>
                  <Badge className={getPriorityColor(supp.priority)}>{supp.priority}</Badge>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Evening Stack */}
          <Card className="glass-card border-secondary/20">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-foreground">
                <Moon className="h-5 w-5 text-secondary" />
                Evening Stack
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {eveningSupps.map((supp) => (
                <div
                  key={supp.id}
                  className={`flex items-center justify-between rounded-xl border p-4 transition-all cursor-pointer ${
                    takenToday.includes(supp.id)
                      ? "border-secondary/40 bg-secondary/10"
                      : "border-border/50 bg-card/50 hover:border-secondary/30"
                  }`}
                  onClick={() => toggleTaken(supp.id)}
                >
                  <div className="flex items-center gap-4">
                    <Button
                      variant="ghost"
                      size="sm"
                      className={`h-8 w-8 rounded-full p-0 ${
                        takenToday.includes(supp.id) ? "bg-secondary text-secondary-foreground" : "border border-border"
                      }`}
                    >
                      {takenToday.includes(supp.id) && <Check className="h-4 w-4" />}
                    </Button>
                    <supp.icon
                      className={`h-5 w-5 ${takenToday.includes(supp.id) ? "text-secondary" : "text-muted-foreground"}`}
                    />
                    <div>
                      <span
                        className={`font-medium ${takenToday.includes(supp.id) ? "text-foreground" : "text-muted-foreground"}`}
                      >
                        {supp.name}
                      </span>
                      <div className="flex items-center gap-2 mt-1 flex-wrap">
                        <Badge variant="outline" className="text-xs border-border/50">
                          {supp.dosage}
                        </Badge>
                        <Badge variant="outline" className="text-xs border-secondary/30 text-secondary">
                          <Clock className="h-3 w-3 mr-1" />
                          {supp.timing}
                        </Badge>
                        {supp.geneticLink && (
                          <Badge variant="outline" className="text-xs border-accent/30 text-accent">
                            <Dna className="h-3 w-3 mr-1" />
                            {supp.geneticLink}
                          </Badge>
                        )}
                      </div>
                    </div>
                  </div>
                  <Badge className={getPriorityColor(supp.priority)}>{supp.priority}</Badge>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <div className="flex gap-4">
            <Button className="flex-1 bg-primary/20 text-primary border border-primary/30 hover:bg-primary/30">
              <ShoppingCart className="h-4 w-4 mr-2" />
              Reorder Supplements
            </Button>
            <Button variant="outline" className="flex-1 border-border/50 bg-transparent">
              <Calendar className="h-4 w-4 mr-2" />
              View History
            </Button>
          </div>
        </TabsContent>

        {/* NEW: Why These Supplements Tab */}
        <TabsContent value="why" className="space-y-6">
          <Card className="glass-card border-accent/20">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-foreground">
                <Dna className="h-5 w-5 text-accent" />
                Why These Supplements?
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-6">
                Every supplement in your protocol is backed by YOUR specific genetic variants and biomarker results.
                Click "Why?" on any card to see the full evidence chain.
              </p>
              <div className="space-y-4">
                {supplementEvidence.map((item, i) => (
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

          <Card className="glass-card border-primary/20">
            <CardContent className="py-4">
              <div className="flex items-start gap-3">
                <BookOpen className="h-5 w-5 text-primary mt-0.5" />
                <div>
                  <h4 className="font-medium text-foreground">Supporting Research</h4>
                  <p className="text-sm text-muted-foreground mt-1">
                    Your supplement protocol is based on 47 peer-reviewed studies specific to your genetic variants.{" "}
                    <Link href="/patient/science?tab=biomarkers" className="text-primary hover:underline">
                      Explore the research →
                    </Link>
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="interactions" className="space-y-6">
          <Card className="glass-card border-warning/20">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-foreground">
                <AlertTriangle className="h-5 w-5 text-warning" />
                Interaction Notes
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="rounded-xl bg-warning/10 border border-warning/30 p-4">
                <h4 className="font-medium text-warning">Zinc + Copper</h4>
                <p className="text-sm text-muted-foreground mt-1">
                  High-dose zinc can deplete copper over time. We've accounted for this in your protocol. If taking zinc
                  long-term, periodic copper monitoring is recommended.
                </p>
              </div>
              <div className="rounded-xl bg-accent/10 border border-accent/30 p-4">
                <h4 className="font-medium text-accent">Iron + Calcium</h4>
                <p className="text-sm text-muted-foreground mt-1">
                  These compete for absorption. Your protocol spaces them apart. Don't take calcium supplements within 2
                  hours of iron.
                </p>
              </div>
              <div className="rounded-xl bg-primary/10 border border-primary/30 p-4">
                <h4 className="font-medium text-primary">Vitamin D + K2 + Magnesium</h4>
                <p className="text-sm text-muted-foreground mt-1">
                  These work synergistically. K2 ensures calcium from D3 goes to bones, not arteries. Magnesium is
                  required to activate vitamin D. Your protocol includes all three.
                </p>
              </div>
              <div className="rounded-xl bg-secondary/10 border border-secondary/30 p-4">
                <h4 className="font-medium text-secondary">Methylfolate + B12</h4>
                <p className="text-sm text-muted-foreground mt-1">
                  Critical combination for MTHFR carriers. These work together to support methylation and lower
                  homocysteine. Always take together.
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
