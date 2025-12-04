"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { useAppStore } from "@/lib/store"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import {
  Dna,
  Eye,
  EyeOff,
  Zap,
  FileText,
  Shield,
  Brain,
  Stethoscope,
  Lock,
  CheckCircle2,
  ArrowRight,
  ChevronDown,
  Sparkles,
  FlaskConical,
  Activity,
  Pill,
  BookOpen,
  Bell,
  Server,
  Database,
  Key,
  AlertTriangle,
  Download,
} from "lucide-react"

// Sample Report Component
function SampleReportPreview() {
  return (
    <div className="space-y-6 max-h-[70vh] overflow-y-auto pr-2">
      {/* Report Header */}
      <div className="glass-card rounded-xl p-6 border border-primary/30">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-primary/20 flex items-center justify-center">
              <Dna className="w-6 h-6 text-primary" />
            </div>
            <div>
              <h3 className="font-bold text-lg">HELIX Lifestyle Report</h3>
              <p className="text-sm text-muted-foreground">Generated March 15, 2024</p>
            </div>
          </div>
          <Badge className="bg-success/20 text-success border-success/30">Sample</Badge>
        </div>
        <div className="grid grid-cols-3 gap-4 text-center">
          <div className="p-3 rounded-lg bg-card/50">
            <p className="text-2xl font-bold text-primary">47</p>
            <p className="text-xs text-muted-foreground">Biomarkers Analyzed</p>
          </div>
          <div className="p-3 rounded-lg bg-card/50">
            <p className="text-2xl font-bold text-accent">12</p>
            <p className="text-xs text-muted-foreground">Genetic Variants</p>
          </div>
          <div className="p-3 rounded-lg bg-card/50">
            <p className="text-2xl font-bold text-success">89%</p>
            <p className="text-xs text-muted-foreground">Optimization Score</p>
          </div>
        </div>
      </div>

      {/* Genetic Findings */}
      <div className="glass-card rounded-xl p-6">
        <h4 className="font-semibold mb-4 flex items-center gap-2">
          <Dna className="w-4 h-4 text-accent" />
          Key Genetic Findings
        </h4>
        <div className="space-y-3">
          {[
            {
              gene: "MTHFR C677T",
              status: "Heterozygous",
              impact: "Reduced folate metabolism - methylfolate recommended",
              color: "warning",
            },
            {
              gene: "APOE",
              status: "e3/e4",
              impact: "Elevated cardiovascular risk - prioritize omega-3s, limit saturated fat",
              color: "warning",
            },
            {
              gene: "HLA-DQ2.5",
              status: "Positive",
              impact: "Celiac gene present - strict gluten avoidance recommended",
              color: "destructive",
            },
            {
              gene: "ACTN3",
              status: "CT",
              impact: "Mixed muscle fiber type - balanced training approach",
              color: "primary",
            },
          ].map((finding) => (
            <div key={finding.gene} className="p-3 rounded-lg bg-card/50 border border-border">
              <div className="flex items-center justify-between mb-1">
                <span className="font-medium text-sm">{finding.gene}</span>
                <Badge variant="outline" className={`text-${finding.color} border-${finding.color}/30`}>
                  {finding.status}
                </Badge>
              </div>
              <p className="text-xs text-muted-foreground">{finding.impact}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Nutrition Section */}
      <div className="glass-card rounded-xl p-6">
        <h4 className="font-semibold mb-4 flex items-center gap-2">
          <FlaskConical className="w-4 h-4 text-success" />
          Personalized Nutrition Plan
        </h4>
        <div className="space-y-4">
          <div>
            <p className="text-sm font-medium text-success mb-2">Foods to Embrace</p>
            <div className="flex flex-wrap gap-2">
              {["Wild salmon", "Leafy greens", "Olive oil", "Berries", "Walnuts", "Avocado"].map((food) => (
                <Badge key={food} variant="outline" className="bg-success/10 text-success border-success/30">
                  {food}
                </Badge>
              ))}
            </div>
          </div>
          <div>
            <p className="text-sm font-medium text-destructive mb-2">Foods to Avoid</p>
            <div className="flex flex-wrap gap-2">
              {["Gluten", "Processed foods", "Excess saturated fat", "Alcohol"].map((food) => (
                <Badge
                  key={food}
                  variant="outline"
                  className="bg-destructive/10 text-destructive border-destructive/30"
                >
                  {food}
                </Badge>
              ))}
            </div>
          </div>
          <div className="p-3 rounded-lg bg-primary/10 border border-primary/20">
            <p className="text-xs text-muted-foreground">
              <span className="text-primary font-medium">Why these recommendations?</span> Based on your APOE e4 status
              and elevated LDL-P (1,847 nmol/L), we prioritize anti-inflammatory omega-3 rich foods. Your HLA-DQ2.5
              positive status requires strict gluten elimination.
            </p>
          </div>
        </div>
      </div>

      {/* Supplement Protocol */}
      <div className="glass-card rounded-xl p-6">
        <h4 className="font-semibold mb-4 flex items-center gap-2">
          <Pill className="w-4 h-4 text-accent" />
          Supplement Protocol
        </h4>
        <div className="space-y-3">
          {[
            { name: "Methylfolate", dose: "800mcg", timing: "Morning", reason: "MTHFR C677T support" },
            { name: "Omega-3 (EPA/DHA)", dose: "2g", timing: "With meals", reason: "APOE e4 cardiovascular support" },
            { name: "Vitamin D3 + K2", dose: "5000 IU / 100mcg", timing: "Morning", reason: "Low serum D (28 ng/mL)" },
            {
              name: "Magnesium Glycinate",
              dose: "400mg",
              timing: "Evening",
              reason: "Sleep optimization, muscle recovery",
            },
          ].map((supp) => (
            <div key={supp.name} className="flex items-center justify-between p-3 rounded-lg bg-card/50">
              <div>
                <p className="font-medium text-sm">{supp.name}</p>
                <p className="text-xs text-muted-foreground">{supp.reason}</p>
              </div>
              <div className="text-right">
                <p className="text-sm text-primary">{supp.dose}</p>
                <p className="text-xs text-muted-foreground">{supp.timing}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Exercise & Recovery */}
      <div className="glass-card rounded-xl p-6">
        <h4 className="font-semibold mb-4 flex items-center gap-2">
          <Activity className="w-4 h-4 text-primary" />
          Exercise & Recovery
        </h4>
        <div className="p-4 rounded-lg bg-warning/10 border border-warning/20 mb-4">
          <p className="text-sm font-medium text-warning flex items-center gap-2">
            <AlertTriangle className="w-4 h-4" />
            Extended Recovery Required
          </p>
          <p className="text-xs text-muted-foreground mt-1">
            Your IL-6 gene variant indicates slower muscle recovery. Allow 48-72 hours between high-intensity sessions.
          </p>
        </div>
        <div className="grid grid-cols-2 gap-3">
          <div className="p-3 rounded-lg bg-card/50 text-center">
            <p className="text-lg font-bold text-primary">3-4x</p>
            <p className="text-xs text-muted-foreground">Strength sessions/week</p>
          </div>
          <div className="p-3 rounded-lg bg-card/50 text-center">
            <p className="text-lg font-bold text-accent">2-3x</p>
            <p className="text-xs text-muted-foreground">Zone 2 cardio/week</p>
          </div>
        </div>
      </div>

      {/* Doctor Approval */}
      <div className="glass-card rounded-xl p-4 border-2 border-success/30 bg-success/5">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-success/20 flex items-center justify-center">
            <Stethoscope className="w-5 h-5 text-success" />
          </div>
          <div>
            <p className="font-medium text-sm text-success">Reviewed & Approved by Dr. Sarah Chen, MD</p>
            <p className="text-xs text-muted-foreground">Board Certified in Functional Medicine • March 15, 2024</p>
          </div>
          <CheckCircle2 className="w-6 h-6 text-success ml-auto" />
        </div>
      </div>

      <Button variant="outline" className="w-full bg-transparent" disabled>
        <Download className="w-4 h-4 mr-2" />
        Download Full PDF (Available after signup)
      </Button>
    </div>
  )
}

// How AI Works Component
function HowAIWorks() {
  return (
    <div className="space-y-6 max-h-[70vh] overflow-y-auto pr-2">
      <div className="text-center mb-6">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-accent/20 mb-4">
          <Brain className="w-8 h-8 text-accent" />
        </div>
        <h3 className="text-xl font-bold">Transparent AI, Verified by Doctors</h3>
        <p className="text-sm text-muted-foreground mt-2">Every recommendation has a clear evidence chain</p>
      </div>

      {/* Step by Step Process */}
      <div className="space-y-4">
        {[
          {
            step: 1,
            title: "Data Ingestion",
            icon: Database,
            description: "Your lab results, genetic data, and health history are securely uploaded and encrypted.",
            details:
              "We accept data from 50+ labs including Quest, LabCorp, 23andMe, and specialty panels like GI-MAP.",
          },
          {
            step: 2,
            title: "Biomarker Analysis",
            icon: FlaskConical,
            description: "AI analyzes each biomarker against optimal ranges, not just 'normal' reference ranges.",
            details: "We use functional medicine ranges that indicate optimal health, not just absence of disease.",
          },
          {
            step: 3,
            title: "Genetic Integration",
            icon: Dna,
            description: "Genetic variants are cross-referenced with your biomarkers to find actionable insights.",
            details: "Example: MTHFR + high homocysteine = specific methylfolate protocol recommendation.",
          },
          {
            step: 4,
            title: "Literature Matching",
            icon: BookOpen,
            description: "AI searches 10,000+ peer-reviewed studies to find evidence for each recommendation.",
            details: "Every suggestion links to the specific research that supports it.",
          },
          {
            step: 5,
            title: "Plan Generation",
            icon: Sparkles,
            description: "A personalized lifestyle plan is generated based on your unique biochemistry.",
            details: "Includes nutrition, supplements, exercise, sleep, and lifestyle modifications.",
          },
          {
            step: 6,
            title: "Doctor Review",
            icon: Stethoscope,
            description: "A licensed physician reviews and approves every plan before you see it.",
            details: "Our medical team ensures safety and appropriateness for your specific situation.",
          },
        ].map((item) => (
          <div key={item.step} className="glass-card rounded-xl p-4">
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0 w-10 h-10 rounded-xl bg-primary/20 flex items-center justify-center">
                <item.icon className="w-5 h-5 text-primary" />
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <Badge variant="outline" className="text-xs">
                    Step {item.step}
                  </Badge>
                  <h4 className="font-semibold">{item.title}</h4>
                </div>
                <p className="text-sm text-muted-foreground">{item.description}</p>
                <p className="text-xs text-muted-foreground/70 mt-2 italic">{item.details}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* AI Limitations */}
      <div className="glass-card rounded-xl p-4 border border-warning/30 bg-warning/5">
        <h4 className="font-semibold mb-2 flex items-center gap-2 text-warning">
          <AlertTriangle className="w-4 h-4" />
          AI Limitations & Human Oversight
        </h4>
        <ul className="space-y-2 text-sm text-muted-foreground">
          <li className="flex items-start gap-2">
            <CheckCircle2 className="w-4 h-4 text-success mt-0.5 flex-shrink-0" />
            AI never makes final decisions - all plans require doctor approval
          </li>
          <li className="flex items-start gap-2">
            <CheckCircle2 className="w-4 h-4 text-success mt-0.5 flex-shrink-0" />
            You can see exactly why each recommendation was made
          </li>
          <li className="flex items-start gap-2">
            <CheckCircle2 className="w-4 h-4 text-success mt-0.5 flex-shrink-0" />
            Doctors can override, modify, or reject any AI suggestion
          </li>
          <li className="flex items-start gap-2">
            <CheckCircle2 className="w-4 h-4 text-success mt-0.5 flex-shrink-0" />
            Your feedback trains the AI to improve (with your consent)
          </li>
        </ul>
      </div>
    </div>
  )
}

// Privacy & Rights Component
function PrivacyRights() {
  return (
    <div className="space-y-6 max-h-[70vh] overflow-y-auto pr-2">
      <div className="text-center mb-6">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-success/20 mb-4">
          <Shield className="w-8 h-8 text-success" />
        </div>
        <h3 className="text-xl font-bold">Your Data, Your Rights</h3>
        <p className="text-sm text-muted-foreground mt-2">We believe in radical transparency about your health data</p>
      </div>

      {/* Core Rights */}
      <div className="glass-card rounded-xl p-6 border-2 border-success/30">
        <h4 className="font-semibold mb-4 text-success">Your Fundamental Rights</h4>
        <div className="space-y-3">
          {[
            { right: "Right to Access", desc: "Download all your data anytime in standard formats (PDF, JSON, CSV)" },
            { right: "Right to Deletion", desc: "Request complete deletion of your data within 30 days" },
            { right: "Right to Portability", desc: "Transfer your data to another provider easily" },
            { right: "Right to Explanation", desc: "Know exactly why any recommendation was made" },
            { right: "Right to Opt-Out", desc: "Decline AI training use of your data while keeping full service" },
            { right: "Right to Human Review", desc: "Request human review of any AI-generated recommendation" },
          ].map((item) => (
            <div key={item.right} className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-success flex-shrink-0 mt-0.5" />
              <div>
                <p className="font-medium text-sm">{item.right}</p>
                <p className="text-xs text-muted-foreground">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Security Measures */}
      <div className="glass-card rounded-xl p-6">
        <h4 className="font-semibold mb-4 flex items-center gap-2">
          <Lock className="w-4 h-4 text-primary" />
          Security & Encryption
        </h4>
        <div className="grid grid-cols-2 gap-3">
          {[
            { icon: Key, label: "AES-256 Encryption", desc: "Military-grade at rest" },
            { icon: Server, label: "SOC 2 Type II", desc: "Audited annually" },
            { icon: Shield, label: "HIPAA Compliant", desc: "Healthcare standard" },
            { icon: Lock, label: "Zero-Knowledge", desc: "We can't read your data" },
          ].map((item) => (
            <div key={item.label} className="p-3 rounded-lg bg-card/50 text-center">
              <item.icon className="w-5 h-5 text-primary mx-auto mb-2" />
              <p className="text-xs font-medium">{item.label}</p>
              <p className="text-xs text-muted-foreground">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* What We Never Do */}
      <div className="glass-card rounded-xl p-6 border border-destructive/30 bg-destructive/5">
        <h4 className="font-semibold mb-4 text-destructive">What We NEVER Do</h4>
        <ul className="space-y-2 text-sm">
          {[
            "Sell your data to third parties",
            "Share with insurance companies without explicit consent",
            "Use your data for advertising",
            "Store data longer than necessary",
            "Make decisions without doctor oversight",
          ].map((item) => (
            <li key={item} className="flex items-center gap-2 text-muted-foreground">
              <div className="w-2 h-2 rounded-full bg-destructive" />
              {item}
            </li>
          ))}
        </ul>
      </div>

      {/* Certifications */}
      <div className="glass-card rounded-xl p-4">
        <h4 className="font-semibold mb-3 text-sm">Certifications & Compliance</h4>
        <div className="flex flex-wrap gap-2">
          {["HIPAA", "SOC 2", "GDPR", "CCPA", "ISO 27001"].map((cert) => (
            <Badge key={cert} variant="outline" className="bg-primary/10 text-primary border-primary/30">
              {cert}
            </Badge>
          ))}
        </div>
      </div>
    </div>
  )
}

export default function LoginPage() {
  const router = useRouter()
  const { setAuthenticated } = useAppStore()
  const [isLogin, setIsLogin] = useState(true)
  const [showPassword, setShowPassword] = useState(false)
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [name, setName] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [waitlistEmail, setWaitlistEmail] = useState("")
  const [waitlistSubmitted, setWaitlistSubmitted] = useState(false)
  const [showWaitlist, setShowWaitlist] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    await new Promise((resolve) => setTimeout(resolve, 1500))
    setAuthenticated(true)
    router.push("/onboarding")
  }

  const handleWaitlistSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    await new Promise((resolve) => setTimeout(resolve, 1000))
    setWaitlistSubmitted(true)
  }

  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-accent/10 rounded-full blur-3xl animate-pulse delay-1000" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-neon-lime/5 rounded-full blur-3xl" />
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: `linear-gradient(oklch(0.75 0.18 195 / 0.3) 1px, transparent 1px),
                              linear-gradient(90deg, oklch(0.75 0.18 195 / 0.3) 1px, transparent 1px)`,
            backgroundSize: "50px 50px",
          }}
        />
      </div>

      <div className="relative z-10 min-h-screen flex flex-col lg:flex-row">
        {/* Left Side - Value Proposition & Preview */}
        <div className="flex-1 p-6 lg:p-12 flex flex-col justify-center">
          <div className="max-w-xl mx-auto lg:mx-0">
            {/* Logo */}
            <div className="flex items-center gap-3 mb-8">
              <div className="w-12 h-12 rounded-xl bg-primary/20 flex items-center justify-center neon-glow-cyan">
                <Dna className="w-6 h-6 text-primary" />
              </div>
              <div>
                <h1 className="text-3xl font-bold neon-text-cyan text-primary tracking-tight">HELIX</h1>
                <p className="text-xs text-muted-foreground tracking-widest uppercase">Precision Health</p>
              </div>
            </div>

            {/* Main headline */}
            <h2 className="text-4xl lg:text-5xl font-bold mb-4 leading-tight text-balance">
              <span className="text-primary neon-text-cyan">Doctor-Led</span> Personalized Lifestyle Plans{" "}
              <span className="text-accent">with AI Insights</span>
            </h2>
            <p className="text-lg text-muted-foreground mb-8">
              Your DNA and biomarkers drive every recommendation. Science backs every suggestion. A physician approves
              every plan.
            </p>

            {/* Preview Buttons */}
            <div className="flex flex-wrap gap-3 mb-8">
              <Dialog>
                <DialogTrigger asChild>
                  <Button
                    variant="outline"
                    className="glass-card border-primary/30 hover:bg-primary/10 hover:border-primary gap-2 bg-transparent"
                  >
                    <FileText className="w-4 h-4" />
                    View Sample Report
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-2xl bg-card border-border">
                  <DialogHeader>
                    <DialogTitle className="flex items-center gap-2">
                      <FileText className="w-5 h-5 text-primary" />
                      Sample Lifestyle Report Preview
                    </DialogTitle>
                  </DialogHeader>
                  <SampleReportPreview />
                </DialogContent>
              </Dialog>

              <Dialog>
                <DialogTrigger asChild>
                  <Button
                    variant="outline"
                    className="glass-card border-accent/30 hover:bg-accent/10 hover:border-accent gap-2 bg-transparent"
                  >
                    <Brain className="w-4 h-4" />
                    How AI Works
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-2xl bg-card border-border">
                  <DialogHeader>
                    <DialogTitle className="flex items-center gap-2">
                      <Brain className="w-5 h-5 text-accent" />
                      How Our AI Works
                    </DialogTitle>
                  </DialogHeader>
                  <HowAIWorks />
                </DialogContent>
              </Dialog>

              <Dialog>
                <DialogTrigger asChild>
                  <Button
                    variant="outline"
                    className="glass-card border-success/30 hover:bg-success/10 hover:border-success gap-2 bg-transparent"
                  >
                    <Shield className="w-4 h-4" />
                    Your Rights & Privacy
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-2xl bg-card border-border">
                  <DialogHeader>
                    <DialogTitle className="flex items-center gap-2">
                      <Shield className="w-5 h-5 text-success" />
                      Your Data Rights & Privacy
                    </DialogTitle>
                  </DialogHeader>
                  <PrivacyRights />
                </DialogContent>
              </Dialog>
            </div>

            {/* Trust Indicators */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
              {[
                { icon: Stethoscope, label: "Doctor Reviewed", sublabel: "Every plan approved" },
                { icon: Shield, label: "HIPAA Compliant", sublabel: "Your data protected" },
                { icon: BookOpen, label: "10,000+ Studies", sublabel: "Evidence-based" },
                { icon: Bell, label: "Research Updates", sublabel: "Auto-notifications" },
              ].map((item) => (
                <div key={item.label} className="glass-card rounded-xl p-4 text-center">
                  <item.icon className="w-6 h-6 text-primary mx-auto mb-2" />
                  <p className="text-sm font-medium">{item.label}</p>
                  <p className="text-xs text-muted-foreground">{item.sublabel}</p>
                </div>
              ))}
            </div>

            {/* Waitlist CTA (for non-logged in visitors) */}
            {!showWaitlist ? (
              <button
                onClick={() => setShowWaitlist(true)}
                className="text-sm text-muted-foreground hover:text-primary transition-colors flex items-center gap-1"
              >
                Not ready to sign up? <span className="text-primary underline">Join the waitlist</span>
                <ChevronDown className="w-4 h-4" />
              </button>
            ) : (
              <div className="glass-card rounded-xl p-4 border border-primary/30">
                {waitlistSubmitted ? (
                  <div className="text-center py-2">
                    <CheckCircle2 className="w-8 h-8 text-success mx-auto mb-2" />
                    <p className="font-medium">You are on the waitlist!</p>
                    <p className="text-sm text-muted-foreground">We will notify you when spots open up.</p>
                  </div>
                ) : (
                  <form onSubmit={handleWaitlistSubmit} className="flex gap-2">
                    <Input
                      type="email"
                      placeholder="Enter your email for early access"
                      value={waitlistEmail}
                      onChange={(e) => setWaitlistEmail(e.target.value)}
                      className="flex-1 bg-input border-border"
                      required
                    />
                    <Button type="submit" className="bg-primary hover:bg-primary/90 neon-glow-cyan">
                      Join Waitlist
                    </Button>
                  </form>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Right Side - Login Form */}
        <div className="w-full lg:w-[480px] p-6 lg:p-12 flex items-center justify-center bg-card/30 backdrop-blur-sm border-l border-border">
          <div className="w-full max-w-sm">
            <div className="glass-card rounded-2xl p-8">
              <div className="flex mb-6 p-1 bg-secondary/50 rounded-lg">
                <button
                  type="button"
                  onClick={() => setIsLogin(true)}
                  className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-all ${
                    isLogin
                      ? "bg-primary text-primary-foreground neon-glow-cyan"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  Sign In
                </button>
                <button
                  type="button"
                  onClick={() => setIsLogin(false)}
                  className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-all ${
                    !isLogin
                      ? "bg-primary text-primary-foreground neon-glow-cyan"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  Sign Up
                </button>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                {!isLogin && (
                  <div className="space-y-2">
                    <Label htmlFor="name" className="text-sm text-muted-foreground">
                      Full Name
                    </Label>
                    <Input
                      id="name"
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Jane Smith"
                      className="bg-input border-border focus:border-primary focus:ring-primary/20 h-12"
                      required={!isLogin}
                    />
                  </div>
                )}

                <div className="space-y-2">
                  <Label htmlFor="email" className="text-sm text-muted-foreground">
                    Email
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@example.com"
                    className="bg-input border-border focus:border-primary focus:ring-primary/20 h-12"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="password" className="text-sm text-muted-foreground">
                    Password
                  </Label>
                  <div className="relative">
                    <Input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Enter your password"
                      className="bg-input border-border focus:border-primary focus:ring-primary/20 h-12 pr-12"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                    >
                      {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                    </button>
                  </div>
                </div>

                {isLogin && (
                  <div className="flex justify-end">
                    <button type="button" className="text-sm text-primary hover:underline">
                      Forgot password?
                    </button>
                  </div>
                )}

                <Button
                  type="submit"
                  className="w-full h-12 bg-primary hover:bg-primary/90 text-primary-foreground font-semibold neon-glow-cyan transition-all hover:scale-[1.02]"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 border-2 border-primary-foreground border-t-transparent rounded-full animate-spin" />
                      <span>Processing...</span>
                    </div>
                  ) : (
                    <div className="flex items-center gap-2">
                      <Zap className="w-4 h-4" />
                      <span>{isLogin ? "Sign In" : "Create Account"}</span>
                      <ArrowRight className="w-4 h-4" />
                    </div>
                  )}
                </Button>
              </form>

              {/* Sign up benefits */}
              {!isLogin && (
                <div className="mt-6 pt-6 border-t border-border space-y-2">
                  <p className="text-xs text-muted-foreground font-medium mb-3">What you will get:</p>
                  {[
                    "Personalized lifestyle plan based on YOUR data",
                    "Doctor-reviewed recommendations",
                    "Progress tracking with AI insights",
                    "Research updates when new studies emerge",
                  ].map((benefit) => (
                    <div key={benefit} className="flex items-center gap-2 text-xs text-muted-foreground">
                      <CheckCircle2 className="w-3 h-3 text-success flex-shrink-0" />
                      {benefit}
                    </div>
                  ))}
                </div>
              )}

              <div className="mt-6 pt-6 border-t border-border">
                <p className="text-center text-xs text-muted-foreground">
                  By continuing, you agree to our{" "}
                  <button type="button" className="text-primary hover:underline">
                    Terms of Service
                  </button>{" "}
                  and{" "}
                  <button type="button" className="text-primary hover:underline">
                    Privacy Policy
                  </button>
                </p>
              </div>
            </div>

            {/* Doctor oversight badge */}
            <div className="mt-4 flex items-center justify-center gap-2 text-xs text-muted-foreground">
              <Stethoscope className="w-4 h-4 text-success" />
              <span>All plans reviewed by licensed physicians</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
