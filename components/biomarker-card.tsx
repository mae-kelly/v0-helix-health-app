import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"

interface Marker {
  name: string
  value: string | number
  unit: string
  status: string
  reference?: string
  percentile?: number
  zScore?: number
  pattern?: string
}

interface BiomarkerCardProps {
  title: string
  source: string
  markers: Marker[]
  insights: string[]
}

const statusColors: Record<string, string> = {
  normal: "bg-success/10 text-success border-success/20",
  low: "bg-warning/10 text-warning border-warning/20",
  high: "bg-destructive/10 text-destructive border-destructive/20",
  moderate: "bg-warning/10 text-warning border-warning/20",
  critical: "bg-destructive/10 text-destructive border-destructive/20",
  "low-positive": "bg-warning/10 text-warning border-warning/20",
  negative: "bg-success/10 text-success border-success/20",
  elevated: "bg-destructive/10 text-destructive border-destructive/20",
}

export function BiomarkerCard({ title, source, markers, insights }: BiomarkerCardProps) {
  return (
    <Card className="border-border bg-card">
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg font-semibold text-card-foreground">{title}</CardTitle>
          <Badge variant="secondary" className="text-xs font-normal">
            {source}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Markers */}
        <div className="space-y-3">
          {markers.map((marker) => (
            <div
              key={marker.name}
              className="flex items-center justify-between rounded-lg border border-border bg-muted/30 p-3"
            >
              <div className="flex flex-col">
                <span className="text-sm font-medium text-card-foreground">{marker.name}</span>
                {marker.reference && <span className="text-xs text-muted-foreground">Ref: {marker.reference}</span>}
              </div>
              <div className="flex items-center gap-3">
                {marker.percentile !== undefined && (
                  <div className="text-right">
                    <span className="text-xs text-muted-foreground">{marker.percentile}th %ile</span>
                    {marker.zScore !== undefined && (
                      <span className="ml-2 text-xs text-muted-foreground">
                        (Z: {marker.zScore > 0 ? "+" : ""}
                        {marker.zScore})
                      </span>
                    )}
                  </div>
                )}
                <div className="flex items-center gap-2">
                  <span className="text-sm font-semibold text-card-foreground">
                    {marker.value} {marker.unit}
                  </span>
                  <Badge variant="outline" className={cn("text-xs capitalize", statusColors[marker.status])}>
                    {marker.status}
                    {marker.pattern && ` (${marker.pattern})`}
                  </Badge>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Insights */}
        {insights.length > 0 && (
          <div className="rounded-lg bg-accent/50 p-4">
            <h4 className="mb-2 text-sm font-medium text-accent-foreground">AI Insights</h4>
            <ul className="space-y-1">
              {insights.map((insight, i) => (
                <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                  <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-primary shrink-0" />
                  {insight}
                </li>
              ))}
            </ul>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
