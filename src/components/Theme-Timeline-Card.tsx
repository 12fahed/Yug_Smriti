"use client"

import type React from "react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import { SchemaType } from "@google/generative-ai"
import { fetchFromGenAI } from "@/lib/genAIClient"
import vinntage from "/public/vintage.png"
import pin from "/public/pin.png"


interface TimelineEvent {
  startYear: string
  endYear: string
  duration: string
  description: string
  shortSummary: string
  impact: string
  title: string
}

const TimelineCard: React.FC<{ event: TimelineEvent; onViewDetails: (event: TimelineEvent) => void }> = ({
  event,
  onViewDetails,
}) => {
  const [isPerspectiveModalOpen, setIsPerspectiveModalOpen] = useState(false)
  const [perspectives, setPerspectives] = useState<{ prespectiveName: string, prespective: string }[]>([])
  const [currentPerspectiveIndex, setCurrentPerspectiveIndex] = useState(0)
  const [isLoading, setIsLoading] = useState(false)

  const handlePerspectiveClick = async () => {
    setIsLoading(true)
    setIsPerspectiveModalOpen(true)
    try {

      const schema = {
        type: SchemaType.ARRAY,
        items: {
          type: SchemaType.OBJECT,
          properties: {
            prespectiveName: { type: SchemaType.STRING },
            prespective: { type: SchemaType.STRING }
          }
        }
      }

      const prompt = `For the Topic ${event.title} where ${event.duration} what are the various perspectives present? Please provide a list of 3-5 key perspectives names and assume yourself as in place of that prespective and tell me what prespective/opinion they might have in a paragraph.`

      const fetchedPerspectives = await fetchFromGenAI(schema, prompt)
      console.log(fetchedPerspectives)
      setPerspectives(fetchedPerspectives)
    } catch (error) {
      console.error("Error fetching perspectives:", error)
      setPerspectives([{ prespectiveName: "Error", prespective: "Error fetching perspectives. Please try again." }])
    }
    setIsLoading(false)
  }

  const nextPerspective = () => {
    if (currentPerspectiveIndex < perspectives.length - 1) {
      setCurrentPerspectiveIndex(currentPerspectiveIndex + 1)
    }
  }

  const prevPerspective = () => {
    if (currentPerspectiveIndex > 0) {
      setCurrentPerspectiveIndex(currentPerspectiveIndex - 1)
    }
  }

  return (
    <div className="border rounded-lg p-4 shadow-md mb-4" 
      style={{
        backgroundImage: `url(${vinntage.src})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundColor: 'rgba(245, 245, 245, 0.3)', // Adjust the transparency here
        backgroundBlendMode: 'overlay'
      }}
    >
      <h3 className="text-lg font-bold">{event.title}</h3>
      <p className="text-sm text-gray-600">
        {event.startYear} - {event.endYear} ({event.duration})
      </p>
      <p className="mt-2 text-gray-700">{event.description}</p>
      <p className="mt-2 font-medium">Impact: {event.impact}</p>
      <p className="mt-1 text-gray-500">Summary: {event.shortSummary}</p>
      <div className="mt-4 space-x-2">
        <Button variant="default" onClick={() => onViewDetails(event)}>
          View Details
        </Button>
        <Button variant="outline" onClick={handlePerspectiveClick}>
          Perspectives
        </Button>
      </div>

      <Dialog open={isPerspectiveModalOpen} onOpenChange={setIsPerspectiveModalOpen}>
        <DialogContent 
          className="max-h-[500px] overflow-y-auto" 
          style={{
            backgroundImage: `url(${pin.src})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        >
          <DialogHeader className="pl-10 pt-5">
            <DialogTitle>Perspectives on {event.title}</DialogTitle>
            <DialogDescription>Various perspectives for the duration of {event.duration}</DialogDescription>
          </DialogHeader>
          {isLoading ? (
            <p className="pl-10 pt-5">Loading perspectives...</p>
          ) : (
            <>
              {perspectives.length > 0 && (
                <>
                  <div className="pl-10 pt-5">
                    <h4 className="font-semibold">{perspectives[currentPerspectiveIndex].prespectiveName}</h4>
                    <p>{perspectives[currentPerspectiveIndex].prespective}</p>
                  </div>
                  <div className="mt-4 flex justify-between">
                    <Button variant="outline" onClick={prevPerspective} disabled={currentPerspectiveIndex === 0}>
                      Previous
                    </Button>
                    <Button variant="outline" onClick={nextPerspective} disabled={currentPerspectiveIndex === perspectives.length - 1}>
                      Next
                    </Button>
                  </div>
                </>
              )}
            </>
          )}
        </DialogContent>
      </Dialog>
      
    </div>
  )
}

export default TimelineCard
