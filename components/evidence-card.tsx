"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Dna, FlaskConical, BookOpen, ShieldCheck, ChevronRight, Sparkles } from "lucide-react"

interface EvidenceSource {
  type: "genetic" | "biomarker" | "research" | "clinical"
  name: string
  value?: string
  status?: string
  detail: string
}

interface EvidenceCardProps {
  recommendation: string
  category: string
  evidence: EvidenceSource[]
  doctorApproved?: boolean
  confidenceLevel?: "high" | "moderate" | "emerging"
}

export function EvidenceCard({
  recommendation,
  category,
  evidence,
  doctorApproved = true,
  confidenceLevel = "high",
}: EvidenceCardProps) {
  const getEvidenceIcon = (type: string) => {
    switch (type) {
      case "genetic":
        return <Dna className="h-4 w-4" />
      case "biomarker":
        return <FlaskConical className="h-4 w-4" />
      case "research":
        return <BookOpen className="h-4 w-4" />
      case "clinical":
        return <ShieldCheck className="h-4 w-4" />
      default:
        return <Sparkles className="h-4 w-4" />
    }
  }

  const getConfidenceColor = (level: string) => {
    switch (level) {
      case "high":
        return "bg-primary/20 text-primary border-primary/30"
      case "moderate":
        return "bg-warning/20 text-warning border-warning/30"
      case "emerging":
        return "bg-secondary/20 text-secondary border-secondary/30"
      default:
        return "bg-muted text-muted-foreground border-muted"
    }
  }

  return (
    <Card className="glass-card border-border/50 hover:border-primary/30 transition-all">
      <CardContent className="p-4">
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2">
              <Badge variant="outline" className="text-xs border-primary/30 text-primary">
                {category}
              </Badge>
              <Badge className={`text-xs ${getConfidenceColor(confidenceLevel)}`}>{confidenceLevel} confidence</Badge>
              {doctorApproved && (
                <Badge className="text-xs bg-green-500/20 text-green-400 border-green-500/30">
                  <ShieldCheck className="h-3 w-3 mr-1" />
                  MD Approved
                </Badge>
              )}
            </div>
            <p className="font-medium text-foreground mb-3">{recommendation}</p>
            <div className="flex flex-wrap gap-2">
              {evidence.slice(0, 3).map((e, i) => (
                <div
                  key={i}
                  className="flex items-center gap-1 text-xs text-muted-foreground bg-card/50 rounded-full px-2 py-1"
                >
                  {getEvidenceIcon(e.type)}
                  <span>{e.name}</span>
                  {e.status && (
                    <Badge variant="outline" className="text-[10px] h-4 px-1 border-border/50">
                      {e.status}
                    </Badge>
                  )}
                </div>
              ))}
            </div>
          </div>
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="ghost" size="sm" className="text-primary">
                Why?
                <ChevronRight className="h-4 w-4 ml-1" />
              </Button>
            </DialogTrigger>
            <DialogContent className="glass-card border-primary/20 max-w-lg">
              <DialogHeader>
                <DialogTitle className="text-foreground flex items-center gap-2">
                  <Sparkles className="h-5 w-5 text-primary" />
                  Why This Recommendation?
                </DialogTitle>
                <DialogDescription className="text-muted-foreground">
                  Here's the evidence behind this personalized recommendation.
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4 mt-4">
                <div className="rounded-xl border border-primary/20 bg-primary/5 p-4">
                  <p className="font-medium text-foreground">{recommendation}</p>
                </div>
                <div className="space-y-3">
                  <h4 className="font-semibold text-foreground text-sm">Evidence Sources:</h4>
                  {evidence.map((e, i) => (
                    <div key={i} className="rounded-lg border border-border/50 bg-card/50 p-3">
                      <div className="flex items-center gap-2 mb-2">
                        <div className="p-1.5 rounded-md bg-primary/10 text-primary">{getEvidenceIcon(e.type)}</div>
                        <span className="font-medium text-foreground text-sm">{e.name}</span>
                        {e.value && (
                          <Badge variant="outline" className="text-xs">
                            {e.value}
                          </Badge>
                        )}
                        {e.status && (
                          <Badge
                            className={`text-xs ${
                              e.status === "low" || e.status === "elevated"
                                ? "bg-warning/20 text-warning border-warning/30"
                                : "bg-primary/20 text-primary border-primary/30"
                            }`}
                          >
                            {e.status}
                          </Badge>
                        )}
                      </div>
                      <p className="text-sm text-muted-foreground">{e.detail}</p>
                    </div>
                  ))}
                </div>
                {doctorApproved && (
                  <div className="flex items-center gap-2 text-sm text-green-400 bg-green-500/10 rounded-lg p-3">
                    <ShieldCheck className="h-4 w-4" />
                    <span>Reviewed and approved by Dr. Sarah Chen, MD</span>
                  </div>
                )}
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </CardContent>
    </Card>
  )
}
