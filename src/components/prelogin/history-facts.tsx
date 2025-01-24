"use client"

import { useState } from "react"
import { X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

const facts = [
  "The Great Wall of China took over 2000 years to build.",
  "Ancient Egyptians invented the 365-day calendar.",
  "The first Olympic Games were held in 776 BC.",
  "The Roman Empire lasted for over 1000 years.",
  "The printing press was invented around 1440.",
]

export function HistoryFacts() {
  const [isOpen, setIsOpen] = useState(false)
  const [currentFact, setCurrentFact] = useState(facts[0])

  const getRandomFact = () => {
    const newFact = facts[Math.floor(Math.random() * facts.length)]
    setCurrentFact(newFact)
  }

  if (!isOpen) {
    return (
      <div className="fixed bottom-4 right-4 z-50">
        <Button onClick={() => setIsOpen(true)} className="bg-[#2C1810] hover:bg-[#8B4513] text-[#F5E6D3]">
          View Historical Facts
        </Button>
      </div>
    )
  }

  return (
    <div className="fixed bottom-4 right-4 z-50">
      <Card className="w-80 bg-[#FFF8DC] border-[#D4AF37]">
        <CardContent className="p-4">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-xl font-semibold text-[#2C1810]">Historical Fact</h3>
            <Button variant="ghost" size="icon" onClick={() => setIsOpen(false)} className="hover:bg-[#8B4513]/10">
              <X className="h-4 w-4 text-[#2C1810]" />
            </Button>
          </div>
          <p className="mt-4 text-[#2C1810]">{currentFact}</p>
          <Button onClick={getRandomFact} className="mt-4 w-full bg-[#8B4513] hover:bg-[#2C1810] text-[#F5E6D3]">
            New Fact
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}

