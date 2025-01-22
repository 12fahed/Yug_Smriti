"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { X, Scroll } from "lucide-react"

const historicalFacts = [
  "The Great Wall of China took over 2000 years to build",
  "Ancient Egyptians invented the 365-day calendar",
  "The Roman Empire lasted for over 1000 years",
  "The printing press was invented around 1440",
]

export function HistoricalFact() {
  const [isVisible, setIsVisible] = useState(true)
  const [fact] = useState(() => {
    return historicalFacts[Math.floor(Math.random() * historicalFacts.length)]
  })

  if (!isVisible) {
    return (
      <Button
        className="fixed bottom-4 right-4 bg-[#8B4513] hover:bg-[#D4AF37] text-[#F5E6D3]"
        onClick={() => setIsVisible(true)}
      >
        <Scroll className="h-4 w-4 mr-2" />
        Show Historical Fact
      </Button>
    )
  }

  return (
    <div className="fixed bottom-4 right-4 max-w-sm">
      <div
        className="relative p-6 rounded-lg"
        style={{
          backgroundImage: `url('/paper2.png')`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          clipPath: `polygon(
            0% 0%, 
            100% 2%, 
            98% 100%, 
            2% 98%
          )`,
          filter: "drop-shadow(0 4px 8px rgba(0, 0, 0, 0.2))",
        }}
      >
        <Button
          variant="ghost"
          size="icon"
          className="absolute top-2 right-2 hover:bg-[#2C1810]/20"
          onClick={() => setIsVisible(false)}
        >
          <X className="h-4 w-4 text-[#2C1810]" />
        </Button>

        <div
          className="historical-fact-content"
          style={{
            backgroundImage:
              "linear-gradient(45deg, transparent 25%, rgba(0,0,0,0.05) 25%, rgba(0,0,0,0.05) 50%, transparent 50%, transparent 75%, rgba(0,0,0,0.05) 75%)",
          }}
        >
          <h4 className="text-lg font-bold text-[#2C1810] mb-2">Historical Fact of the Moment</h4>
          <p className="text-[#2C1810] pr-6">{fact}</p>
        </div>
      </div>
    </div>
  )
}

