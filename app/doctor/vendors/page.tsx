"use client"

import { useState } from "react"
import { PageHeader } from "@/components/page-header"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Building2, Plus, Check, X, ExternalLink, RefreshCw, Settings, Trash2, Link2, Key } from "lucide-react"
import { cn } from "@/lib/utils"

interface Vendor {
  id: string
  name: string
  logo: string
  testTypes: string[]
  status: "connected" | "disconnected" | "pending"
  lastSync?: string
  patientsLinked?: number
  apiKey?: string
  webhookUrl?: string
}

const VENDORS: Vendor[] = [
  {
    id: "prodrome",
    name: "ProdromeScan",
    logo: "🧬",
    testTypes: ["Lipid Panels", "Metabolomics", "Plasmalogen Testing"],
    status: "connected",
    lastSync: "2 hours ago",
    patientsLinked: 45,
  },
  {
    id: "diagnostic-solutions",
    name: "Diagnostic Solutions",
    logo: "🦠",
    testTypes: ["GI-MAP", "Stool Testing", "Gut Health Panels"],
    status: "connected",
    lastSync: "1 day ago",
    patientsLinked: 32,
  },
  {
    id: "oxford",
    name: "Oxford Biomedical",
    logo: "🍎",
    testTypes: ["MRT Food Sensitivity", "LEAP Protocol"],
    status: "pending",
  },
  {
    id: "vibrant",
    name: "Vibrant Wellness",
    logo: "✨",
    testTypes: ["Micronutrients", "Gut Zoomer", "Wheat Zoomer"],
    status: "disconnected",
  },
  {
    id: "cyrex",
    name: "Cyrex Labs",
    logo: "🛡️",
    testTypes: ["Array Panels", "Autoimmunity", "Gluten Cross-Reactivity"],
    status: "disconnected",
  },
  {
    id: "genova",
    name: "Genova Diagnostics",
    logo: "🔬",
    testTypes: ["DUTCH Hormone", "Organic Acids", "NutrEval"],
    status: "disconnected",
  },
  {
    id: "quest",
    name: "Quest Diagnostics",
    logo: "🏥",
    testTypes: ["Standard Labs", "CBC", "CMP", "Lipids"],
    status: "disconnected",
  },
  {
    id: "labcorp",
    name: "Labcorp",
    logo: "🔵",
    testTypes: ["Standard Labs", "Specialty Testing"],
    status: "disconnected",
  },
]

export default function VendorsPage() {
  const [vendors, setVendors] = useState<Vendor[]>(VENDORS)
  const [selectedVendor, setSelectedVendor] = useState<Vendor | null>(null)
  const [isAddingNew, setIsAddingNew] = useState(false)
  const [newVendor, setNewVendor] = useState({
    name: "",
    apiKey: "",
    webhookUrl: "",
  })

  const handleConnect = (vendorId: string) => {
    setVendors((prev) => prev.map((v) => (v.id === vendorId ? { ...v, status: "pending" as const } : v)))

    // Simulate connection
    setTimeout(() => {
      setVendors((prev) =>
        prev.map((v) =>
          v.id === vendorId ? { ...v, status: "connected" as const, lastSync: "Just now", patientsLinked: 0 } : v,
        ),
      )
    }, 2000)
  }

  const handleDisconnect = (vendorId: string) => {
    setVendors((prev) =>
      prev.map((v) =>
        v.id === vendorId
          ? { ...v, status: "disconnected" as const, lastSync: undefined, patientsLinked: undefined }
          : v,
      ),
    )
  }

  const handleSync = (vendorId: string) => {
    setVendors((prev) => prev.map((v) => (v.id === vendorId ? { ...v, lastSync: "Syncing..." } : v)))

    setTimeout(() => {
      setVendors((prev) => prev.map((v) => (v.id === vendorId ? { ...v, lastSync: "Just now" } : v)))
    }, 2000)
  }

  const connectedCount = vendors.filter((v) => v.status === "connected").length

  return (
    <div className="p-6 space-y-6">
      <PageHeader
        title="Vendor Connections"
        description="Connect lab vendors to automatically import patient results"
      />

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="glass-card rounded-xl p-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-success/20 flex items-center justify-center">
              <Check className="w-5 h-5 text-success" />
            </div>
            <div>
              <p className="text-2xl font-bold text-foreground">{connectedCount}</p>
              <p className="text-sm text-muted-foreground">Connected Vendors</p>
            </div>
          </div>
        </div>

        <div className="glass-card rounded-xl p-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-primary/20 flex items-center justify-center">
              <RefreshCw className="w-5 h-5 text-primary" />
            </div>
            <div>
              <p className="text-2xl font-bold text-foreground">
                {vendors.filter((v) => v.status === "connected").reduce((acc, v) => acc + (v.patientsLinked || 0), 0)}
              </p>
              <p className="text-sm text-muted-foreground">Auto-Imported Results</p>
            </div>
          </div>
        </div>

        <div className="glass-card rounded-xl p-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-accent/20 flex items-center justify-center">
              <Building2 className="w-5 h-5 text-accent" />
            </div>
            <div>
              <p className="text-2xl font-bold text-foreground">{vendors.length}</p>
              <p className="text-sm text-muted-foreground">Available Vendors</p>
            </div>
          </div>
        </div>
      </div>

      {/* Add Custom Vendor */}
      <Dialog open={isAddingNew} onOpenChange={setIsAddingNew}>
        <DialogTrigger asChild>
          <Button className="bg-primary hover:bg-primary/90 text-primary-foreground neon-glow-cyan">
            <Plus className="w-4 h-4 mr-2" />
            Add Custom Vendor
          </Button>
        </DialogTrigger>
        <DialogContent className="bg-card border-border">
          <DialogHeader>
            <DialogTitle>Add Custom Vendor</DialogTitle>
            <DialogDescription>Connect a vendor not in our list using API credentials</DialogDescription>
          </DialogHeader>
          <div className="space-y-4 pt-4">
            <div className="space-y-2">
              <Label>Vendor Name</Label>
              <Input
                value={newVendor.name}
                onChange={(e) => setNewVendor((prev) => ({ ...prev, name: e.target.value }))}
                placeholder="Lab name"
                className="bg-input border-border"
              />
            </div>
            <div className="space-y-2">
              <Label className="flex items-center gap-2">
                <Key className="w-4 h-4" />
                API Key
              </Label>
              <Input
                value={newVendor.apiKey}
                onChange={(e) => setNewVendor((prev) => ({ ...prev, apiKey: e.target.value }))}
                placeholder="Enter API key"
                type="password"
                className="bg-input border-border"
              />
            </div>
            <div className="space-y-2">
              <Label className="flex items-center gap-2">
                <Link2 className="w-4 h-4" />
                Webhook URL (Optional)
              </Label>
              <Input
                value={newVendor.webhookUrl}
                onChange={(e) => setNewVendor((prev) => ({ ...prev, webhookUrl: e.target.value }))}
                placeholder="https://api.vendor.com/webhook"
                className="bg-input border-border"
              />
            </div>
            <div className="flex justify-end gap-3 pt-4">
              <Button variant="outline" onClick={() => setIsAddingNew(false)}>
                Cancel
              </Button>
              <Button className="bg-primary hover:bg-primary/90 text-primary-foreground">Add Vendor</Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Vendors List */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {vendors.map((vendor) => (
          <div
            key={vendor.id}
            className={cn(
              "glass-card rounded-xl p-6 transition-all",
              vendor.status === "connected" && "border border-success/30",
            )}
          >
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-secondary flex items-center justify-center text-2xl">
                  {vendor.logo}
                </div>
                <div>
                  <h3 className="font-semibold text-foreground">{vendor.name}</h3>
                  <div
                    className={cn(
                      "inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs",
                      vendor.status === "connected" && "bg-success/20 text-success",
                      vendor.status === "pending" && "bg-warning/20 text-warning",
                      vendor.status === "disconnected" && "bg-secondary text-muted-foreground",
                    )}
                  >
                    {vendor.status === "connected" && <Check className="w-3 h-3" />}
                    {vendor.status === "pending" && <RefreshCw className="w-3 h-3 animate-spin" />}
                    {vendor.status === "disconnected" && <X className="w-3 h-3" />}
                    {vendor.status === "connected"
                      ? "Connected"
                      : vendor.status === "pending"
                        ? "Connecting..."
                        : "Not Connected"}
                  </div>
                </div>
              </div>

              {vendor.status === "connected" && (
                <Dialog>
                  <DialogTrigger asChild>
                    <button className="p-2 rounded-lg hover:bg-secondary transition-colors">
                      <Settings className="w-5 h-5 text-muted-foreground" />
                    </button>
                  </DialogTrigger>
                  <DialogContent className="bg-card border-border">
                    <DialogHeader>
                      <DialogTitle>{vendor.name} Settings</DialogTitle>
                    </DialogHeader>
                    <div className="space-y-4 pt-4">
                      <div className="p-4 rounded-lg bg-secondary/50">
                        <p className="text-sm text-muted-foreground mb-1">Last Synced</p>
                        <p className="font-medium text-foreground">{vendor.lastSync}</p>
                      </div>
                      <div className="p-4 rounded-lg bg-secondary/50">
                        <p className="text-sm text-muted-foreground mb-1">Patients Linked</p>
                        <p className="font-medium text-foreground">{vendor.patientsLinked}</p>
                      </div>
                      <div className="flex gap-3">
                        <Button
                          variant="outline"
                          className="flex-1 bg-transparent"
                          onClick={() => handleSync(vendor.id)}
                        >
                          <RefreshCw className="w-4 h-4 mr-2" />
                          Sync Now
                        </Button>
                        <Button variant="destructive" onClick={() => handleDisconnect(vendor.id)}>
                          <Trash2 className="w-4 h-4 mr-2" />
                          Disconnect
                        </Button>
                      </div>
                    </div>
                  </DialogContent>
                </Dialog>
              )}
            </div>

            <div className="flex flex-wrap gap-1 mb-4">
              {vendor.testTypes.map((type) => (
                <span key={type} className="px-2 py-1 rounded-md bg-secondary text-xs text-muted-foreground">
                  {type}
                </span>
              ))}
            </div>

            {vendor.status === "connected" ? (
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Last sync: {vendor.lastSync}</span>
                <button
                  onClick={() => handleSync(vendor.id)}
                  className="text-primary hover:underline flex items-center gap-1"
                >
                  <RefreshCw className="w-3 h-3" />
                  Sync
                </button>
              </div>
            ) : vendor.status === "pending" ? (
              <div className="flex items-center gap-2 text-sm text-warning">
                <RefreshCw className="w-4 h-4 animate-spin" />
                Establishing connection...
              </div>
            ) : (
              <Button
                onClick={() => handleConnect(vendor.id)}
                variant="outline"
                className="w-full border-primary/50 text-primary hover:bg-primary/10"
              >
                <ExternalLink className="w-4 h-4 mr-2" />
                Connect
              </Button>
            )}
          </div>
        ))}
      </div>

      {/* Integration Help */}
      <div className="glass-card rounded-xl p-6">
        <h3 className="font-semibold text-foreground mb-2">Need a different lab?</h3>
        <p className="text-sm text-muted-foreground mb-4">
          We are constantly adding new lab integrations. If your preferred vendor is not listed, you can request an
          integration or use the manual upload feature.
        </p>
        <div className="flex gap-3">
          <Button variant="outline">Request Integration</Button>
          <Button variant="outline" className="text-accent border-accent/50 bg-transparent">
            View API Documentation
          </Button>
        </div>
      </div>
    </div>
  )
}
