"use client"

import { useState } from "react"
import { PageHeader } from "@/components/page-header"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { useAppStore } from "@/lib/store"
import {
  Users,
  FileSignature,
  Bell,
  Mail,
  DollarSign,
  Shield,
  Heart,
  AlertTriangle,
  CheckCircle,
  Send,
  UserPlus,
  Target,
  Calendar,
} from "lucide-react"

const antiCharities = [
  { id: "none", name: "No anti-charity" },
  { id: "opposing-political", name: "Political party you oppose" },
  { id: "rival-team", name: "Rival sports team" },
  { id: "custom", name: "Custom organization" },
]

export default function AccountabilityPage() {
  const { accountability, updateAccountability, userProfile } = useAppStore()
  const [partnerEmail, setPartnerEmail] = useState("")
  const [contractGoal, setContractGoal] = useState("")
  const [contractDuration, setContractDuration] = useState("30")
  const [stakeAmount, setStakeAmount] = useState("50")
  const [selectedAntiCharity, setSelectedAntiCharity] = useState("none")
  const [refereeEmail, setRefereeEmail] = useState("")
  const [inviteSent, setInviteSent] = useState(false)

  const handleInvitePartner = () => {
    if (partnerEmail) {
      updateAccountability({
        hasPartner: true,
        partnerEmail: partnerEmail,
        partnerName: partnerEmail.split("@")[0],
      })
      setInviteSent(true)
    }
  }

  const handleCreateContract = () => {
    const contract = {
      goal: contractGoal,
      startDate: new Date().toISOString(),
      endDate: new Date(Date.now() + Number.parseInt(contractDuration) * 24 * 60 * 60 * 1000).toISOString(),
      stakeAmount: Number.parseInt(stakeAmount),
      antiCharity: selectedAntiCharity !== "none" ? selectedAntiCharity : null,
      referee: refereeEmail || null,
      isActive: true,
    }
    updateAccountability({ commitmentContract: contract })
  }

  return (
    <div className="space-y-8">
      <PageHeader title="Accountability" description="Set up systems to keep yourself on track" />

      <Tabs defaultValue="partner" className="space-y-6">
        <TabsList className="grid w-full grid-cols-3 bg-secondary">
          <TabsTrigger value="partner" className="flex items-center gap-2">
            <Users className="h-4 w-4" />
            Partner
          </TabsTrigger>
          <TabsTrigger value="contract" className="flex items-center gap-2">
            <FileSignature className="h-4 w-4" />
            Contract
          </TabsTrigger>
          <TabsTrigger value="notifications" className="flex items-center gap-2">
            <Bell className="h-4 w-4" />
            Reminders
          </TabsTrigger>
        </TabsList>

        {/* Accountability Partner */}
        <TabsContent value="partner">
          <div className="grid gap-6 lg:grid-cols-2">
            <Card className="glass-card border-primary/30">
              <CardHeader>
                <div className="flex items-center gap-2">
                  <UserPlus className="h-5 w-5 text-primary" />
                  <CardTitle className="text-card-foreground">Accountability Partner</CardTitle>
                </div>
                <CardDescription>
                  Research shows you're 65% more likely to achieve goals with an accountability partner, and 95% more
                  likely with specific check-ins.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {accountability.hasPartner ? (
                  <div className="p-4 rounded-lg bg-success/10 border border-success/30">
                    <div className="flex items-center gap-3">
                      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-success/20">
                        <Users className="h-6 w-6 text-success" />
                      </div>
                      <div>
                        <h4 className="font-medium text-card-foreground">Partner Connected</h4>
                        <p className="text-sm text-muted-foreground">{accountability.partnerEmail}</p>
                      </div>
                      <CheckCircle className="h-5 w-5 text-success ml-auto" />
                    </div>
                  </div>
                ) : (
                  <>
                    <div className="space-y-2">
                      <Label>Partner's Email</Label>
                      <div className="flex gap-2">
                        <Input
                          type="email"
                          placeholder="friend@example.com"
                          value={partnerEmail}
                          onChange={(e) => setPartnerEmail(e.target.value)}
                          className="bg-secondary/50 border-border"
                        />
                        <Button
                          onClick={handleInvitePartner}
                          className="bg-primary hover:bg-primary/90 text-primary-foreground"
                          disabled={!partnerEmail || inviteSent}
                        >
                          {inviteSent ? "Sent!" : "Invite"}
                          <Send className="ml-2 h-4 w-4" />
                        </Button>
                      </div>
                    </div>

                    {inviteSent && (
                      <div className="p-3 rounded-lg bg-primary/10 border border-primary/30">
                        <p className="text-sm text-primary">
                          Invitation sent! They'll receive an email to join as your accountability partner.
                        </p>
                      </div>
                    )}
                  </>
                )}

                <div className="pt-4 border-t border-border">
                  <h4 className="font-medium text-card-foreground mb-3">How It Works</h4>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-success mt-0.5" />
                      Your partner receives weekly progress reports
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-success mt-0.5" />
                      They're notified if you miss 2+ days
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-success mt-0.5" />
                      You can message each other for support
                    </li>
                  </ul>
                </div>
              </CardContent>
            </Card>

            <Card className="glass-card border-border">
              <CardHeader>
                <CardTitle className="text-card-foreground">Why It Works</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="p-4 rounded-lg bg-secondary/50">
                  <div className="flex items-center gap-2 mb-2">
                    <Target className="h-4 w-4 text-primary" />
                    <span className="font-medium text-card-foreground">Social Commitment</span>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Making a commitment to someone else activates our innate desire to be consistent and not let others
                    down.
                  </p>
                </div>

                <div className="p-4 rounded-lg bg-secondary/50">
                  <div className="flex items-center gap-2 mb-2">
                    <Heart className="h-4 w-4 text-accent" />
                    <span className="font-medium text-card-foreground">Emotional Support</span>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Having someone who understands your journey provides motivation during difficult moments.
                  </p>
                </div>

                <div className="p-4 rounded-lg bg-secondary/50">
                  <div className="flex items-center gap-2 mb-2">
                    <Shield className="h-4 w-4 text-success" />
                    <span className="font-medium text-card-foreground">External Accountability</span>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Knowing someone is watching creates positive pressure to follow through on commitments.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Commitment Contract */}
        <TabsContent value="contract">
          <div className="grid gap-6 lg:grid-cols-2">
            <Card className="glass-card border-accent/30">
              <CardHeader>
                <div className="flex items-center gap-2">
                  <FileSignature className="h-5 w-5 text-accent" />
                  <CardTitle className="text-card-foreground">Commitment Contract</CardTitle>
                </div>
                <CardDescription>
                  Put money on the line. Studies show financial stakes increase goal achievement by up to 3x.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {accountability.commitmentContract?.isActive ? (
                  <div className="space-y-4">
                    <div className="p-4 rounded-lg bg-accent/10 border border-accent/30">
                      <div className="flex items-center justify-between mb-3">
                        <Badge className="bg-accent/20 text-accent border-accent/30">Active Contract</Badge>
                        <span className="text-sm text-muted-foreground">
                          {Math.ceil(
                            (new Date(accountability.commitmentContract.endDate).getTime() - Date.now()) /
                              (1000 * 60 * 60 * 24),
                          )}{" "}
                          days left
                        </span>
                      </div>
                      <h4 className="font-medium text-card-foreground mb-2">
                        {accountability.commitmentContract.goal}
                      </h4>
                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <div className="flex items-center gap-1">
                          <DollarSign className="h-4 w-4" />${accountability.commitmentContract.stakeAmount} at stake
                        </div>
                        {accountability.commitmentContract.antiCharity && (
                          <div className="flex items-center gap-1">
                            <AlertTriangle className="h-4 w-4 text-destructive" />
                            Anti-charity set
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                ) : (
                  <>
                    <div className="space-y-2">
                      <Label>Your Goal</Label>
                      <Textarea
                        placeholder="I commit to completing all daily tasks for..."
                        value={contractGoal}
                        onChange={(e) => setContractGoal(e.target.value)}
                        className="bg-secondary/50 border-border"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label>Duration</Label>
                        <Select value={contractDuration} onValueChange={setContractDuration}>
                          <SelectTrigger className="bg-secondary/50 border-border">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="7">1 Week</SelectItem>
                            <SelectItem value="14">2 Weeks</SelectItem>
                            <SelectItem value="30">30 Days</SelectItem>
                            <SelectItem value="60">60 Days</SelectItem>
                            <SelectItem value="90">90 Days</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="space-y-2">
                        <Label>Stake Amount ($)</Label>
                        <Select value={stakeAmount} onValueChange={setStakeAmount}>
                          <SelectTrigger className="bg-secondary/50 border-border">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="25">$25</SelectItem>
                            <SelectItem value="50">$50</SelectItem>
                            <SelectItem value="100">$100</SelectItem>
                            <SelectItem value="250">$250</SelectItem>
                            <SelectItem value="500">$500</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label className="flex items-center gap-2">
                        <AlertTriangle className="h-4 w-4 text-destructive" />
                        Anti-Charity (if you fail)
                      </Label>
                      <Select value={selectedAntiCharity} onValueChange={setSelectedAntiCharity}>
                        <SelectTrigger className="bg-secondary/50 border-border">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {antiCharities.map((charity) => (
                            <SelectItem key={charity.id} value={charity.id}>
                              {charity.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <p className="text-xs text-muted-foreground">
                        Money goes to an organization you dislike if you fail. This uses loss aversion psychology.
                      </p>
                    </div>

                    <div className="space-y-2">
                      <Label>Referee Email (optional)</Label>
                      <Input
                        type="email"
                        placeholder="referee@example.com"
                        value={refereeEmail}
                        onChange={(e) => setRefereeEmail(e.target.value)}
                        className="bg-secondary/50 border-border"
                      />
                      <p className="text-xs text-muted-foreground">
                        A referee verifies your progress and confirms completion.
                      </p>
                    </div>

                    <Button
                      onClick={handleCreateContract}
                      className="w-full bg-accent hover:bg-accent/90 text-accent-foreground neon-glow-magenta"
                      disabled={!contractGoal}
                    >
                      Create Commitment Contract
                      <FileSignature className="ml-2 h-4 w-4" />
                    </Button>
                  </>
                )}
              </CardContent>
            </Card>

            <Card className="glass-card border-border">
              <CardHeader>
                <CardTitle className="text-card-foreground">The Science of Stakes</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="p-4 rounded-lg bg-destructive/10 border border-destructive/30">
                  <h4 className="font-medium text-card-foreground mb-2">Loss Aversion</h4>
                  <p className="text-sm text-muted-foreground">
                    We feel losses 2x more intensely than gains. The fear of losing money is a powerful motivator.
                  </p>
                </div>

                <div className="p-4 rounded-lg bg-secondary/50">
                  <h4 className="font-medium text-card-foreground mb-2">Anti-Charity Effect</h4>
                  <p className="text-sm text-muted-foreground">
                    The thought of your money going to something you oppose creates even stronger motivation than
                    regular charity.
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-4 pt-4">
                  <div className="text-center p-4 rounded-lg bg-success/10 border border-success/30">
                    <div className="text-2xl font-bold text-success">3x</div>
                    <div className="text-xs text-muted-foreground">Higher success rate with financial stakes</div>
                  </div>
                  <div className="text-center p-4 rounded-lg bg-primary/10 border border-primary/30">
                    <div className="text-2xl font-bold text-primary">91%</div>
                    <div className="text-xs text-muted-foreground">Success rate with referee verification</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Notifications */}
        <TabsContent value="notifications">
          <Card className="glass-card border-border max-w-2xl">
            <CardHeader>
              <div className="flex items-center gap-2">
                <Bell className="h-5 w-5 text-primary" />
                <CardTitle className="text-card-foreground">Smart Reminders</CardTitle>
              </div>
              <CardDescription>Configure notifications to keep you on track without being annoying</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between p-4 rounded-lg bg-secondary/50 border border-border">
                <div className="flex items-center gap-3">
                  <Calendar className="h-5 w-5 text-primary" />
                  <div>
                    <h4 className="font-medium text-card-foreground">Daily Check-In Reminder</h4>
                    <p className="text-sm text-muted-foreground">Remind me to complete my daily check-in</p>
                  </div>
                </div>
                <Switch
                  checked={accountability.notificationsEnabled}
                  onCheckedChange={(checked) => updateAccountability({ notificationsEnabled: checked })}
                />
              </div>

              <div className="flex items-center justify-between p-4 rounded-lg bg-secondary/50 border border-border">
                <div className="flex items-center gap-3">
                  <Mail className="h-5 w-5 text-accent" />
                  <div>
                    <h4 className="font-medium text-card-foreground">Weekly Progress Report</h4>
                    <p className="text-sm text-muted-foreground">Email summary of your weekly achievements</p>
                  </div>
                </div>
                <Switch
                  checked={accountability.weeklyReportEnabled}
                  onCheckedChange={(checked) => updateAccountability({ weeklyReportEnabled: checked })}
                />
              </div>

              <div className="flex items-center justify-between p-4 rounded-lg bg-secondary/50 border border-border">
                <div className="flex items-center gap-3">
                  <AlertTriangle className="h-5 w-5 text-destructive" />
                  <div>
                    <h4 className="font-medium text-card-foreground">Streak Danger Alert</h4>
                    <p className="text-sm text-muted-foreground">Alert when you're about to lose your streak</p>
                  </div>
                </div>
                <Switch defaultChecked />
              </div>

              <div className="flex items-center justify-between p-4 rounded-lg bg-secondary/50 border border-border">
                <div className="flex items-center gap-3">
                  <Users className="h-5 w-5 text-success" />
                  <div>
                    <h4 className="font-medium text-card-foreground">Partner Updates</h4>
                    <p className="text-sm text-muted-foreground">Notify partner when I complete tasks</p>
                  </div>
                </div>
                <Switch defaultChecked />
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
