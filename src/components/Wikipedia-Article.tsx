import type React from "react"
import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"

interface WikipediaArticleProps {
  searchTerm: string
}

interface WikipediaResponse {
  title: string
  extract: string
  thumbnail?: string
}

const WikipediaArticle: React.FC<WikipediaArticleProps> = ({ searchTerm }) => {
  const [article, setArticle] = useState<WikipediaResponse | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchArticle = async () => {
      try {
        setLoading(true)
        setError(null)

        const response = await fetch(`/api/wikipedia?q=${encodeURIComponent(searchTerm)}`)

        if (!response.ok) {
          const data = await response.json()
          throw new Error(data.error || "Failed to fetch article")
        }

        const data = await response.json()
        setArticle(data)
      } catch (err) {
        console.error("Error fetching article:", err)
        setError(err instanceof Error ? err.message : "Failed to fetch article")
      } finally {
        setLoading(false)
      }
    }

    fetchArticle()
  }, [searchTerm])

  if (loading) {
    return (
      <Card className="mt-4">
        <CardContent className="p-4">
          <Skeleton className="h-4 w-[250px] mb-4" />
          <Skeleton className="h-32 w-full" />
        </CardContent>
      </Card>
    )
  }

  if (error) {
    return (
      <Card className="mt-4">
        <CardContent className="p-4">
          <p className="text-sm text-muted-foreground">
            No Wikipedia article found for this event. This might be because:
          </p>
          <ul className="list-disc ml-4 mt-2 text-sm text-muted-foreground">
            <li>The event is too specific or recent</li>
            <li>The event might be known by a different name</li>
            <li>The event might be part of a larger historical article</li>
          </ul>
        </CardContent>
      </Card>
    )
  }

  if (!article) return null

  return (
    <Card className="mt-4">
      <CardContent className="p-4">
        <h3 className="text-xl font-bold mb-2">{article.title}</h3>
        {article.thumbnail && (
          <img
            src={article.thumbnail || "/placeholder.svg"}
            alt={article.title}
            className="float-right ml-4 mb-4 max-w-xs rounded-lg"
          />
        )}
        <div className="prose prose-sm dark:prose-invert" dangerouslySetInnerHTML={{ __html: article.extract }} />
      </CardContent>
    </Card>
  )
}

export default WikipediaArticle

