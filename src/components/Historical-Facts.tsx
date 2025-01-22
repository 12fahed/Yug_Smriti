"use client"

import { useEffect, useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { X, BookOpen } from "lucide-react"

const historicalFacts = [
  {
    fact: "The Great Wall of China took over 2000 years to build",
    year: "220 BCE - 1644 CE",
  },
  {
    fact: "Ancient Romans used urine as mouthwash",
    year: "1st century CE",
  },
  {
    fact: "The Indus Valley Civilization had an advanced drainage system as early as 3000 BCE",
    year: "3000 BCE",
  },
  {
    fact: "Cleopatra lived closer in time to the first Pizza Hut than to the building of the Great Pyramids",
    year: "69-30 BCE",
  },
  {
    fact: "The Ancient Indian practice of surgery began around 800 BCE, with detailed medical texts",
    year: "800 BCE",
  },
]

export function HistoricalFact() {
  const [fact, setFact] = useState(historicalFacts[0])
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    if (isVisible) {
      const interval = setInterval(() => {
        const randomIndex = Math.floor(Math.random() * historicalFacts.length)
        setFact(historicalFacts[randomIndex])
      }, 10000)

      return () => clearInterval(interval)
    }
  }, [isVisible])

  if (!isVisible) {
    return (
      <Button
        onClick={() => setIsVisible(true)}
        className="fixed bottom-4 right-4 bg-amber-700 text-white hover:bg-amber-800 z-50"
      >
        <BookOpen className="h-4 w-4 mr-2" />
        Historical Fact
      </Button>
    )
  }

  return (
    <Card className="fixed bottom-4 right-4 w-80 bg-[url('https://img.freepik.com/free-vector/realistic-burned-paper-texture_52683-73921.jpg?semt=ais_incoming')] bg-center text-stone-100 p-6 shadow-xl border-none animate-in slide-in-from-right z-50">
      <div className="bg-black/30 -m-6 p-6">
        <div className="flex justify-between items-start mb-4">
          <h3 className="text-lg font-serif">On This Day in History...</h3>
          <Button
            size="icon"
            variant="ghost"
            className="h-6 w-6 text-stone-100 hover:text-stone-100 hover:bg-white/20"
            onClick={() => setIsVisible(false)}
          >
            <X className="h-4 w-4" />
            <span className="sr-only">Close</span>
          </Button>
        </div>
        <p className="text-sm mb-2">{fact.fact}</p>
        <p className="text-xs text-stone-300">{fact.year}</p>
      </div>
    </Card>
  )
}

