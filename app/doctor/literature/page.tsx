"use client"

import { useState } from "react"
import { PageHeader } from "@/components/page-header"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { extendedLiterature, literatureCategories } from "@/lib/mock-data"
import { Search, ExternalLink, BookOpen, Calendar, FileText, Bookmark, BookmarkCheck } from "lucide-react"

export default function LiteratureExplorerPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [savedArticles, setSavedArticles] = useState<string[]>([])

  const filteredLiterature = extendedLiterature.filter((item) => {
    const matchesSearch =
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.summary.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.relevance.toLowerCase().includes(searchQuery.toLowerCase())

    const matchesCategory =
      selectedCategory === "all" || item.relevance.toLowerCase().includes(selectedCategory.replace("-", ""))

    return matchesSearch && matchesCategory
  })

  const toggleSaved = (id: string) => {
    setSavedArticles((prev) => (prev.includes(id) ? prev.filter((a) => a !== id) : [...prev, id]))
  }

  return (
    <div className="space-y-8">
      <PageHeader
        title="Literature Explorer"
        description="Search peer-reviewed research relevant to your patients' biomarkers"
      />

      {/* Search and Filters */}
      <Card className="border-border bg-card">
        <CardContent className="p-4">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Search studies by title, summary, or biomarker..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9"
              />
            </div>
            <div className="flex flex-wrap items-center gap-2">
              {literatureCategories.map((cat) => (
                <Button
                  key={cat.id}
                  variant={selectedCategory === cat.id ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedCategory(cat.id)}
                >
                  {cat.label}
                </Button>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Stats */}
      <div className="grid gap-4 sm:grid-cols-3">
        <Card className="border-border bg-card">
          <CardContent className="p-4 flex items-center gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
              <BookOpen className="h-6 w-6 text-primary" />
            </div>
            <div>
              <p className="text-2xl font-bold text-card-foreground">{extendedLiterature.length}</p>
              <p className="text-sm text-muted-foreground">Total Studies</p>
            </div>
          </CardContent>
        </Card>
        <Card className="border-border bg-card">
          <CardContent className="p-4 flex items-center gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-success/10">
              <Calendar className="h-6 w-6 text-success" />
            </div>
            <div>
              <p className="text-2xl font-bold text-card-foreground">2024</p>
              <p className="text-sm text-muted-foreground">Latest Publications</p>
            </div>
          </CardContent>
        </Card>
        <Card className="border-border bg-card">
          <CardContent className="p-4 flex items-center gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-warning/10">
              <BookmarkCheck className="h-6 w-6 text-warning" />
            </div>
            <div>
              <p className="text-2xl font-bold text-card-foreground">{savedArticles.length}</p>
              <p className="text-sm text-muted-foreground">Saved Articles</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Results */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <p className="text-sm text-muted-foreground">Showing {filteredLiterature.length} studies</p>
        </div>

        <div className="grid gap-4 lg:grid-cols-2">
          {filteredLiterature.map((item) => (
            <Card key={item.id} className="border-border bg-card transition-all hover:shadow-md">
              <CardContent className="p-5">
                <div className="flex items-start justify-between gap-3 mb-3">
                  <Badge variant="secondary" className="text-xs">
                    {item.relevance}
                  </Badge>
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-muted-foreground">{item.year}</span>
                    <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => toggleSaved(item.id)}>
                      {savedArticles.includes(item.id) ? (
                        <BookmarkCheck className="h-4 w-4 text-primary" />
                      ) : (
                        <Bookmark className="h-4 w-4" />
                      )}
                    </Button>
                  </div>
                </div>
                <h3 className="font-medium text-card-foreground leading-snug mb-2">{item.title}</h3>
                <p className="text-xs text-muted-foreground mb-3">{item.journal}</p>
                <p className="text-sm text-muted-foreground line-clamp-3 mb-4">{item.summary}</p>
                <div className="flex items-center justify-between">
                  <Badge variant="outline" className="text-xs">
                    <FileText className="mr-1 h-3 w-3" />
                    Peer Reviewed
                  </Badge>
                  <Button variant="link" className="h-auto p-0 text-primary text-sm" asChild>
                    <a href={`https://doi.org/${item.doi}`} target="_blank" rel="noopener noreferrer">
                      View Full Study <ExternalLink className="ml-1 h-3 w-3" />
                    </a>
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* AI Search Suggestion */}
      <Card className="border-primary/20 bg-primary/5">
        <CardContent className="p-6">
          <div className="flex items-start gap-4">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 shrink-0">
              <Search className="h-5 w-5 text-primary" />
            </div>
            <div>
              <h3 className="font-medium text-card-foreground">AI-Powered Literature Search</h3>
              <p className="mt-1 text-sm text-muted-foreground">
                When you view a patient&apos;s results, Helix automatically queries relevant peer-reviewed literature
                based on their abnormal markers. Studies are prioritized by recency, relevance, and clinical
                applicability.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
