"use client"

import { useState } from "react"
import { PageHeader } from "@/components/page-header"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Input } from "@/components/ui/input"
import { patients } from "@/lib/mock-data"
import { Search, ChevronRight } from "lucide-react"
import Link from "next/link"
import { cn } from "@/lib/utils"

const statusColors: Record<string, string> = {
  "needs-review": "bg-warning/10 text-warning border-warning/20",
  "up-to-date": "bg-success/10 text-success border-success/20",
  "pending-plan": "bg-primary/10 text-primary border-primary/20",
}

const statusLabels: Record<string, string> = {
  "needs-review": "Needs Review",
  "up-to-date": "Up to Date",
  "pending-plan": "Pending Plan",
}

export default function PatientResultsPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [filterStatus, setFilterStatus] = useState<string | null>(null)

  const filteredPatients = patients.filter((patient) => {
    const matchesSearch = patient.name.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesFilter = !filterStatus || patient.status === filterStatus
    return matchesSearch && matchesFilter
  })

  return (
    <div className="space-y-8">
      <PageHeader title="Patient Results" description="Review and manage patient lab results and biomarkers" />

      {/* Search and Filters */}
      <Card className="border-border bg-card">
        <CardContent className="p-4">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Search patients..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9"
              />
            </div>
            <div className="flex items-center gap-2">
              <Button
                variant={filterStatus === null ? "default" : "outline"}
                size="sm"
                onClick={() => setFilterStatus(null)}
              >
                All
              </Button>
              <Button
                variant={filterStatus === "needs-review" ? "default" : "outline"}
                size="sm"
                onClick={() => setFilterStatus("needs-review")}
              >
                Needs Review
              </Button>
              <Button
                variant={filterStatus === "pending-plan" ? "default" : "outline"}
                size="sm"
                onClick={() => setFilterStatus("pending-plan")}
              >
                Pending Plan
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Patient List */}
      <div className="space-y-4">
        {filteredPatients.map((patient) => (
          <Card key={patient.id} className="border-border bg-card transition-all hover:shadow-md">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <Avatar className="h-12 w-12">
                    <AvatarImage src={patient.avatar || "/placeholder.svg"} />
                    <AvatarFallback>{patient.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div>
                    <h3 className="font-semibold text-card-foreground">{patient.name}</h3>
                    <div className="flex items-center gap-3 text-sm text-muted-foreground">
                      <span>Age: {patient.age}</span>
                      <span>•</span>
                      <span>Last visit: {new Date(patient.lastVisit).toLocaleDateString()}</span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <Badge variant="outline" className={cn("text-xs capitalize", statusColors[patient.status])}>
                    {statusLabels[patient.status]}
                  </Badge>
                  <Button asChild>
                    <Link href={`/doctor/results/${patient.id}`}>
                      View Results
                      <ChevronRight className="ml-1 h-4 w-4" />
                    </Link>
                  </Button>
                </div>
              </div>
              {patient.alerts.length > 0 && (
                <div className="mt-4 flex flex-wrap gap-2">
                  {patient.alerts.map((alert) => (
                    <Badge key={alert} variant="destructive" className="text-xs">
                      {alert}
                    </Badge>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
