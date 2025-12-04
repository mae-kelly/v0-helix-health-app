"use client"

import { useState } from "react"
import { PageHeader } from "@/components/page-header"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import { progressEntries } from "@/lib/mock-data"
import { Plus, Camera, TrendingUp, Calendar, Zap, Heart, Activity, Moon } from "lucide-react"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts"

const chartData = [
  { date: "Nov 20", energy: 4, mood: 5, digestion: 3 },
  { date: "Nov 22", energy: 4, mood: 5, digestion: 4 },
  { date: "Nov 25", energy: 4, mood: 5, digestion: 3 },
  { date: "Nov 28", energy: 5, mood: 6, digestion: 4 },
  { date: "Dec 1", energy: 6, mood: 7, digestion: 5 },
  { date: "Dec 3", energy: 7, mood: 7, digestion: 6 },
]

export default function PatientProgressPage() {
  const [showLogForm, setShowLogForm] = useState(false)
  const [energy, setEnergy] = useState([5])
  const [mood, setMood] = useState([5])
  const [digestion, setDigestion] = useState([5])
  const [sleep, setSleep] = useState([5])
  const [notes, setNotes] = useState("")

  return (
    <div className="space-y-8">
      <PageHeader title="Progress Tracking" description="Log your daily wellness and track improvements over time">
        <Button onClick={() => setShowLogForm(!showLogForm)}>
          <Plus className="mr-2 h-4 w-4" />
          Log Today
        </Button>
      </PageHeader>

      {/* Log Form */}
      {showLogForm && (
        <Card className="border-primary/20 bg-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="h-5 w-5 text-primary" />
              Log Today&apos;s Progress
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid gap-6 sm:grid-cols-2">
              {/* Energy */}
              <div className="space-y-3">
                <Label className="flex items-center gap-2">
                  <Zap className="h-4 w-4 text-warning" />
                  Energy Level: {energy[0]}/10
                </Label>
                <Slider value={energy} onValueChange={setEnergy} max={10} min={1} step={1} className="w-full" />
              </div>

              {/* Mood */}
              <div className="space-y-3">
                <Label className="flex items-center gap-2">
                  <Heart className="h-4 w-4 text-destructive" />
                  Mood: {mood[0]}/10
                </Label>
                <Slider value={mood} onValueChange={setMood} max={10} min={1} step={1} className="w-full" />
              </div>

              {/* Digestion */}
              <div className="space-y-3">
                <Label className="flex items-center gap-2">
                  <Activity className="h-4 w-4 text-primary" />
                  Digestion: {digestion[0]}/10
                </Label>
                <Slider value={digestion} onValueChange={setDigestion} max={10} min={1} step={1} className="w-full" />
              </div>

              {/* Sleep */}
              <div className="space-y-3">
                <Label className="flex items-center gap-2">
                  <Moon className="h-4 w-4 text-primary" />
                  Sleep Quality: {sleep[0]}/10
                </Label>
                <Slider value={sleep} onValueChange={setSleep} max={10} min={1} step={1} className="w-full" />
              </div>
            </div>

            {/* Notes */}
            <div className="space-y-2">
              <Label>Notes (symptoms, observations, wins)</Label>
              <Textarea
                placeholder="How are you feeling today? Any symptoms or improvements to note?"
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                rows={3}
              />
            </div>

            {/* Photo Upload */}
            <div className="space-y-2">
              <Label>Progress Photo (optional)</Label>
              <div className="flex items-center gap-4">
                <Button variant="outline" type="button">
                  <Camera className="mr-2 h-4 w-4" />
                  Upload Photo
                </Button>
                <p className="text-xs text-muted-foreground">Track visual changes over time</p>
              </div>
            </div>

            <div className="flex gap-2">
              <Button onClick={() => setShowLogForm(false)}>Save Entry</Button>
              <Button variant="outline" onClick={() => setShowLogForm(false)}>
                Cancel
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Progress Chart */}
      <Card className="border-border bg-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5 text-primary" />
            Your Progress Over Time
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={chartData}>
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
                <Line
                  type="monotone"
                  dataKey="energy"
                  stroke="var(--chart-3)"
                  strokeWidth={2}
                  dot={{ fill: "var(--chart-3)" }}
                />
                <Line
                  type="monotone"
                  dataKey="mood"
                  stroke="var(--chart-4)"
                  strokeWidth={2}
                  dot={{ fill: "var(--chart-4)" }}
                />
                <Line
                  type="monotone"
                  dataKey="digestion"
                  stroke="var(--chart-1)"
                  strokeWidth={2}
                  dot={{ fill: "var(--chart-1)" }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      {/* AI Insights */}
      <Card className="border-border bg-card">
        <CardHeader>
          <CardTitle className="text-lg font-semibold text-card-foreground">AI Weekly Insights</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="rounded-lg bg-success/10 p-4">
            <h4 className="font-medium text-success">Positive Trend</h4>
            <p className="mt-1 text-sm text-muted-foreground">
              Your energy levels have improved 50% since starting the supplement protocol. Keep taking your Vitamin D
              and Omega-3s consistently.
            </p>
          </div>
          <div className="rounded-lg bg-primary/10 p-4">
            <h4 className="font-medium text-primary">Correlation Found</h4>
            <p className="mt-1 text-sm text-muted-foreground">
              Your digestion scores improve on days you avoid dairy and gluten. The elimination diet is working!
            </p>
          </div>
          <div className="rounded-lg bg-accent/50 p-4">
            <h4 className="font-medium text-accent-foreground">Suggestion</h4>
            <p className="mt-1 text-sm text-muted-foreground">
              Consider adding a progress photo this week to track any visual changes in bloating or skin clarity.
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Previous Entries */}
      <Card className="border-border bg-card">
        <CardHeader>
          <CardTitle className="text-lg font-semibold text-card-foreground">Recent Entries</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {progressEntries.map((entry) => (
            <div key={entry.id} className="rounded-lg border border-border p-4">
              <div className="flex items-center justify-between mb-3">
                <p className="font-medium text-card-foreground">
                  {new Date(entry.date).toLocaleDateString("en-US", {
                    weekday: "long",
                    month: "short",
                    day: "numeric",
                  })}
                </p>
                <div className="flex gap-2">
                  <Badge variant="outline" className="text-xs">
                    Energy: {entry.energy}/10
                  </Badge>
                  <Badge variant="outline" className="text-xs">
                    Mood: {entry.mood}/10
                  </Badge>
                </div>
              </div>
              {entry.notes && <p className="text-sm text-muted-foreground">{entry.notes}</p>}
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  )
}
