import { create } from "zustand"
import { persist } from "zustand/middleware"

export type UserMode = "doctor" | "patient"

interface AppState {
  mode: UserMode
  setMode: (mode: UserMode) => void
  isDarkMode: boolean
  toggleDarkMode: () => void
  isAuthenticated: boolean
  setAuthenticated: (value: boolean) => void
  hasCompletedOnboarding: boolean
  setOnboardingComplete: (value: boolean) => void
  userProfile: UserProfile | null
  setUserProfile: (profile: UserProfile) => void
  gamification: GamificationState
  updateGamification: (updates: Partial<GamificationState>) => void
  addXP: (amount: number) => void
  completeTask: (taskId: string) => void
  dailyCheckIn: DailyCheckIn | null
  setDailyCheckIn: (checkIn: DailyCheckIn) => void
  accountability: AccountabilityState
  updateAccountability: (updates: Partial<AccountabilityState>) => void
  challenges: Challenge[]
  joinChallenge: (challengeId: string) => void
  completedTasks: string[]
}

export interface UserProfile {
  name: string
  email: string
  role: "doctor" | "patient"
  goals: string[]
  fitnessLevel: string
  dietaryPreferences: string[]
  sleepGoal: number
  supplements: string[]
  healthConditions: string[]
  motivation: string
  timeline: string
}

export interface GamificationState {
  xp: number
  level: number
  currentStreak: number
  longestStreak: number
  totalDaysLogged: number
  badges: Badge[]
  weeklyXP: number[]
  lastCheckIn: string | null
}

export interface Badge {
  id: string
  name: string
  description: string
  icon: string
  unlockedAt: string | null
  requirement: number
  type: "streak" | "tasks" | "xp" | "special"
}

export interface DailyCheckIn {
  date: string
  morningIntention: string
  energyLevel: number
  moodLevel: number
  sleepQuality: number
  eveningReflection?: string
  gratitude?: string[]
  wins?: string[]
  challenges?: string[]
}

export interface AccountabilityState {
  hasPartner: boolean
  partnerName: string | null
  partnerEmail: string | null
  commitmentContract: CommitmentContract | null
  weeklyReportEnabled: boolean
  notificationsEnabled: boolean
  missedDayPenalty: number
}

export interface CommitmentContract {
  goal: string
  startDate: string
  endDate: string
  stakeAmount: number
  antiCharity: string | null
  referee: string | null
  isActive: boolean
}

export interface Challenge {
  id: string
  name: string
  description: string
  type: "nutrition" | "exercise" | "sleep" | "mindfulness" | "custom"
  duration: number
  startDate: string
  endDate: string
  participants: number
  prize?: string
  joined: boolean
  progress: number
  dailyTasks: string[]
}

const defaultBadges: Badge[] = [
  {
    id: "first-step",
    name: "First Step",
    description: "Complete your first task",
    icon: "footprints",
    unlockedAt: null,
    requirement: 1,
    type: "tasks",
  },
  {
    id: "week-warrior",
    name: "Week Warrior",
    description: "7-day streak",
    icon: "flame",
    unlockedAt: null,
    requirement: 7,
    type: "streak",
  },
  {
    id: "month-master",
    name: "Month Master",
    description: "30-day streak",
    icon: "crown",
    unlockedAt: null,
    requirement: 30,
    type: "streak",
  },
  {
    id: "century",
    name: "Century Club",
    description: "100-day streak",
    icon: "star",
    unlockedAt: null,
    requirement: 100,
    type: "streak",
  },
  {
    id: "xp-500",
    name: "Rising Star",
    description: "Earn 500 XP",
    icon: "sparkles",
    unlockedAt: null,
    requirement: 500,
    type: "xp",
  },
  {
    id: "xp-2500",
    name: "Health Champion",
    description: "Earn 2,500 XP",
    icon: "trophy",
    unlockedAt: null,
    requirement: 2500,
    type: "xp",
  },
  {
    id: "xp-10000",
    name: "Wellness Legend",
    description: "Earn 10,000 XP",
    icon: "medal",
    unlockedAt: null,
    requirement: 10000,
    type: "xp",
  },
  {
    id: "early-bird",
    name: "Early Bird",
    description: "Log before 7am for 5 days",
    icon: "sunrise",
    unlockedAt: null,
    requirement: 5,
    type: "special",
  },
  {
    id: "perfectionist",
    name: "Perfectionist",
    description: "100% completion for 7 days",
    icon: "check-circle",
    unlockedAt: null,
    requirement: 7,
    type: "special",
  },
]

const defaultChallenges: Challenge[] = [
  {
    id: "hydration-30",
    name: "30-Day Hydration Challenge",
    description: "Drink 8 glasses of water every day for 30 days",
    type: "nutrition",
    duration: 30,
    startDate: "2025-01-01",
    endDate: "2025-01-30",
    participants: 1247,
    prize: "Exclusive badge + 500 XP",
    joined: false,
    progress: 0,
    dailyTasks: ["Drink 8 glasses of water"],
  },
  {
    id: "steps-challenge",
    name: "10K Steps Challenge",
    description: "Hit 10,000 steps every day for 2 weeks",
    type: "exercise",
    duration: 14,
    startDate: "2025-01-06",
    endDate: "2025-01-20",
    participants: 892,
    prize: "500 XP + Leaderboard recognition",
    joined: false,
    progress: 0,
    dailyTasks: ["Walk 10,000 steps"],
  },
  {
    id: "sleep-reset",
    name: "Sleep Reset Week",
    description: "Follow optimal sleep hygiene for 7 days",
    type: "sleep",
    duration: 7,
    startDate: "2025-01-08",
    endDate: "2025-01-15",
    participants: 634,
    prize: "300 XP + Sleep badge",
    joined: false,
    progress: 0,
    dailyTasks: ["No screens 1hr before bed", "Sleep by 10:30pm", "Wake at same time"],
  },
  {
    id: "mindful-month",
    name: "Mindful Month",
    description: "10 minutes of meditation daily for 30 days",
    type: "mindfulness",
    duration: 30,
    startDate: "2025-01-01",
    endDate: "2025-01-31",
    participants: 2103,
    prize: "1000 XP + Zen Master badge",
    joined: false,
    progress: 0,
    dailyTasks: ["Complete 10-minute meditation"],
  },
]

export const useAppStore = create<AppState>()(
  persist(
    (set, get) => ({
      mode: "doctor",
      setMode: (mode) => set({ mode }),
      isDarkMode: true,
      toggleDarkMode: () =>
        set((state) => {
          const newMode = !state.isDarkMode
          if (typeof window !== "undefined") {
            document.documentElement.classList.toggle("dark", newMode)
          }
          return { isDarkMode: newMode }
        }),
      isAuthenticated: false,
      setAuthenticated: (value) => set({ isAuthenticated: value }),
      hasCompletedOnboarding: false,
      setOnboardingComplete: (value) => set({ hasCompletedOnboarding: value }),
      userProfile: null,
      setUserProfile: (profile) => set({ userProfile: profile }),

      gamification: {
        xp: 0,
        level: 1,
        currentStreak: 0,
        longestStreak: 0,
        totalDaysLogged: 0,
        badges: defaultBadges,
        weeklyXP: [0, 0, 0, 0, 0, 0, 0],
        lastCheckIn: null,
      },
      updateGamification: (updates) =>
        set((state) => ({
          gamification: { ...state.gamification, ...updates },
        })),
      addXP: (amount) =>
        set((state) => {
          const newXP = state.gamification.xp + amount
          const newLevel = Math.floor(newXP / 500) + 1
          const today = new Date().getDay()
          const newWeeklyXP = [...state.gamification.weeklyXP]
          newWeeklyXP[today] += amount

          // Check for XP badges
          const updatedBadges = state.gamification.badges.map((badge) => {
            if (badge.type === "xp" && !badge.unlockedAt && newXP >= badge.requirement) {
              return { ...badge, unlockedAt: new Date().toISOString() }
            }
            return badge
          })

          return {
            gamification: {
              ...state.gamification,
              xp: newXP,
              level: newLevel,
              weeklyXP: newWeeklyXP,
              badges: updatedBadges,
            },
          }
        }),
      completeTask: (taskId) =>
        set((state) => ({
          completedTasks: [...state.completedTasks, taskId],
        })),
      completedTasks: [],

      dailyCheckIn: null,
      setDailyCheckIn: (checkIn) =>
        set((state) => {
          const today = new Date().toDateString()
          const lastCheckIn = state.gamification.lastCheckIn
          const wasYesterday =
            lastCheckIn && new Date(lastCheckIn).toDateString() === new Date(Date.now() - 86400000).toDateString()

          let newStreak = state.gamification.currentStreak
          if (wasYesterday || !lastCheckIn) {
            newStreak = state.gamification.currentStreak + 1
          } else if (lastCheckIn !== today) {
            newStreak = 1
          }

          // Check for streak badges
          const updatedBadges = state.gamification.badges.map((badge) => {
            if (badge.type === "streak" && !badge.unlockedAt && newStreak >= badge.requirement) {
              return { ...badge, unlockedAt: new Date().toISOString() }
            }
            return badge
          })

          return {
            dailyCheckIn: checkIn,
            gamification: {
              ...state.gamification,
              currentStreak: newStreak,
              longestStreak: Math.max(newStreak, state.gamification.longestStreak),
              totalDaysLogged: state.gamification.totalDaysLogged + 1,
              lastCheckIn: today,
              badges: updatedBadges,
            },
          }
        }),

      accountability: {
        hasPartner: false,
        partnerName: null,
        partnerEmail: null,
        commitmentContract: null,
        weeklyReportEnabled: true,
        notificationsEnabled: true,
        missedDayPenalty: 0,
      },
      updateAccountability: (updates) =>
        set((state) => ({
          accountability: { ...state.accountability, ...updates },
        })),

      challenges: defaultChallenges,
      joinChallenge: (challengeId) =>
        set((state) => ({
          challenges: state.challenges.map((c) =>
            c.id === challengeId ? { ...c, joined: true, participants: c.participants + 1 } : c,
          ),
        })),
    }),
    {
      name: "helix-storage",
    },
  ),
)
