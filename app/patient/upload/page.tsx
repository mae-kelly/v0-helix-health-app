"use client"

import { useState, useCallback } from "react"
import { useDropzone } from "react-dropzone"
import { PageHeader } from "@/components/page-header"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Upload,
  FileText,
  X,
  Check,
  AlertCircle,
  Loader2,
  Calendar,
  Building2,
  Camera,
  Smartphone,
  LinkIcon,
  Clock,
  Sparkles,
} from "lucide-react"
import { cn } from "@/lib/utils"

interface UploadedFile {
  id: string
  name: string
  size: number
  type: string
  status: "uploading" | "processing" | "complete" | "error"
  progress: number
  vendor?: string
}

const VENDORS = [
  { id: "prodrome", name: "ProdromeScan", types: ["Lipids", "Metabolomics"], logo: "P" },
  { id: "diagnostic-solutions", name: "Diagnostic Solutions", types: ["GI-MAP"], logo: "DS" },
  { id: "oxford", name: "Oxford Biomedical", types: ["MRT Food Sensitivity"], logo: "OB" },
  { id: "vibrant", name: "Vibrant Wellness", types: ["Micronutrients", "Gut Zoomer"], logo: "VW" },
  { id: "cyrex", name: "Cyrex Labs", types: ["Autoimmunity Panels"], logo: "CX" },
  { id: "genova", name: "Genova Diagnostics", types: ["DUTCH", "Organic Acids"], logo: "GD" },
  { id: "quest", name: "Quest Diagnostics", types: ["Standard Labs"], logo: "Q" },
  { id: "labcorp", name: "Labcorp", types: ["Standard Labs"], logo: "LC" },
  { id: "custom", name: "Other / Manual Entry", types: ["Custom"], logo: "?" },
]

const RECENT_UPLOADS = [
  { id: "1", name: "Lipid Panel Results.pdf", vendor: "ProdromeScan", date: "Dec 1, 2025", status: "processed" },
  {
    id: "2",
    name: "GI-MAP Stool Analysis.pdf",
    vendor: "Diagnostic Solutions",
    date: "Nov 28, 2025",
    status: "processed",
  },
  {
    id: "3",
    name: "MRT Food Sensitivity.xlsx",
    vendor: "Oxford Biomedical",
    date: "Nov 15, 2025",
    status: "processed",
  },
]

export default function PatientUploadPage() {
  const [files, setFiles] = useState<UploadedFile[]>([])
  const [selectedVendor, setSelectedVendor] = useState("")
  const [testDate, setTestDate] = useState("")
  const [portalUrl, setPortalUrl] = useState("")

  const onDrop = useCallback((acceptedFiles: File[]) => {
    const newFiles: UploadedFile[] = acceptedFiles.map((file) => ({
      id: Math.random().toString(36).substr(2, 9),
      name: file.name,
      size: file.size,
      type: file.type,
      status: "uploading",
      progress: 0,
    }))

    setFiles((prev) => [...prev, ...newFiles])

    // Simulate upload progress
    newFiles.forEach((file) => {
      let progress = 0
      const interval = setInterval(() => {
        progress += Math.random() * 30
        if (progress >= 100) {
          progress = 100
          clearInterval(interval)

          setFiles((prev) => prev.map((f) => (f.id === file.id ? { ...f, status: "processing", progress: 100 } : f)))

          // Simulate processing
          setTimeout(() => {
            setFiles((prev) => prev.map((f) => (f.id === file.id ? { ...f, status: "complete" } : f)))
          }, 2000)
        } else {
          setFiles((prev) => prev.map((f) => (f.id === file.id ? { ...f, progress } : f)))
        }
      }, 200)
    })
  }, [])

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "application/pdf": [".pdf"],
      "text/csv": [".csv"],
      "application/vnd.ms-excel": [".xls"],
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet": [".xlsx"],
      "image/*": [".png", ".jpg", ".jpeg"],
    },
  })

  const removeFile = (id: string) => {
    setFiles((prev) => prev.filter((f) => f.id !== id))
  }

  const formatFileSize = (bytes: number) => {
    if (bytes < 1024) return bytes + " B"
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + " KB"
    return (bytes / (1024 * 1024)).toFixed(1) + " MB"
  }

  return (
    <div className="p-6 space-y-6">
      <PageHeader title="Upload Results" description="Import your lab results to get personalized health insights" />

      <Tabs defaultValue="upload" className="space-y-6">
        <TabsList className="bg-secondary/50 p-1">
          <TabsTrigger
            value="upload"
            className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
          >
            <Upload className="w-4 h-4 mr-2" />
            Upload Files
          </TabsTrigger>
          <TabsTrigger
            value="photo"
            className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
          >
            <Camera className="w-4 h-4 mr-2" />
            Take Photo
          </TabsTrigger>
          <TabsTrigger
            value="connect"
            className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
          >
            <LinkIcon className="w-4 h-4 mr-2" />
            Connect Portal
          </TabsTrigger>
        </TabsList>

        <TabsContent value="upload" className="space-y-6">
          {/* Selection Form */}
          <div className="glass-card rounded-xl p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label className="text-sm text-muted-foreground flex items-center gap-2">
                  <Building2 className="w-4 h-4" />
                  Lab Vendor
                </Label>
                <Select value={selectedVendor} onValueChange={setSelectedVendor}>
                  <SelectTrigger className="bg-input border-border h-12">
                    <SelectValue placeholder="Select lab vendor" />
                  </SelectTrigger>
                  <SelectContent>
                    {VENDORS.map((vendor) => (
                      <SelectItem key={vendor.id} value={vendor.id}>
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-lg bg-primary/20 flex items-center justify-center text-xs font-mono text-primary">
                            {vendor.logo}
                          </div>
                          <div>
                            <div className="font-medium">{vendor.name}</div>
                            <div className="text-xs text-muted-foreground">{vendor.types.join(", ")}</div>
                          </div>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label className="text-sm text-muted-foreground flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  Test Date
                </Label>
                <Input
                  type="date"
                  value={testDate}
                  onChange={(e) => setTestDate(e.target.value)}
                  className="bg-input border-border h-12"
                />
              </div>
            </div>
          </div>

          {/* Dropzone */}
          <div
            {...getRootProps()}
            className={cn(
              "glass-card rounded-xl p-12 border-2 border-dashed transition-all cursor-pointer",
              isDragActive ? "border-primary bg-primary/5 neon-glow-cyan" : "border-border hover:border-primary/50",
            )}
          >
            <input {...getInputProps()} />
            <div className="flex flex-col items-center text-center">
              <div
                className={cn(
                  "w-20 h-20 rounded-2xl flex items-center justify-center mb-6 transition-all",
                  isDragActive ? "bg-primary/20 neon-glow-cyan" : "bg-secondary",
                )}
              >
                <Upload
                  className={cn("w-10 h-10 transition-all", isDragActive ? "text-primary" : "text-muted-foreground")}
                />
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-2">
                {isDragActive ? "Drop files here" : "Drag & drop your lab results"}
              </h3>
              <p className="text-muted-foreground mb-4">or click to browse your files</p>
              <div className="flex flex-wrap gap-2 justify-center">
                <span className="px-3 py-1 rounded-full bg-secondary text-xs text-muted-foreground">PDF</span>
                <span className="px-3 py-1 rounded-full bg-secondary text-xs text-muted-foreground">CSV</span>
                <span className="px-3 py-1 rounded-full bg-secondary text-xs text-muted-foreground">Excel</span>
                <span className="px-3 py-1 rounded-full bg-secondary text-xs text-muted-foreground">Images</span>
              </div>
            </div>
          </div>

          {/* Uploaded Files */}
          {files.length > 0 && (
            <div className="glass-card rounded-xl p-6">
              <h3 className="font-semibold text-foreground mb-4">Uploading Files</h3>
              <div className="space-y-3">
                {files.map((file) => (
                  <div key={file.id} className="flex items-center gap-4 p-4 rounded-lg bg-secondary/50">
                    <div
                      className={cn(
                        "w-12 h-12 rounded-xl flex items-center justify-center",
                        file.status === "complete" ? "bg-success/20" : "bg-primary/20",
                      )}
                    >
                      {file.status === "complete" ? (
                        <Check className="w-6 h-6 text-success" />
                      ) : file.status === "error" ? (
                        <AlertCircle className="w-6 h-6 text-destructive" />
                      ) : (
                        <FileText className="w-6 h-6 text-primary" />
                      )}
                    </div>

                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-foreground truncate">{file.name}</p>
                      <p className="text-sm text-muted-foreground">
                        {formatFileSize(file.size)}
                        {file.status === "processing" && " · AI is analyzing your results..."}
                        {file.status === "complete" && " · Ready for review"}
                      </p>

                      {(file.status === "uploading" || file.status === "processing") && (
                        <div className="mt-2 h-1.5 bg-secondary rounded-full overflow-hidden">
                          <div
                            className={cn(
                              "h-full rounded-full transition-all",
                              file.status === "processing" ? "bg-accent animate-pulse" : "bg-primary",
                            )}
                            style={{ width: `${file.progress}%` }}
                          />
                        </div>
                      )}
                    </div>

                    {file.status === "uploading" || file.status === "processing" ? (
                      <Loader2 className="w-5 h-5 text-primary animate-spin" />
                    ) : (
                      <button
                        onClick={() => removeFile(file.id)}
                        className="p-2 rounded-lg hover:bg-secondary transition-colors"
                      >
                        <X className="w-5 h-5 text-muted-foreground" />
                      </button>
                    )}
                  </div>
                ))}
              </div>

              <div className="mt-6 flex justify-end gap-3">
                <Button variant="outline" onClick={() => setFiles([])}>
                  Clear All
                </Button>
                <Button
                  className="bg-primary hover:bg-primary/90 text-primary-foreground neon-glow-cyan"
                  disabled={files.some((f) => f.status !== "complete")}
                >
                  <Sparkles className="w-4 h-4 mr-2" />
                  Generate Insights
                </Button>
              </div>
            </div>
          )}
        </TabsContent>

        <TabsContent value="photo" className="space-y-6">
          <div className="glass-card rounded-xl p-8 text-center">
            <div className="w-24 h-24 rounded-2xl bg-accent/20 flex items-center justify-center mx-auto mb-6">
              <Camera className="w-12 h-12 text-accent" />
            </div>
            <h3 className="text-xl font-semibold text-foreground mb-2">Capture Lab Results</h3>
            <p className="text-muted-foreground mb-6 max-w-md mx-auto">
              Take a photo of your printed lab results and our AI will automatically extract and analyze the data
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Button className="bg-accent hover:bg-accent/90 text-accent-foreground neon-glow-magenta">
                <Camera className="w-4 h-4 mr-2" />
                Open Camera
              </Button>
              <Button variant="outline">
                <Smartphone className="w-4 h-4 mr-2" />
                Upload from Phone
              </Button>
            </div>
          </div>

          <div className="glass-card rounded-xl p-6">
            <h4 className="font-semibold text-foreground mb-4">Tips for Best Results</h4>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="flex items-start gap-3 p-4 rounded-lg bg-secondary/30">
                <div className="w-8 h-8 rounded-lg bg-primary/20 flex items-center justify-center text-primary font-mono text-sm">
                  1
                </div>
                <div>
                  <p className="font-medium text-foreground">Good Lighting</p>
                  <p className="text-sm text-muted-foreground">Ensure the document is well-lit without shadows</p>
                </div>
              </div>
              <div className="flex items-start gap-3 p-4 rounded-lg bg-secondary/30">
                <div className="w-8 h-8 rounded-lg bg-primary/20 flex items-center justify-center text-primary font-mono text-sm">
                  2
                </div>
                <div>
                  <p className="font-medium text-foreground">Flat Surface</p>
                  <p className="text-sm text-muted-foreground">Place document on a flat surface to avoid distortion</p>
                </div>
              </div>
              <div className="flex items-start gap-3 p-4 rounded-lg bg-secondary/30">
                <div className="w-8 h-8 rounded-lg bg-primary/20 flex items-center justify-center text-primary font-mono text-sm">
                  3
                </div>
                <div>
                  <p className="font-medium text-foreground">Clear Focus</p>
                  <p className="text-sm text-muted-foreground">Make sure all text is sharp and readable</p>
                </div>
              </div>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="connect" className="space-y-6">
          <div className="glass-card rounded-xl p-6">
            <h3 className="font-semibold text-foreground mb-4">Connect Lab Portal</h3>
            <p className="text-muted-foreground mb-6">
              Enter your lab portal URL and we'll automatically sync your results
            </p>

            <div className="space-y-4">
              <div className="space-y-2">
                <Label>Portal URL</Label>
                <div className="flex gap-3">
                  <Input
                    type="url"
                    placeholder="https://myportal.labcorp.com/..."
                    value={portalUrl}
                    onChange={(e) => setPortalUrl(e.target.value)}
                    className="bg-input border-border h-12 flex-1"
                  />
                  <Button className="bg-primary hover:bg-primary/90 text-primary-foreground h-12 px-6">Connect</Button>
                </div>
              </div>
            </div>
          </div>

          <div className="glass-card rounded-xl p-6">
            <h4 className="font-semibold text-foreground mb-4">Supported Lab Portals</h4>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {VENDORS.slice(0, 8).map((vendor) => (
                <div
                  key={vendor.id}
                  className="flex items-center gap-3 p-4 rounded-lg bg-secondary/30 hover:bg-secondary/50 transition-colors cursor-pointer"
                >
                  <div className="w-10 h-10 rounded-lg bg-primary/20 flex items-center justify-center text-sm font-mono text-primary">
                    {vendor.logo}
                  </div>
                  <span className="text-sm font-medium text-foreground">{vendor.name}</span>
                </div>
              ))}
            </div>
          </div>
        </TabsContent>
      </Tabs>

      {/* Recent Uploads */}
      <div className="glass-card rounded-xl p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-semibold text-foreground">Recent Uploads</h3>
          <Button variant="ghost" size="sm" className="text-primary">
            View All
          </Button>
        </div>
        <div className="space-y-3">
          {RECENT_UPLOADS.map((upload) => (
            <div key={upload.id} className="flex items-center gap-4 p-4 rounded-lg bg-secondary/30">
              <div className="w-10 h-10 rounded-lg bg-success/20 flex items-center justify-center">
                <Check className="w-5 h-5 text-success" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-medium text-foreground truncate">{upload.name}</p>
                <p className="text-sm text-muted-foreground">{upload.vendor}</p>
              </div>
              <div className="text-right">
                <p className="text-sm text-muted-foreground flex items-center gap-1">
                  <Clock className="w-3 h-3" />
                  {upload.date}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
