"use client"

import { useState } from "react"
import { PageHeader } from "@/components/page-header"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { geneticVariants, biomarkerInsights, aiExplanation, researchUpdates, privacyInfo } from "@/lib/mock-data"
import {
  Dna,
  FlaskConical,
  Brain,
  Shield,
  Sparkles,
  BookOpen,
  Bell,
  ChevronRight,
  AlertCircle,
  CheckCircle,
  Lock,
  Eye,
  Download,
  Trash2,
  RefreshCw,
  Lightbulb,
  Clock,
} from "lucide-react"

export default function SciencePage() {
  const [selectedGene, setSelectedGene] = useState<string | null>(null)
  const [selectedBiomarker, setSelectedBiomarker] = useState<string | null>(null)

  const geneList = Object.entries(geneticVariants)
  const biomarkerList = Object.entries(biomarkerInsights)

  const getStatusColor = (status: string) => {
    switch (status) {
      case "low":
      case "elevated":
        return "bg-warning/20 text-warning border-warning/30"
      case "critical":
        return "bg-destructive/20 text-destructive border-destructive/30"
      case "optimal":
      case "normal":
        return "bg-primary/20 text-primary border-primary/30"
      default:
        return "bg-muted text-muted-foreground border-muted"
    }
  }

  const getImpactColor = (impact: string) => {
    switch (impact) {
      case "significant":
        return "bg-accent/20 text-accent border-accent/30"
      case "moderate":
        return "bg-warning/20 text-warning border-warning/30"
      default:
        return "bg-muted text-muted-foreground border-muted"
    }
  }

  return (
    <div className="space-y-8">
      <PageHeader
        title="Your Science"
        description="Understand exactly why each recommendation is personalized for your unique biology"
      />

      <Tabs defaultValue="genetics" className="space-y-6">
        <TabsList className="glass-card border-primary/20 flex-wrap h-auto gap-1 p-1">
          <TabsTrigger value="genetics" className="data-[state=active]:bg-primary/20 data-[state=active]:text-primary">
            <Dna className="h-4 w-4 mr-2" />
            Genetics
          </TabsTrigger>
          <TabsTrigger
            value="biomarkers"
            className="data-[state=active]:bg-primary/20 data-[state=active]:text-primary"
          >
            <FlaskConical className="h-4 w-4 mr-2" />
            Biomarkers
          </TabsTrigger>
          <TabsTrigger
            value="how-it-works"
            className="data-[state=active]:bg-primary/20 data-[state=active]:text-primary"
          >
            <Brain className="h-4 w-4 mr-2" />
            How AI Works
          </TabsTrigger>
          <TabsTrigger value="updates" className="data-[state=active]:bg-primary/20 data-[state=active]:text-primary">
            <Bell className="h-4 w-4 mr-2" />
            Research Updates
          </TabsTrigger>
          <TabsTrigger value="privacy" className="data-[state=active]:bg-primary/20 data-[state=active]:text-primary">
            <Shield className="h-4 w-4 mr-2" />
            Privacy & Trust
          </TabsTrigger>
        </TabsList>

        {/* Genetics Tab */}
        <TabsContent value="genetics" className="space-y-6">
          <Card className="glass-card border-primary/20">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-foreground">
                <Dna className="h-5 w-5 text-primary neon-text-cyan" />
                Your Genetic Variants
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-6">
                These genetic variants influence how your body processes nutrients, recovers from exercise, responds to
                stress, and more. Click any gene to see how it affects your personalized protocol.
              </p>
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {geneList.map(([key, gene]) => (
                  <Card
                    key={key}
                    className={`cursor-pointer transition-all ${
                      selectedGene === key
                        ? "border-primary/50 bg-primary/10 neon-glow-cyan"
                        : "border-border/50 hover:border-primary/30"
                    }`}
                    onClick={() => setSelectedGene(selectedGene === key ? null : key)}
                  >
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-mono font-bold text-primary">{gene.gene}</span>
                        <Badge className={getImpactColor(gene.impact)}>{gene.impact}</Badge>
                      </div>
                      <p className="text-sm text-muted-foreground mb-2">{gene.variant}</p>
                      <Badge variant="outline" className="text-xs">
                        {gene.status}
                      </Badge>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Gene Detail Panel */}
          {selectedGene && geneticVariants[selectedGene as keyof typeof geneticVariants] && (
            <Card className="glass-card border-primary/20 neon-glow-cyan">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-foreground">
                  <Sparkles className="h-5 w-5 text-primary" />
                  {geneticVariants[selectedGene as keyof typeof geneticVariants].gene} -{" "}
                  {geneticVariants[selectedGene as keyof typeof geneticVariants].variant}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="rounded-xl bg-primary/10 border border-primary/20 p-4">
                  <p className="text-foreground">
                    {geneticVariants[selectedGene as keyof typeof geneticVariants].description}
                  </p>
                </div>

                <div>
                  <h4 className="font-semibold text-foreground mb-3 flex items-center gap-2">
                    <AlertCircle className="h-4 w-4 text-warning" />
                    What This Means For You
                  </h4>
                  <ul className="space-y-2">
                    {geneticVariants[selectedGene as keyof typeof geneticVariants].implications.map((imp, i) => (
                      <li key={i} className="flex items-start gap-2 text-muted-foreground">
                        <ChevronRight className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                        {imp}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  {geneticVariants[selectedGene as keyof typeof geneticVariants].recommendations.supplements && (
                    <div className="rounded-xl border border-accent/20 bg-accent/5 p-4">
                      <h5 className="font-medium text-accent mb-2">Recommended Supplements</h5>
                      <ul className="space-y-1 text-sm text-muted-foreground">
                        {geneticVariants[selectedGene as keyof typeof geneticVariants].recommendations.supplements?.map(
                          (supp, i) => (
                            <li key={i}>• {supp}</li>
                          ),
                        )}
                      </ul>
                    </div>
                  )}
                  {geneticVariants[selectedGene as keyof typeof geneticVariants].recommendations.nutrition && (
                    <div className="rounded-xl border border-secondary/20 bg-secondary/5 p-4">
                      <h5 className="font-medium text-secondary mb-2">Nutrition Focus</h5>
                      <ul className="space-y-1 text-sm text-muted-foreground">
                        {geneticVariants[selectedGene as keyof typeof geneticVariants].recommendations.nutrition?.map(
                          (nut, i) => (
                            <li key={i}>• {nut}</li>
                          ),
                        )}
                      </ul>
                    </div>
                  )}
                  {geneticVariants[selectedGene as keyof typeof geneticVariants].recommendations.exercise && (
                    <div className="rounded-xl border border-warning/20 bg-warning/5 p-4">
                      <h5 className="font-medium text-warning mb-2">Exercise Implications</h5>
                      <ul className="space-y-1 text-sm text-muted-foreground">
                        {geneticVariants[selectedGene as keyof typeof geneticVariants].recommendations.exercise?.map(
                          (ex, i) => (
                            <li key={i}>• {ex}</li>
                          ),
                        )}
                      </ul>
                    </div>
                  )}
                  {geneticVariants[selectedGene as keyof typeof geneticVariants].recommendations.avoid && (
                    <div className="rounded-xl border border-destructive/20 bg-destructive/5 p-4">
                      <h5 className="font-medium text-destructive mb-2">Things to Avoid</h5>
                      <ul className="space-y-1 text-sm text-muted-foreground">
                        {geneticVariants[selectedGene as keyof typeof geneticVariants].recommendations.avoid?.map(
                          (av, i) => (
                            <li key={i}>• {av}</li>
                          ),
                        )}
                      </ul>
                    </div>
                  )}
                </div>

                <div className="flex flex-wrap gap-2">
                  <span className="text-sm text-muted-foreground">Related biomarkers:</span>
                  {geneticVariants[selectedGene as keyof typeof geneticVariants].relatedMarkers.map((marker) => (
                    <Badge key={marker} variant="outline" className="border-primary/30 text-primary">
                      {marker}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        {/* Biomarkers Tab */}
        <TabsContent value="biomarkers" className="space-y-6">
          <Card className="glass-card border-secondary/20">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-foreground">
                <FlaskConical className="h-5 w-5 text-secondary" />
                Your Key Biomarkers
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-6">
                These biomarkers drive your personalized recommendations. Each one connects to specific actions in your
                nutrition, supplement, exercise, and lifestyle protocols.
              </p>
              <div className="space-y-4">
                {biomarkerList.map(([key, marker]) => (
                  <Card
                    key={key}
                    className={`cursor-pointer transition-all ${
                      selectedBiomarker === key
                        ? "border-secondary/50 bg-secondary/10"
                        : "border-border/50 hover:border-secondary/30"
                    }`}
                    onClick={() => setSelectedBiomarker(selectedBiomarker === key ? null : key)}
                  >
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                          <div className="text-center">
                            <div className="text-2xl font-bold text-foreground">
                              {typeof marker.currentValue === "string" ? marker.currentValue : marker.currentValue}
                            </div>
                            <div className="text-xs text-muted-foreground">{marker.unit}</div>
                          </div>
                          <div>
                            <h4 className="font-semibold text-foreground">{key}</h4>
                            <p className="text-sm text-muted-foreground">Optimal: {marker.optimalRange}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <Badge className={getStatusColor(marker.status)}>{marker.status}</Badge>
                          <ChevronRight
                            className={`h-5 w-5 text-muted-foreground transition-transform ${
                              selectedBiomarker === key ? "rotate-90" : ""
                            }`}
                          />
                        </div>
                      </div>

                      {selectedBiomarker === key && (
                        <div className="mt-4 pt-4 border-t border-border/50 space-y-4">
                          <div className="rounded-xl bg-secondary/10 border border-secondary/20 p-4">
                            <p className="text-foreground">{marker.personalizedInsight}</p>
                          </div>

                          <div>
                            <h5 className="font-medium text-foreground mb-2">Affected Systems</h5>
                            <div className="flex flex-wrap gap-2">
                              {marker.affectedSystems.map((sys) => (
                                <Badge key={sys} variant="outline" className="text-xs">
                                  {sys}
                                </Badge>
                              ))}
                            </div>
                          </div>

                          <div className="grid gap-3 sm:grid-cols-2">
                            {marker.recommendations.supplements && (
                              <div className="rounded-lg border border-accent/20 bg-accent/5 p-3">
                                <h6 className="font-medium text-accent text-sm mb-2">Supplements</h6>
                                {marker.recommendations.supplements.map((supp, i) => (
                                  <div key={i} className="text-sm text-muted-foreground mb-1">
                                    <span className="font-medium text-foreground">{supp.name}</span> - {supp.dose}
                                    <p className="text-xs opacity-75">{supp.reason}</p>
                                  </div>
                                ))}
                              </div>
                            )}
                            {marker.recommendations.nutrition && (
                              <div className="rounded-lg border border-secondary/20 bg-secondary/5 p-3">
                                <h6 className="font-medium text-secondary text-sm mb-2">Nutrition</h6>
                                <ul className="text-sm text-muted-foreground space-y-1">
                                  {marker.recommendations.nutrition.map((nut, i) => (
                                    <li key={i}>• {nut}</li>
                                  ))}
                                </ul>
                              </div>
                            )}
                          </div>

                          {marker.research && marker.research.length > 0 && (
                            <div className="rounded-lg border border-border/50 p-3">
                              <h6 className="font-medium text-foreground text-sm mb-2 flex items-center gap-2">
                                <BookOpen className="h-4 w-4 text-primary" />
                                Supporting Research
                              </h6>
                              {marker.research.map((study, i) => (
                                <div key={i} className="text-sm">
                                  <p className="text-foreground">{study.title}</p>
                                  <p className="text-xs text-muted-foreground">{study.journal}</p>
                                  <p className="text-xs text-primary mt-1">Finding: {study.finding}</p>
                                </div>
                              ))}
                            </div>
                          )}
                        </div>
                      )}
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* How AI Works Tab */}
        <TabsContent value="how-it-works" className="space-y-6">
          <Card className="glass-card border-accent/20">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-foreground">
                <Brain className="h-5 w-5 text-accent" />
                {aiExplanation.howItWorks.title}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <p className="text-muted-foreground">
                Helix uses AI to synthesize your unique biological data with the latest research. Here's exactly how we
                generate your personalized recommendations:
              </p>

              <div className="relative">
                {aiExplanation.howItWorks.steps.map((step, i) => (
                  <div key={step.step} className="flex gap-4 mb-6 last:mb-0">
                    <div className="flex flex-col items-center">
                      <div className="w-10 h-10 rounded-full bg-accent/20 border border-accent/30 flex items-center justify-center text-accent font-bold">
                        {step.step}
                      </div>
                      {i < aiExplanation.howItWorks.steps.length - 1 && (
                        <div className="w-0.5 h-full bg-accent/20 mt-2" />
                      )}
                    </div>
                    <div className="flex-1 pb-6">
                      <h4 className="font-semibold text-foreground mb-1">{step.title}</h4>
                      <p className="text-sm text-muted-foreground">{step.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <div className="grid gap-6 sm:grid-cols-2">
            <Card className="glass-card border-primary/20">
              <CardHeader>
                <CardTitle className="text-foreground text-lg">Data We Analyze</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {aiExplanation.dataUsed.map((data, i) => (
                    <li key={i} className="flex items-center gap-2 text-sm text-muted-foreground">
                      <CheckCircle className="h-4 w-4 text-primary" />
                      {data}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            <Card className="glass-card border-secondary/20">
              <CardHeader>
                <CardTitle className="text-foreground text-lg">Research Sources</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {aiExplanation.researchSources.map((source, i) => (
                    <li key={i} className="flex items-center gap-2 text-sm text-muted-foreground">
                      <BookOpen className="h-4 w-4 text-secondary" />
                      {source}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </div>

          <Card className="glass-card border-warning/20">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-warning">
                <AlertCircle className="h-5 w-5" />
                Important Limitations
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                {aiExplanation.limitations.map((limit, i) => (
                  <li key={i} className="flex items-center gap-2 text-sm text-muted-foreground">
                    <span className="h-1.5 w-1.5 rounded-full bg-warning" />
                    {limit}
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Research Updates Tab */}
        <TabsContent value="updates" className="space-y-6">
          <Card className="glass-card border-primary/20">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-foreground">
                <RefreshCw className="h-5 w-5 text-primary neon-text-cyan" />
                Latest Research Updates
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-6">
                Your protocol automatically updates when new research emerges that's relevant to your genetic variants
                and biomarkers. Here are the latest updates:
              </p>
              <div className="space-y-4">
                {researchUpdates.map((update) => (
                  <Card
                    key={update.id}
                    className={`border-border/50 ${update.isNew ? "bg-primary/5 border-primary/30" : ""}`}
                  >
                    <CardContent className="p-4">
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            {update.isNew && (
                              <Badge className="bg-primary/20 text-primary border-primary/30">NEW</Badge>
                            )}
                            <span className="text-xs text-muted-foreground flex items-center gap-1">
                              <Clock className="h-3 w-3" />
                              {update.date}
                            </span>
                          </div>
                          <h4 className="font-semibold text-foreground mb-2">{update.title}</h4>
                          <p className="text-sm text-muted-foreground mb-3">{update.summary}</p>
                          <div className="flex flex-wrap gap-2 mb-3">
                            {update.relevantTo.map((gene) => (
                              <Badge key={gene} variant="outline" className="text-xs border-accent/30 text-accent">
                                <Dna className="h-3 w-3 mr-1" />
                                {gene}
                              </Badge>
                            ))}
                          </div>
                          <div className="rounded-lg bg-secondary/10 border border-secondary/20 p-3">
                            <div className="flex items-center gap-2 text-sm">
                              <Lightbulb className="h-4 w-4 text-secondary" />
                              <span className="text-secondary font-medium">Protocol Impact:</span>
                            </div>
                            <p className="text-sm text-muted-foreground mt-1">{update.impact}</p>
                          </div>
                          <p className="text-xs text-muted-foreground mt-2">Source: {update.source}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Privacy Tab */}
        <TabsContent value="privacy" className="space-y-6">
          <Card className="glass-card border-green-500/20">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-foreground">
                <Shield className="h-5 w-5 text-green-400" />
                {privacyInfo.doctorOversight.title}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-muted-foreground">{privacyInfo.doctorOversight.description}</p>
              <div className="grid gap-3 sm:grid-cols-2">
                {privacyInfo.doctorOversight.features.map((feature, i) => (
                  <div key={i} className="flex items-center gap-2 text-sm text-foreground">
                    <CheckCircle className="h-4 w-4 text-green-400" />
                    {feature}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <div className="grid gap-6 sm:grid-cols-2">
            <Card className="glass-card border-primary/20">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-foreground">
                  <Lock className="h-5 w-5 text-primary" />
                  Data Protection
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {privacyInfo.dataProtection.map((item, i) => (
                    <li key={i} className="flex items-center gap-2 text-sm text-muted-foreground">
                      <CheckCircle className="h-4 w-4 text-primary" />
                      {item}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            <Card className="glass-card border-secondary/20">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-foreground">
                  <Eye className="h-5 w-5 text-secondary" />
                  Your Rights
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {privacyInfo.yourRights.map((right, i) => (
                    <li key={i} className="flex items-center gap-2 text-sm text-muted-foreground">
                      <CheckCircle className="h-4 w-4 text-secondary" />
                      {right}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </div>

          <Card className="glass-card border-border/50">
            <CardContent className="p-6">
              <h4 className="font-semibold text-foreground mb-4">Data Management</h4>
              <div className="flex flex-wrap gap-4">
                <Button variant="outline" className="border-primary/30 text-primary bg-transparent">
                  <Download className="h-4 w-4 mr-2" />
                  Download My Data
                </Button>
                <Button variant="outline" className="border-warning/30 text-warning bg-transparent">
                  <Eye className="h-4 w-4 mr-2" />
                  View Data Sharing
                </Button>
                <Button variant="outline" className="border-destructive/30 text-destructive bg-transparent">
                  <Trash2 className="h-4 w-4 mr-2" />
                  Delete My Account
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
