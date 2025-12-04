import type React from "react"
import { Sidebar } from "@/components/sidebar"

export default function PatientLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-background">
      <Sidebar />
      <main className="pl-64">
        <div className="container max-w-7xl px-6 py-8">{children}</div>
      </main>
    </div>
  )
}
