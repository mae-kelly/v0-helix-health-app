"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { useAppStore } from "@/lib/store"

export default function Home() {
  const router = useRouter()
  const { isAuthenticated, hasCompletedOnboarding, userProfile } = useAppStore()

  useEffect(() => {
    if (!isAuthenticated) {
      router.push("/login")
    } else if (!hasCompletedOnboarding) {
      router.push("/onboarding")
    } else if (userProfile?.role === "doctor") {
      router.push("/doctor")
    } else {
      router.push("/patient")
    }
  }, [isAuthenticated, hasCompletedOnboarding, userProfile, router])

  return (
    <div className="min-h-screen bg-background flex items-center justify-center">
      <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
    </div>
  )
}
