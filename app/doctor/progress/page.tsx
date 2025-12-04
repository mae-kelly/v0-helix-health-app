"use client"

import { useState } from "react"
import { PageHeader } from "@/components/page-header"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { patients } from "@/lib/mock-data"
import { TrendingUp, TrendingDown, Zap, Heart, Activity } from "lucide-react"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts"
import { cn } from "@/lib/utils"

const patientProgressData = {
  "1": [
    { date: "Nov 20", energy: 4, mood: 5, digestion: 3, crp: 1.2 },
    { date: "Nov 25", energy: 4, mood: 5, digestion: 3, crp: 1.1 },
    { date: "Nov 28", energy: 5, mood: 6, digestion: 4, crp: 0.9 },
    { date: "Dec 1", energy: 6, mood: 7, digestion: 5, crp: 0.8 },
  ],
  "3": [
    { date: "Nov 20", energy: 5, mood: 6, digestion: 4, crp: 0.6 },
    { date: "Nov 25", energy: 5, mood: 6, digestion: 5, crp: 0.5 },
    { date: "Nov 28", energy: 6, mood: 7, digestion: 5, crp: 0.5 },
    { date: "Dec 1", energy: 7, mood: 7, digestion: 6, crp: 0.4 },
  ],
}

export default function DoctorProgressPage() {
  const [selectedPatient, setSelectedPatient] = useState(patients[0])
  const progressData =
    patientProgressData[selectedPatient.id as keyof typeof patientProgressData] || patientProgressData["1"]

  return (
    <div className="space-y-8">
      <PageHeader title="Progress Tracking" description="Monitor patient progress and correlate with lab markers" />

      <div className="grid gap-6 lg:grid-cols-4">
        {/* Patient List */}
        <Card className="border-border bg-card lg:col-span-1">
          <CardHeader>
            <CardTitle className="text-lg font-semibold text-card-foreground">Patients</CardTitle>
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
                  <p className="text-xs text-muted-foreground">Last log: Dec 1</p>
                </div>
              </button>
            ))}
          </CardContent>
        </Card>

        {/* Progress Details */}
        <div className="lg:col-span-3 space-y-6">
          {/* Patient Header */}
          <Card className="border-border bg-card">
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <Avatar className="h-14 w-14">
                  <AvatarImage src={selectedPatient.avatar || "/placeholder.svg"} />
                  <AvatarFallback>{selectedPatient.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <div>
                  <h2 className="text-xl font-semibold text-card-foreground">{selectedPatient.name}</h2>
                  <p className="text-sm text-muted-foreground">
                    Tracking since November 2024 • {progressData.length} entries
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Trend Summary */}
          <div className="grid gap-4 sm:grid-cols-4">
            <Card className="border-border bg-card">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <Zap className="h-5 w-5 text-warning" />
                  <TrendingUp className="h-4 w-4 text-success" />
                </div>
                <p className="mt-2 text-2xl font-bold text-card-foreground">+50%</p>
                <p className="text-xs text-muted-foreground">Energy</p>
              </CardContent>
            </Card>
            <Card className="border-border bg-card">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <Heart className="h-5 w-5 text-destructive" />
                  <TrendingUp className="h-4 w-4 text-success" />
                </div>
                <p className="mt-2 text-2xl font-bold text-card-foreground">+40%</p>
                <p className="text-xs text-muted-foreground">Mood</p>
              </CardContent>
            </Card>
            <Card className="border-border bg-card">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <Activity className="h-5 w-5 text-primary" />
                  <TrendingUp className="h-4 w-4 text-success" />
                </div>
                <p className="mt-2 text-2xl font-bold text-card-foreground">+67%</p>
                <p className="text-xs text-muted-foreground">Digestion</p>
              </CardContent>
            </Card>
            <Card className="border-border bg-card">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-medium text-muted-foreground">CRP</span>
                  <TrendingDown className="h-4 w-4 text-success" />
                </div>
                <p className="mt-2 text-2xl font-bold text-card-foreground">-33%</p>
                <p className="text-xs text-muted-foreground">Inflammation</p>
              </CardContent>
            </Card>
          </div>

          {/* Progress Chart */}
          <Card className="border-border bg-card">
            <CardHeader>
              <CardTitle className="text-lg font-semibold text-card-foreground">Progress Over Time</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-72">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={progressData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
                    <XAxis dataKey="date" stroke="var(--muted-foreground)" fontSize={12} />
                    <YAxis domain={[0, 10]} stroke="var(--muted-foreground)" fontSize={12} />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "var(--card)",
                        border: "1px solid var(--border)",
                        borderRadius: "8px",
                      }}
                    />
                    <Legend />
                    <Line type="monotone" dataKey="energy" stroke="var(--chart-3)" strokeWidth={2} />
                    <Line type="monotone" dataKey="mood" stroke="var(--chart-4)" strokeWidth={2} />
                    <Line type="monotone" dataKey="digestion" stroke="var(--chart-1)" strokeWidth={2} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          {/* AI Correlations */}
          <Card className="border-border bg-card">
            <CardHeader>
              <CardTitle className="text-lg font-semibold text-card-foreground">AI-Detected Correlations</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="rounded-lg bg-success/10 p-4">
                <h4 className="font-medium text-success">CRP Decrease Correlates with Improved Energy</h4>
                <p className="mt-1 text-sm text-muted-foreground">
                  As inflammation markers decreased (CRP from 1.2 to 0.8), energy levels increased proportionally. The
                  anti-inflammatory diet appears to be effective.
                </p>
              </div>
              <div className="rounded-lg bg-primary/10 p-4">
                <h4 className="font-medium text-primary">Digestion Improves with Elimination Diet</h4>
                <p className="mt-1 text-sm text-muted-foreground">
                  Digestion scores improved significantly after dairy and gluten elimination, supporting the MRT test
                  findings.
                </p>
              </div>
              <div className="rounded-lg bg-accent/50 p-4">
                <h4 className="font-medium text-accent-foreground">Recommendation</h4>
                <p className="mt-1 text-sm text-muted-foreground">
                  Consider retesting vitamin D levels at the 8-week mark to assess supplementation efficacy. Current
                  trajectory suggests good adherence to protocol.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
