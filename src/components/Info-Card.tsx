import type React from "react"
import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import WikipediaArticle from "./Wikipedia-Article"
import vinntage from "/public/vintage1.png"

interface InfoCardProps {
  event: {
    country: string
    year: number
    event: string
    significance: string
  }
}

const InfoCard: React.FC<InfoCardProps> = ({ event }) => {
  const [showWikipedia, setShowWikipedia] = useState(false)

  return (
    <Card 
      className="mb-4"
      style={{
        backgroundImage: `url(${vinntage.src})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <CardHeader>
        <CardTitle>{event.country}</CardTitle>
        <CardDescription>Year: {event.year}</CardDescription>
      </CardHeader>
      <CardContent>
        <p className="font-semibold mb-2">{event.event}</p>
        <p className="text-sm text-muted-foreground mb-4 text-black">{event.significance}</p>
        <Button onClick={() => setShowWikipedia(!showWikipedia)}>{showWikipedia ? "Show Less" : "Read More"}</Button>
      </CardContent>
      {showWikipedia && <WikipediaArticle searchTerm={`${event.event} ${event.country} ${event.year}`} />}
    </Card>
  )
}

export default InfoCard

