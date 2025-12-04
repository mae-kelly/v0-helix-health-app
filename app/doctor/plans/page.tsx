"use client"

import { useState } from "react"
import { PageHeader } from "@/components/page-header"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { patients, lifestylePlan } from "@/lib/mock-data"
import { Send, Edit, Check, Clock, Apple, Pill, Flame, Shield, Bug } from "lucide-react"
import { cn } from "@/lib/utils"

export default function LifestylePlansPage() {
  const [selectedPatient, setSelectedPatient] = useState(patients[0])

  return (
    <div className="space-y-8">
      <PageHeader
        title="Lifestyle Plans"
        description="Create, review, and send personalized lifestyle plans to patients"
      />

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Patient List */}
        <Card className="border-border bg-card lg:col-span-1">
          <CardHeader>
            <CardTitle className="text-lg font-semibold text-card-foreground">Select Patient</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            {patients.map((patient) => (
              <button
                key={patient.id}
                onClick={() => setSelectedPatient(patient)}
                className={cn(
                  "flex w-full items-center gap-3 rounded-lg p-3 text-left transition-colors",
                  selectedPatient.id === patient.id ? "bg-primary/10 text-primary" : "hover:bg-muted",
                )}
              >
                <Avatar className="h-10 w-10">
                  <AvatarImage src={patient.avatar || "/placeholder.svg"} />
                  <AvatarFallback>{patient.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <div className="flex-1 min-w-0">
                  <p className="font-medium truncate">{patient.name}</p>
                  <p className="text-xs text-muted-foreground">
                    {patient.status === "pending-plan" ? "Plan pending" : "Plan sent"}
                  </p>
                </div>
                {patient.status === "pending-plan" ? (
                  <Clock className="h-4 w-4 text-warning" />
                ) : (
                  <Check className="h-4 w-4 text-success" />
                )}
              </button>
            ))}
          </CardContent>
        </Card>

        {/* Plan Editor */}
        <Card className="border-border bg-card lg:col-span-2">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Avatar className="h-10 w-10">
                  <AvatarImage src={selectedPatient.avatar || "/placeholder.svg"} />
                  <AvatarFallback>{selectedPatient.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <div>
                  <CardTitle className="text-lg font-semibold text-card-foreground">
                    {selectedPatient.name}&apos;s Plan
                  </CardTitle>
                  <p className="text-sm text-muted-foreground">
                    Last updated: {new Date(selectedPatient.lastVisit).toLocaleDateString()}
                  </p>
                </div>
              </div>
              <div className="flex gap-2">
                <Button variant="outline" size="sm">
                  <Edit className="mr-2 h-4 w-4" />
                  Edit
                </Button>
                <Button size="sm">
                  <Send className="mr-2 h-4 w-4" />
                  Send to Patient
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="diet" className="space-y-4">
              <TabsList className="grid w-full grid-cols-6">
                <TabsTrigger value="diet" className="text-xs">
                  Diet
                </TabsTrigger>
                <TabsTrigger value="supplements" className="text-xs">
                  Supps
                </TabsTrigger>
                <TabsTrigger value="exercise" className="text-xs">
                  Exercise
                </TabsTrigger>
                <TabsTrigger value="sleep" className="text-xs">
                  Sleep
                </TabsTrigger>
                <TabsTrigger value="stress" className="text-xs">
                  Stress
                </TabsTrigger>
                <TabsTrigger value="gut" className="text-xs">
                  Gut
                </TabsTrigger>
              </TabsList>

              <TabsContent value="diet" className="space-y-4">
                <div className="rounded-lg border border-border p-4">
                  <h4 className="font-medium text-card-foreground flex items-center gap-2">
                    <Apple className="h-4 w-4 text-primary" />
                    Recommendations
                  </h4>
                  <ul className="mt-3 space-y-2">
                    {lifestylePlan.diet.recommendations.map((rec, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                        <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-primary shrink-0" />
                        {rec}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="rounded-lg border border-destructive/20 bg-destructive/5 p-4">
                    <h4 className="font-medium text-destructive">Foods to Avoid</h4>
                    <div className="mt-2 flex flex-wrap gap-2">
                      {lifestylePlan.diet.avoidList.map((food) => (
                        <Badge key={food} variant="destructive" className="text-xs">
                          {food}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  <div className="rounded-lg border border-warning/20 bg-warning/5 p-4">
                    <h4 className="font-medium text-warning">Foods to Rotate</h4>
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
              </TabsContent>

              <TabsContent value="supplements" className="space-y-3">
                {lifestylePlan.supplements.items.map((supp) => (
                  <div key={supp.name} className="rounded-lg border border-border p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Pill className="h-4 w-4 text-primary" />
                        <span className="font-medium text-card-foreground">{supp.name}</span>
                      </div>
                      <Badge variant="secondary">{supp.dosage}</Badge>
                    </div>
                    <p className="mt-1 text-sm text-muted-foreground">{supp.frequency}</p>
                    <p className="mt-1 text-xs text-primary">{supp.reason}</p>
                  </div>
                ))}
              </TabsContent>

              <TabsContent value="exercise" className="space-y-2">
                <div className="rounded-lg border border-border p-4">
                  <h4 className="font-medium text-card-foreground flex items-center gap-2">
                    <Flame className="h-4 w-4 text-primary" />
                    Exercise Protocol
                  </h4>
                  <ul className="mt-3 space-y-2">
                    {lifestylePlan.exercise.recommendations.map((rec, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                        <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-primary shrink-0" />
                        {rec}
                      </li>
                    ))}
                  </ul>
                </div>
              </TabsContent>

              <TabsContent value="sleep" className="space-y-2">
                <div className="rounded-lg border border-border p-4">
                  <h4 className="font-medium text-card-foreground flex items-center gap-2">
                    <Shield className="h-4 w-4 text-primary" />
                    Sleep Protocol
                  </h4>
                  <ul className="mt-3 space-y-2">
                    {lifestylePlan.sleep.recommendations.map((rec, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                        <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-primary shrink-0" />
                        {rec}
                      </li>
                    ))}
                  </ul>
                </div>
              </TabsContent>

              <TabsContent value="stress" className="space-y-2">
                <div className="rounded-lg border border-border p-4">
                  <h4 className="font-medium text-card-foreground flex items-center gap-2">
                    <Shield className="h-4 w-4 text-primary" />
                    Stress & Recovery
                  </h4>
                  <ul className="mt-3 space-y-2">
                    {lifestylePlan.stress.recommendations.map((rec, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                        <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-primary shrink-0" />
                        {rec}
                      </li>
                    ))}
                  </ul>
                </div>
              </TabsContent>

              <TabsContent value="gut" className="space-y-2">
                <div className="rounded-lg border border-border p-4">
                  <h4 className="font-medium text-card-foreground flex items-center gap-2">
                    <Bug className="h-4 w-4 text-primary" />
                    Gut Protocol
                  </h4>
                  <ul className="mt-3 space-y-2">
                    {lifestylePlan.gut.recommendations.map((rec, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                        <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-primary shrink-0" />
                        {rec}
                      </li>
                    ))}
                  </ul>
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
