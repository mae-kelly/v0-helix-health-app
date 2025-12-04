"use client"

import { useState } from "react"
import { useParams } from "next/navigation"
import { BiomarkerCard } from "@/components/biomarker-card"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { patients, labResults, literature, lifestylePlan } from "@/lib/mock-data"
import {
  ArrowLeft,
  ThumbsUp,
  ThumbsDown,
  Send,
  Edit,
  BookOpen,
  Dna,
  Flame,
  Pill,
  Shield,
  Bug,
  Apple,
  ExternalLink,
} from "lucide-react"
import Link from "next/link"
import { cn } from "@/lib/utils"

export default function PatientResultsDetailPage() {
  const { id } = useParams()
  const patient = patients.find((p) => p.id === id) || patients[0]
  const [activeTab, setActiveTab] = useState("results")
  const [feedbackGiven, setFeedbackGiven] = useState<Record<string, "up" | "down" | null>>({})

  const handleFeedback = (insightId: string, type: "up" | "down") => {
    setFeedbackGiven((prev) => ({
      ...prev,
      [insightId]: prev[insightId] === type ? null : type,
    }))
  }

  return (
    <div className="space-y-8">
      {/* Back Button & Header */}
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" asChild>
          <Link href="/doctor/results">
            <ArrowLeft className="h-5 w-5" />
          </Link>
        </Button>
        <div className="flex items-center gap-4">
          <Avatar className="h-14 w-14">
            <AvatarImage src={patient.avatar || "/placeholder.svg"} />
            <AvatarFallback>{patient.name.charAt(0)}</AvatarFallback>
          </Avatar>
          <div>
            <h1 className="text-2xl font-semibold text-foreground">{patient.name}</h1>
            <p className="text-sm text-muted-foreground">
              Age {patient.age} • Last updated: {new Date(patient.lastVisit).toLocaleDateString()}
            </p>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="grid w-full grid-cols-4 lg:w-auto lg:inline-grid">
          <TabsTrigger value="results" className="gap-2">
            <Dna className="h-4 w-4" />
            <span className="hidden sm:inline">Lab Results</span>
            <span className="sm:hidden">Results</span>
          </TabsTrigger>
          <TabsTrigger value="plan" className="gap-2">
            <Apple className="h-4 w-4" />
            <span className="hidden sm:inline">Lifestyle Plan</span>
            <span className="sm:hidden">Plan</span>
          </TabsTrigger>
          <TabsTrigger value="literature" className="gap-2">
            <BookOpen className="h-4 w-4" />
            <span className="hidden sm:inline">Literature</span>
            <span className="sm:hidden">Lit</span>
          </TabsTrigger>
          <TabsTrigger value="learning" className="gap-2">
            <ThumbsUp className="h-4 w-4" />
            <span className="hidden sm:inline">AI Learning</span>
            <span className="sm:hidden">AI</span>
          </TabsTrigger>
        </TabsList>

        {/* Lab Results Tab */}
        <TabsContent value="results" className="space-y-6">
          <div className="grid gap-6 lg:grid-cols-2">
            <BiomarkerCard
              title={labResults.lipidPanel.title}
              source={labResults.lipidPanel.source}
              markers={labResults.lipidPanel.markers}
              insights={labResults.lipidPanel.insights}
            />
            <BiomarkerCard
              title={labResults.inflammation.title}
              source={labResults.inflammation.source}
              markers={labResults.inflammation.markers}
              insights={labResults.inflammation.insights}
            />
            <BiomarkerCard
              title={labResults.micronutrients.title}
              source={labResults.micronutrients.source}
              markers={labResults.micronutrients.markers}
              insights={labResults.micronutrients.insights}
            />
            <BiomarkerCard
              title={labResults.autoimmunity.title}
              source={labResults.autoimmunity.source}
              markers={labResults.autoimmunity.markers}
              insights={labResults.autoimmunity.insights}
            />
          </div>

          {/* GI-MAP Section */}
          <Card className="border-border bg-card">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg font-semibold text-card-foreground">{labResults.giMap.title}</CardTitle>
                <Badge variant="secondary" className="text-xs">
                  {labResults.giMap.source}
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid gap-6 md:grid-cols-2">
                {/* Pathogens */}
                <div>
                  <h4 className="mb-3 text-sm font-medium text-card-foreground">Pathogens</h4>
                  <div className="space-y-2">
                    {labResults.giMap.pathogens.map((pathogen) => (
                      <div
                        key={pathogen.name}
                        className="flex items-center justify-between rounded-lg border border-border bg-muted/30 p-3"
                      >
                        <span className="text-sm text-card-foreground">{pathogen.name}</span>
                        <Badge
                          variant="outline"
                          className={cn(
                            "text-xs capitalize",
                            pathogen.status === "negative"
                              ? "bg-success/10 text-success border-success/20"
                              : "bg-destructive/10 text-destructive border-destructive/20",
                          )}
                        >
                          {pathogen.status}
                          {pathogen.value && ` (${pathogen.value})`}
                        </Badge>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Dysbiosis */}
                <div>
                  <h4 className="mb-3 text-sm font-medium text-card-foreground">Dysbiosis Markers</h4>
                  <div className="space-y-2">
                    {labResults.giMap.dysbiosis.map((marker) => (
                      <div
                        key={marker.name}
                        className="flex items-center justify-between rounded-lg border border-border bg-muted/30 p-3"
                      >
                        <div className="flex flex-col">
                          <span className="text-sm text-card-foreground">{marker.name}</span>
                          <span className="text-xs text-muted-foreground">Ref: {marker.reference}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-sm text-card-foreground">{marker.value}</span>
                          <Badge
                            variant="outline"
                            className={cn(
                              "text-xs capitalize",
                              marker.status === "normal"
                                ? "bg-success/10 text-success border-success/20"
                                : marker.status === "low"
                                  ? "bg-warning/10 text-warning border-warning/20"
                                  : "bg-destructive/10 text-destructive border-destructive/20",
                            )}
                          >
                            {marker.status}
                          </Badge>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="rounded-lg bg-accent/50 p-4">
                <h4 className="mb-2 text-sm font-medium text-accent-foreground">AI Insights</h4>
                <ul className="space-y-1">
                  {labResults.giMap.insights.map((insight, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                      <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-primary shrink-0" />
                      {insight}
                    </li>
                  ))}
                </ul>
              </div>
            </CardContent>
          </Card>

          {/* MRT Food Sensitivity */}
          <Card className="border-border bg-card">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg font-semibold text-card-foreground">{labResults.mrt.title}</CardTitle>
                <Badge variant="secondary" className="text-xs">
                  {labResults.mrt.source}
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid gap-6 md:grid-cols-2">
                {/* Reactive Foods */}
                <div>
                  <h4 className="mb-3 text-sm font-medium text-card-foreground">Reactive Foods</h4>
                  <div className="space-y-2">
                    {labResults.mrt.reactive.map((item) => (
                      <div
                        key={item.food}
                        className="flex items-center justify-between rounded-lg border border-border bg-muted/30 p-3"
                      >
                        <div className="flex flex-col">
                          <span className="text-sm text-card-foreground">{item.food}</span>
                          <span className="text-xs text-muted-foreground">{item.category}</span>
                        </div>
                        <Badge
                          variant="outline"
                          className={cn(
                            "text-xs capitalize",
                            item.level === "high"
                              ? "bg-destructive/10 text-destructive border-destructive/20"
                              : "bg-warning/10 text-warning border-warning/20",
                          )}
                        >
                          {item.level}
                        </Badge>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Safe Foods */}
                <div>
                  <h4 className="mb-3 text-sm font-medium text-card-foreground">Safe Foods</h4>
                  <div className="flex flex-wrap gap-2">
                    {labResults.mrt.safe.map((food) => (
                      <Badge key={food} variant="secondary" className="text-sm">
                        {food}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>

              <div className="rounded-lg bg-accent/50 p-4">
                <h4 className="mb-2 text-sm font-medium text-accent-foreground">Recommendations</h4>
                <ul className="space-y-1">
                  {labResults.mrt.insights.map((insight, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                      <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-primary shrink-0" />
                      {insight}
                    </li>
                  ))}
                </ul>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Lifestyle Plan Tab */}
        <TabsContent value="plan" className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-semibold text-foreground">AI-Generated Lifestyle Plan</h2>
              <p className="text-sm text-muted-foreground">
                Review and approve the personalized plan before sending to patient
              </p>
            </div>
            <div className="flex gap-2">
              <Button variant="outline">
                <Edit className="mr-2 h-4 w-4" />
                Edit Plan
              </Button>
              <Button>
                <Send className="mr-2 h-4 w-4" />
                Approve & Send
              </Button>
            </div>
          </div>

          <div className="grid gap-6 lg:grid-cols-2">
            {/* Diet */}
            <Card className="border-border bg-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-lg">
                  <Apple className="h-5 w-5 text-primary" />
                  {lifestylePlan.diet.title}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h4 className="mb-2 text-sm font-medium text-card-foreground">Recommendations</h4>
                  <ul className="space-y-1">
                    {lifestylePlan.diet.recommendations.map((rec, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                        <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-primary shrink-0" />
                        {rec}
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h4 className="mb-2 text-sm font-medium text-destructive">Avoid</h4>
                  <div className="flex flex-wrap gap-2">
                    {lifestylePlan.diet.avoidList.map((food) => (
                      <Badge key={food} variant="destructive" className="text-xs">
                        {food}
                      </Badge>
                    ))}
                  </div>
                </div>
                <div>
                  <h4 className="mb-2 text-sm font-medium text-warning">Rotate</h4>
                  <div className="flex flex-wrap gap-2">
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
              </CardContent>
            </Card>

            {/* Supplements */}
            <Card className="border-border bg-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-lg">
                  <Pill className="h-5 w-5 text-primary" />
                  {lifestylePlan.supplements.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {lifestylePlan.supplements.items.map((supp) => (
                    <div key={supp.name} className="rounded-lg border border-border bg-muted/30 p-3">
                      <div className="flex items-center justify-between">
                        <span className="font-medium text-card-foreground">{supp.name}</span>
                        <Badge variant="secondary" className="text-xs">
                          {supp.dosage}
                        </Badge>
                      </div>
                      <p className="mt-1 text-xs text-muted-foreground">{supp.frequency}</p>
                      <p className="mt-1 text-xs text-primary">{supp.reason}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Exercise */}
            <Card className="border-border bg-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-lg">
                  <Flame className="h-5 w-5 text-primary" />
                  {lifestylePlan.exercise.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {lifestylePlan.exercise.recommendations.map((rec, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                      <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-primary shrink-0" />
                      {rec}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            {/* Sleep */}
            <Card className="border-border bg-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-lg">
                  <Shield className="h-5 w-5 text-primary" />
                  {lifestylePlan.sleep.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {lifestylePlan.sleep.recommendations.map((rec, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                      <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-primary shrink-0" />
                      {rec}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            {/* Stress */}
            <Card className="border-border bg-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-lg">
                  <Shield className="h-5 w-5 text-primary" />
                  {lifestylePlan.stress.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {lifestylePlan.stress.recommendations.map((rec, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                      <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-primary shrink-0" />
                      {rec}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            {/* Gut Protocol */}
            <Card className="border-border bg-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-lg">
                  <Bug className="h-5 w-5 text-primary" />
                  {lifestylePlan.gut.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {lifestylePlan.gut.recommendations.map((rec, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                      <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-primary shrink-0" />
                      {rec}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Literature Tab */}
        <TabsContent value="literature" className="space-y-6">
          <div>
            <h2 className="text-xl font-semibold text-foreground">Relevant Literature</h2>
            <p className="text-sm text-muted-foreground">
              Peer-reviewed studies linked to this patient&apos;s abnormal markers
            </p>
          </div>

          <div className="grid gap-4 lg:grid-cols-2">
            {literature.map((item) => (
              <Card key={item.id} className="border-border bg-card">
                <CardContent className="p-5">
                  <div className="flex items-start justify-between gap-3">
                    <Badge variant="secondary" className="shrink-0 text-xs">
                      {item.relevance}
                    </Badge>
                    <span className="text-xs text-muted-foreground">{item.year}</span>
                  </div>
                  <h3 className="mt-3 font-medium text-card-foreground leading-snug">{item.title}</h3>
                  <p className="mt-1 text-xs text-muted-foreground">{item.journal}</p>
                  <p className="mt-3 text-sm text-muted-foreground">{item.summary}</p>
                  <Button variant="link" className="mt-2 h-auto p-0 text-primary" asChild>
                    <a href={`https://doi.org/${item.doi}`} target="_blank" rel="noopener noreferrer">
                      View Study <ExternalLink className="ml-1 h-3 w-3" />
                    </a>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* AI Learning Tab */}
        <TabsContent value="learning" className="space-y-6">
          <div>
            <h2 className="text-xl font-semibold text-foreground">Supervised Learning Panel</h2>
            <p className="text-sm text-muted-foreground">
              Help improve AI recommendations by marking insights as helpful or unhelpful
            </p>
          </div>

          <Card className="border-border bg-card">
            <CardHeader>
              <CardTitle className="text-lg">AI-Generated Insights</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {[
                ...labResults.lipidPanel.insights,
                ...labResults.inflammation.insights,
                ...labResults.micronutrients.insights,
                ...labResults.giMap.insights,
              ].map((insight, i) => (
                <div
                  key={i}
                  className="flex items-center justify-between rounded-lg border border-border bg-muted/30 p-4"
                >
                  <p className="flex-1 text-sm text-card-foreground">{insight}</p>
                  <div className="flex items-center gap-2 ml-4">
                    <Button
                      variant={feedbackGiven[`insight-${i}`] === "up" ? "default" : "outline"}
                      size="icon"
                      className={cn(
                        "h-8 w-8",
                        feedbackGiven[`insight-${i}`] === "up" &&
                          "bg-success text-success-foreground hover:bg-success/90",
                      )}
                      onClick={() => handleFeedback(`insight-${i}`, "up")}
                    >
                      <ThumbsUp className="h-4 w-4" />
                    </Button>
                    <Button
                      variant={feedbackGiven[`insight-${i}`] === "down" ? "default" : "outline"}
                      size="icon"
                      className={cn(
                        "h-8 w-8",
                        feedbackGiven[`insight-${i}`] === "down" &&
                          "bg-destructive text-destructive-foreground hover:bg-destructive/90",
                      )}
                      onClick={() => handleFeedback(`insight-${i}`, "down")}
                    >
                      <ThumbsDown className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          <div className="rounded-lg bg-accent/50 p-6">
            <h3 className="font-medium text-accent-foreground">How this helps</h3>
            <p className="mt-2 text-sm text-muted-foreground">
              Your feedback trains our AI model to provide better, more personalized recommendations for future
              patients. By marking insights as helpful or unhelpful, you&apos;re helping us understand what clinical
              insights are most valuable in practice.
            </p>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
