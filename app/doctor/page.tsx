"use client"

import { PageHeader } from "@/components/page-header"
import { StatCard } from "@/components/stat-card"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { patients, literature } from "@/lib/mock-data"
import { useAppStore } from "@/lib/store"
import {
  Users,
  AlertTriangle,
  FileText,
  ClipboardList,
  ArrowRight,
  BookOpen,
  ExternalLink,
  Upload,
  Building2,
} from "lucide-react"
import Link from "next/link"

export default function DoctorDashboard() {
  const { userProfile } = useAppStore()
  const patientsNeedingReview = patients.filter((p) => p.status === "needs-review")
  const totalAlerts = patients.reduce((acc, p) => acc + p.alerts.length, 0)

  return (
    <div className="space-y-8">
      <PageHeader
        title={`Welcome back, ${userProfile?.name || "Dr. Smith"}`}
        description="Here's an overview of your patients and recent activity"
      />

      {/* Stats */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard title="Total Patients" value={patients.length} subtitle="Active in system" icon={Users} />
        <StatCard
          title="Needs Review"
          value={patientsNeedingReview.length}
          subtitle="Awaiting your review"
          icon={FileText}
          variant="warning"
        />
        <StatCard
          title="Active Alerts"
          value={totalAlerts}
          subtitle="Requires attention"
          icon={AlertTriangle}
          variant="destructive"
        />
        <StatCard
          title="Plans Pending"
          value={patients.filter((p) => p.status === "pending-plan").length}
          subtitle="Awaiting approval"
          icon={ClipboardList}
        />
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <Card className="glass-card border-border">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-lg font-semibold text-card-foreground">Patients Needing Review</CardTitle>
            <Button variant="ghost" size="sm" asChild className="text-primary hover:text-primary">
              <Link href="/doctor/results">
                View all <ArrowRight className="ml-1 h-4 w-4" />
              </Link>
            </Button>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {patientsNeedingReview.map((patient) => (
                <div
                  key={patient.id}
                  className="flex items-center justify-between rounded-lg border border-border bg-secondary/30 p-4 transition-colors hover:bg-secondary/50 hover:border-primary/30"
                >
                  <div className="flex items-center gap-3">
                    <Avatar className="h-10 w-10 border border-primary/30">
                      <AvatarImage src={patient.avatar || "/placeholder.svg"} />
                      <AvatarFallback className="bg-primary/20 text-primary">{patient.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-medium text-card-foreground">{patient.name}</p>
                      <p className="text-sm text-muted-foreground">
                        Last visit: {new Date(patient.lastVisit).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                  <div className="flex flex-wrap items-center gap-2">
                    {patient.alerts.map((alert) => (
                      <Badge key={alert} variant="destructive" className="text-xs">
                        {alert}
                      </Badge>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="glass-card border-border">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-lg font-semibold text-card-foreground">Relevant Literature</CardTitle>
            <Button variant="ghost" size="sm" asChild className="text-primary hover:text-primary">
              <Link href="/doctor/literature">
                Explore <BookOpen className="ml-1 h-4 w-4" />
              </Link>
            </Button>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {literature.slice(0, 3).map((item) => (
                <div
                  key={item.id}
                  className="rounded-lg border border-border bg-secondary/30 p-4 transition-colors hover:bg-secondary/50 hover:border-primary/30"
                >
                  <div className="flex items-start justify-between gap-2">
                    <div className="space-y-1">
                      <h4 className="font-medium text-card-foreground leading-tight">{item.title}</h4>
                      <p className="text-xs text-muted-foreground">
                        {item.journal} - {item.year}
                      </p>
                    </div>
                    <Badge
                      variant="secondary"
                      className="shrink-0 text-xs bg-primary/20 text-primary border-primary/30"
                    >
                      {item.relevance}
                    </Badge>
                  </div>
                  <p className="mt-2 text-sm text-muted-foreground line-clamp-2">{item.summary}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="glass-card border-border">
        <CardHeader>
          <CardTitle className="text-lg font-semibold text-card-foreground">Quick Actions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-3">
            <Button asChild className="bg-primary hover:bg-primary/90 text-primary-foreground neon-glow-cyan">
              <Link href="/doctor/results">
                <FileText className="mr-2 h-4 w-4" />
                Review Patient Results
              </Link>
            </Button>
            <Button variant="secondary" asChild className="bg-accent hover:bg-accent/90 text-accent-foreground">
              <Link href="/doctor/upload">
                <Upload className="mr-2 h-4 w-4" />
                Upload Results
              </Link>
            </Button>
            <Button variant="secondary" asChild>
              <Link href="/doctor/vendors">
                <Building2 className="mr-2 h-4 w-4" />
                Vendor Connections
              </Link>
            </Button>
            <Button variant="outline" asChild>
              <Link href="/doctor/plans">
                <ClipboardList className="mr-2 h-4 w-4" />
                Manage Plans
              </Link>
            </Button>
            <Button variant="outline" asChild>
              <Link href="/doctor/literature">
                <ExternalLink className="mr-2 h-4 w-4" />
                Search Literature
              </Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
