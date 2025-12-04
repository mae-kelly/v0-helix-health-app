"use client"

import { cn } from "@/lib/utils"
import { useAppStore } from "@/lib/store"
import { usePathname, useRouter } from "next/navigation"
import Link from "next/link"
import {
  LayoutDashboard,
  FileText,
  Salad,
  BookOpen,
  TrendingUp,
  Settings,
  Sun,
  Moon,
  User,
  Stethoscope,
  Upload,
  Building2,
  LogOut,
  Dna,
  Apple,
  Dumbbell,
  MoonIcon,
  Pill,
  Sparkles,
  Trophy,
  Users,
  Target,
  Zap,
  CheckCircle,
  FlaskConical,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"

const doctorNav = [
  { name: "Dashboard", href: "/doctor", icon: LayoutDashboard },
  { name: "Patient Results", href: "/doctor/results", icon: FileText },
  { name: "Upload Results", href: "/doctor/upload", icon: Upload },
  { name: "Vendor Connections", href: "/doctor/vendors", icon: Building2 },
  { name: "Lifestyle Plans", href: "/doctor/plans", icon: Salad },
  { name: "Literature Explorer", href: "/doctor/literature", icon: BookOpen },
  { name: "Progress Tracking", href: "/doctor/progress", icon: TrendingUp },
  { name: "Settings", href: "/doctor/settings", icon: Settings },
]

const patientNav = [
  { name: "Dashboard", href: "/patient", icon: LayoutDashboard },
  { name: "Daily Check-In", href: "/patient/check-in", icon: CheckCircle, highlight: true },
  { name: "Your Science", href: "/patient/science", icon: FlaskConical, isNew: true },
  { name: "My Results", href: "/patient/results", icon: FileText },
  { name: "Upload Results", href: "/patient/upload", icon: Upload },
  { name: "Nutrition", href: "/patient/nutrition", icon: Apple },
  { name: "Exercise", href: "/patient/exercise", icon: Dumbbell },
  { name: "Sleep", href: "/patient/sleep", icon: MoonIcon },
  { name: "Supplements", href: "/patient/supplements", icon: Pill },
  { name: "Lifestyle", href: "/patient/lifestyle", icon: Sparkles },
  { name: "Challenges", href: "/patient/challenges", icon: Target },
  { name: "Accountability", href: "/patient/accountability", icon: Users },
  { name: "Achievements", href: "/patient/achievements", icon: Trophy },
  { name: "Progress", href: "/patient/progress", icon: TrendingUp },
  { name: "Preferences", href: "/patient/preferences", icon: Settings },
]

export function Sidebar() {
  const pathname = usePathname()
  const router = useRouter()
  const {
    mode,
    setMode,
    isDarkMode,
    toggleDarkMode,
    setAuthenticated,
    setOnboardingComplete,
    userProfile,
    gamification,
  } = useAppStore()
  const navItems = mode === "doctor" ? doctorNav : patientNav

  const handleLogout = () => {
    setAuthenticated(false)
    setOnboardingComplete(false)
    router.push("/login")
  }

  return (
    <aside className="fixed left-0 top-0 z-40 h-screen w-64 border-r border-border bg-sidebar">
      <div className="flex h-full flex-col">
        <div className="flex h-16 items-center gap-2 border-b border-sidebar-border px-6">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/20 neon-glow-cyan">
            <Dna className="h-5 w-5 text-primary" />
          </div>
          <span className="text-xl font-bold tracking-widest uppercase text-sidebar-foreground neon-text-cyan">
            HELIX
          </span>
        </div>

        {mode === "patient" && (
          <div className="px-4 py-3 border-b border-sidebar-border">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <Zap className="h-4 w-4 text-accent" />
                <span className="text-xs font-medium text-muted-foreground">Level {gamification.level}</span>
              </div>
              <span className="text-xs font-mono text-primary">{gamification.xp} XP</span>
            </div>
            <div className="h-1.5 bg-secondary rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-primary to-accent neon-glow-cyan transition-all duration-500"
                style={{ width: `${(gamification.xp % 500) / 5}%` }}
              />
            </div>
            <div className="flex items-center justify-between mt-2">
              <div className="flex items-center gap-1 text-xs text-muted-foreground">
                <Trophy className="h-3 w-3 text-accent" />
                <span>{gamification.currentStreak} day streak</span>
              </div>
            </div>
          </div>
        )}

        <div className="px-4 py-4">
          <div className="flex rounded-lg bg-sidebar-accent p-1">
            <button
              onClick={() => setMode("doctor")}
              className={cn(
                "flex flex-1 items-center justify-center gap-2 rounded-md px-3 py-2 text-sm font-medium transition-all",
                mode === "doctor"
                  ? "bg-primary text-primary-foreground neon-glow-cyan"
                  : "text-sidebar-foreground/70 hover:text-sidebar-foreground",
              )}
            >
              <Stethoscope className="h-4 w-4" />
              Doctor
            </button>
            <button
              onClick={() => setMode("patient")}
              className={cn(
                "flex flex-1 items-center justify-center gap-2 rounded-md px-3 py-2 text-sm font-medium transition-all",
                mode === "patient"
                  ? "bg-accent text-accent-foreground neon-glow-magenta"
                  : "text-sidebar-foreground/70 hover:text-sidebar-foreground",
              )}
            >
              <User className="h-4 w-4" />
              Patient
            </button>
          </div>
        </div>

        <Separator className="bg-sidebar-border" />

        <nav className="flex-1 space-y-1 px-3 py-4 overflow-y-auto">
          {navItems.map((item) => {
            const isActive = pathname === item.href
            const NavIcon = item.icon
            const isNew = "isNew" in item && item.isNew
            const highlight = "highlight" in item && item.highlight
            return (
              <Link
                key={item.name}
                href={item.href}
                className={cn(
                  "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-all",
                  isActive
                    ? "bg-primary/20 text-primary border border-primary/30"
                    : "text-sidebar-foreground/70 hover:bg-sidebar-accent/50 hover:text-sidebar-foreground",
                  highlight && !isActive && "border border-accent/30 bg-accent/10",
                  isNew && !isActive && "border border-secondary/30 bg-secondary/10",
                )}
              >
                <NavIcon className={cn("h-5 w-5", isActive && "text-primary")} />
                {item.name}
                {highlight && <Badge className="ml-auto bg-accent text-accent-foreground text-xs px-1.5 py-0">!</Badge>}
                {isNew && (
                  <Badge className="ml-auto bg-secondary text-secondary-foreground text-xs px-1.5 py-0">NEW</Badge>
                )}
              </Link>
            )
          })}
        </nav>

        <div className="border-t border-sidebar-border p-4">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-3">
              <Avatar className="h-9 w-9 border border-primary/30">
                <AvatarImage src="/doctor-portrait.png" />
                <AvatarFallback className="bg-primary/20 text-primary">
                  {userProfile?.name?.charAt(0) || (mode === "doctor" ? "DR" : "PT")}
                </AvatarFallback>
              </Avatar>
              <div className="flex flex-col">
                <span className="text-sm font-medium text-sidebar-foreground">
                  {userProfile?.name || (mode === "doctor" ? "Dr. Smith" : "Sarah Johnson")}
                </span>
                <span className="text-xs text-muted-foreground">
                  {mode === "doctor" ? "Healthcare Provider" : "Patient"}
                </span>
              </div>
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleDarkMode}
              className="text-sidebar-foreground/70 hover:text-sidebar-foreground"
            >
              {isDarkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            </Button>
          </div>

          <Button
            variant="ghost"
            size="sm"
            onClick={handleLogout}
            className="w-full justify-start text-muted-foreground hover:text-destructive"
          >
            <LogOut className="h-4 w-4 mr-2" />
            Sign Out
          </Button>
        </div>
      </div>
    </aside>
  )
}
