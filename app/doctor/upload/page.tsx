"use client"

import { useState, useCallback } from "react"
import { useDropzone } from "react-dropzone"
import { PageHeader } from "@/components/page-header"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Upload, FileText, X, Check, AlertCircle, Loader2, User, Calendar, Building2 } from "lucide-react"
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
  { id: "prodrome", name: "ProdromeScan", types: ["Lipids", "Metabolomics"] },
  { id: "diagnostic-solutions", name: "Diagnostic Solutions", types: ["GI-MAP"] },
  { id: "oxford", name: "Oxford Biomedical", types: ["MRT Food Sensitivity"] },
  { id: "vibrant", name: "Vibrant Wellness", types: ["Micronutrients", "Gut Zoomer"] },
  { id: "cyrex", name: "Cyrex Labs", types: ["Autoimmunity Panels"] },
  { id: "genova", name: "Genova Diagnostics", types: ["DUTCH", "Organic Acids"] },
  { id: "quest", name: "Quest Diagnostics", types: ["Standard Labs"] },
  { id: "labcorp", name: "Labcorp", types: ["Standard Labs"] },
  { id: "custom", name: "Other / Manual Entry", types: ["Custom"] },
]

const PATIENTS = [
  { id: "1", name: "Sarah Chen" },
  { id: "2", name: "Michael Roberts" },
  { id: "3", name: "Emily Johnson" },
  { id: "4", name: "David Kim" },
]

export default function UploadResultsPage() {
  const [files, setFiles] = useState<UploadedFile[]>([])
  const [selectedPatient, setSelectedPatient] = useState("")
  const [selectedVendor, setSelectedVendor] = useState("")
  const [testDate, setTestDate] = useState("")

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
      <PageHeader
        title="Upload Results"
        description="Import lab results from connected vendors or upload files manually"
      />

      {/* Selection Form */}
      <div className="glass-card rounded-xl p-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="space-y-2">
            <Label className="text-sm text-muted-foreground flex items-center gap-2">
              <User className="w-4 h-4" />
              Patient
            </Label>
            <Select value={selectedPatient} onValueChange={setSelectedPatient}>
              <SelectTrigger className="bg-input border-border h-12">
                <SelectValue placeholder="Select patient" />
              </SelectTrigger>
              <SelectContent>
                {PATIENTS.map((patient) => (
                  <SelectItem key={patient.id} value={patient.id}>
                    {patient.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label className="text-sm text-muted-foreground flex items-center gap-2">
              <Building2 className="w-4 h-4" />
              Lab Vendor
            </Label>
            <Select value={selectedVendor} onValueChange={setSelectedVendor}>
              <SelectTrigger className="bg-input border-border h-12">
                <SelectValue placeholder="Select vendor" />
              </SelectTrigger>
              <SelectContent>
                {VENDORS.map((vendor) => (
                  <SelectItem key={vendor.id} value={vendor.id}>
                    <div>
                      <div>{vendor.name}</div>
                      <div className="text-xs text-muted-foreground">{vendor.types.join(", ")}</div>
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
              "w-16 h-16 rounded-2xl flex items-center justify-center mb-4 transition-all",
              isDragActive ? "bg-primary/20" : "bg-secondary",
            )}
          >
            <Upload className={cn("w-8 h-8 transition-all", isDragActive ? "text-primary" : "text-muted-foreground")} />
          </div>
          <h3 className="text-lg font-semibold text-foreground mb-2">
            {isDragActive ? "Drop files here" : "Drag & drop lab results"}
          </h3>
          <p className="text-sm text-muted-foreground mb-4">or click to browse your files</p>
          <p className="text-xs text-muted-foreground">Supports PDF, CSV, XLS, XLSX files up to 50MB</p>
        </div>
      </div>

      {/* Uploaded Files */}
      {files.length > 0 && (
        <div className="glass-card rounded-xl p-6">
          <h3 className="font-semibold text-foreground mb-4">Uploaded Files</h3>
          <div className="space-y-3">
            {files.map((file) => (
              <div key={file.id} className="flex items-center gap-4 p-4 rounded-lg bg-secondary/50">
                <div
                  className={cn(
                    "w-10 h-10 rounded-lg flex items-center justify-center",
                    file.status === "complete" ? "bg-success/20" : "bg-primary/20",
                  )}
                >
                  {file.status === "complete" ? (
                    <Check className="w-5 h-5 text-success" />
                  ) : file.status === "error" ? (
                    <AlertCircle className="w-5 h-5 text-destructive" />
                  ) : (
                    <FileText className="w-5 h-5 text-primary" />
                  )}
                </div>

                <div className="flex-1 min-w-0">
                  <p className="font-medium text-foreground truncate">{file.name}</p>
                  <p className="text-sm text-muted-foreground">
                    {formatFileSize(file.size)}
                    {file.status === "processing" && " • Processing..."}
                    {file.status === "complete" && " • Ready"}
                  </p>

                  {(file.status === "uploading" || file.status === "processing") && (
                    <div className="mt-2 h-1 bg-secondary rounded-full overflow-hidden">
                      <div
                        className={cn(
                          "h-full transition-all",
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
              Process Results
            </Button>
          </div>
        </div>
      )}

      {/* Auto-import Info */}
      <div className="glass-card rounded-xl p-6">
        <div className="flex items-start gap-4">
          <div className="w-10 h-10 rounded-lg bg-accent/20 flex items-center justify-center">
            <Building2 className="w-5 h-5 text-accent" />
          </div>
          <div>
            <h3 className="font-semibold text-foreground mb-1">Automatic Import</h3>
            <p className="text-sm text-muted-foreground mb-3">
              Connect your lab vendor accounts to automatically import results when they are ready.
            </p>
            <Button variant="outline" size="sm" className="text-accent border-accent/50 bg-transparent">
              Manage Vendor Connections
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
