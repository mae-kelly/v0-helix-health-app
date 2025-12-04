"use client"

import { useState } from "react"
import { PageHeader } from "@/components/page-header"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Separator } from "@/components/ui/separator"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { useAppStore } from "@/lib/store"
import { User, Bell, Shield, Database, Palette, Save, Upload } from "lucide-react"

export default function SettingsPage() {
  const { darkMode, setDarkMode } = useAppStore()
  const [notifications, setNotifications] = useState({
    newResults: true,
    patientProgress: true,
    literature: false,
    planApprovals: true,
  })

  return (
    <div className="space-y-8">
      <PageHeader title="Settings" description="Manage your account and preferences" />

      {/* Profile */}
      <Card className="border-border bg-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <User className="h-5 w-5 text-primary" />
            Profile
          </CardTitle>
          <CardDescription>Your personal information and credentials</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-center gap-6">
            <Avatar className="h-20 w-20">
              <AvatarImage src="/doctor-portrait.png" />
              <AvatarFallback>DS</AvatarFallback>
            </Avatar>
            <div>
              <Button variant="outline" size="sm">
                <Upload className="mr-2 h-4 w-4" />
                Change Photo
              </Button>
              <p className="mt-1 text-xs text-muted-foreground">JPG, PNG or GIF. Max 2MB.</p>
            </div>
          </div>

          <Separator />

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="firstName">First Name</Label>
              <Input id="firstName" defaultValue="Sarah" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="lastName">Last Name</Label>
              <Input id="lastName" defaultValue="Smith" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" defaultValue="dr.smith@clinic.com" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="specialty">Specialty</Label>
              <Input id="specialty" defaultValue="Functional Medicine" />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="credentials">Credentials</Label>
            <Input id="credentials" defaultValue="MD, IFMCP" />
          </div>

          <Button>
            <Save className="mr-2 h-4 w-4" />
            Save Profile
          </Button>
        </CardContent>
      </Card>

      {/* Notifications */}
      <Card className="border-border bg-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Bell className="h-5 w-5 text-primary" />
            Notifications
          </CardTitle>
          <CardDescription>Configure how you receive updates</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between rounded-lg border border-border p-4">
            <div>
              <p className="font-medium text-card-foreground">New Patient Results</p>
              <p className="text-sm text-muted-foreground">Get notified when new lab results are uploaded</p>
            </div>
            <Switch
              checked={notifications.newResults}
              onCheckedChange={(checked) => setNotifications((prev) => ({ ...prev, newResults: checked }))}
            />
          </div>
          <div className="flex items-center justify-between rounded-lg border border-border p-4">
            <div>
              <p className="font-medium text-card-foreground">Patient Progress Updates</p>
              <p className="text-sm text-muted-foreground">Daily summary of patient progress logs</p>
            </div>
            <Switch
              checked={notifications.patientProgress}
              onCheckedChange={(checked) => setNotifications((prev) => ({ ...prev, patientProgress: checked }))}
            />
          </div>
          <div className="flex items-center justify-between rounded-lg border border-border p-4">
            <div>
              <p className="font-medium text-card-foreground">New Literature Alerts</p>
              <p className="text-sm text-muted-foreground">Weekly digest of relevant new research</p>
            </div>
            <Switch
              checked={notifications.literature}
              onCheckedChange={(checked) => setNotifications((prev) => ({ ...prev, literature: checked }))}
            />
          </div>
          <div className="flex items-center justify-between rounded-lg border border-border p-4">
            <div>
              <p className="font-medium text-card-foreground">Plan Approval Requests</p>
              <p className="text-sm text-muted-foreground">When AI generates plans ready for review</p>
            </div>
            <Switch
              checked={notifications.planApprovals}
              onCheckedChange={(checked) => setNotifications((prev) => ({ ...prev, planApprovals: checked }))}
            />
          </div>
        </CardContent>
      </Card>

      {/* AI Settings */}
      <Card className="border-border bg-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Shield className="h-5 w-5 text-primary" />
            AI & Privacy
          </CardTitle>
          <CardDescription>Control how AI learns from your feedback</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between rounded-lg border border-border p-4">
            <div>
              <p className="font-medium text-card-foreground">Supervised Learning</p>
              <p className="text-sm text-muted-foreground">Allow your feedback to improve AI recommendations</p>
            </div>
            <Switch defaultChecked />
          </div>
          <div className="flex items-center justify-between rounded-lg border border-border p-4">
            <div>
              <p className="font-medium text-card-foreground">Auto-Generate Plans</p>
              <p className="text-sm text-muted-foreground">Automatically generate lifestyle plans for new results</p>
            </div>
            <Switch defaultChecked />
          </div>
          <div className="flex items-center justify-between rounded-lg border border-border p-4">
            <div>
              <p className="font-medium text-card-foreground">Literature Auto-Search</p>
              <p className="text-sm text-muted-foreground">Automatically find relevant research for abnormal markers</p>
            </div>
            <Switch defaultChecked />
          </div>
        </CardContent>
      </Card>

      {/* Data */}
      <Card className="border-border bg-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Database className="h-5 w-5 text-primary" />
            Data Management
          </CardTitle>
          <CardDescription>Manage your practice data</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between rounded-lg border border-border p-4">
            <div>
              <p className="font-medium text-card-foreground">Export Patient Data</p>
              <p className="text-sm text-muted-foreground">Download all patient data in CSV format</p>
            </div>
            <Button variant="outline" size="sm">
              Export
            </Button>
          </div>
          <div className="flex items-center justify-between rounded-lg border border-border p-4">
            <div>
              <p className="font-medium text-card-foreground">Import Lab Results</p>
              <p className="text-sm text-muted-foreground">Bulk import from supported lab formats</p>
            </div>
            <Button variant="outline" size="sm">
              Import
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Appearance */}
      <Card className="border-border bg-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Palette className="h-5 w-5 text-primary" />
            Appearance
          </CardTitle>
          <CardDescription>Customize the look of your dashboard</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between rounded-lg border border-border p-4">
            <div>
              <p className="font-medium text-card-foreground">Dark Mode</p>
              <p className="text-sm text-muted-foreground">Use dark theme for reduced eye strain</p>
            </div>
            <Switch checked={darkMode} onCheckedChange={setDarkMode} />
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
