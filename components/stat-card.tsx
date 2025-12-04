import { Card, CardContent } from "@/components/ui/card"
import { cn } from "@/lib/utils"
import type { LucideIcon } from "lucide-react"

interface StatCardProps {
  title: string
  value: string | number
  subtitle?: string
  icon?: LucideIcon
  trend?: "up" | "down" | "neutral"
  trendValue?: string
  variant?: "default" | "success" | "warning" | "destructive"
}

export function StatCard({
  title,
  value,
  subtitle,
  icon: Icon,
  trend,
  trendValue,
  variant = "default",
}: StatCardProps) {
  return (
    <Card className="glass-card border-border">
      <CardContent className="p-6">
        <div className="flex items-start justify-between">
          <div className="space-y-2">
            <p className="text-sm font-medium text-muted-foreground">{title}</p>
            <div className="flex items-baseline gap-2">
              <span
                className={cn(
                  "text-3xl font-semibold",
                  variant === "default" && "text-primary",
                  variant === "success" && "text-success neon-text-lime",
                  variant === "warning" && "text-warning",
                  variant === "destructive" && "text-destructive",
                )}
              >
                {value}
              </span>
              {trendValue && (
                <span
                  className={cn(
                    "text-sm font-medium",
                    trend === "up" && "text-success",
                    trend === "down" && "text-destructive",
                    trend === "neutral" && "text-muted-foreground",
                  )}
                >
                  {trend === "up" && "↑"}
                  {trend === "down" && "↓"}
                  {trendValue}
                </span>
              )}
            </div>
            {subtitle && <p className="text-xs text-muted-foreground">{subtitle}</p>}
          </div>
          {Icon && (
            <div
              className={cn(
                "flex h-10 w-10 items-center justify-center rounded-lg",
                variant === "default" && "bg-primary/20 text-primary neon-glow-cyan",
                variant === "success" && "bg-success/20 text-success neon-glow-lime",
                variant === "warning" && "bg-warning/20 text-warning",
                variant === "destructive" && "bg-destructive/20 text-destructive",
              )}
            >
              <Icon className="h-5 w-5" />
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
