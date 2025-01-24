"use client"

import { useState, useEffect, useRef } from "react"
import Image from "next/image"
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion"
import historicalPeriodsData from "@/constants/Theme-Data"
import { fetchFromGenAI } from "@/lib/genAIClient"
import { SchemaType } from "@google/generative-ai"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import TimelineCard from "./Theme-Timeline-Card"
import EventDetails from "./Theme-Event-Details"
import axios from "axios"
import vinntage from "/public/vintage.png"

const ThematicHistory = () => {
  const [selectedTheme, setSelectedTheme] = useState<string | null>(null)
  const [selectedSubTheme, setSelectedSubTheme] = useState<string | null>(null)
  const [timelineEvents, setTimelineEvents] = useState<any[]>([])
  const [selectedEvent, setSelectedEvent] = useState<any | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [imageUrls, setImageUrls] = useState<{ [key: string]: string }>({})
  const [subThemeImageUrls, setSubThemeImageUrls] = useState<{ [key: string]: string }>({})
  const [backgroundImage, setBackgroundImage] = useState<string>("/theme-bg.jpg")
  const [selectedEventIndex, setSelectedEventIndex] = useState(0);

  const containerRef = useRef<HTMLDivElement>(null)

  const handleThemeSelect = (theme: string) => {
    setSelectedTheme(theme)
    setSelectedSubTheme(null)
    setTimelineEvents([])

    // Update background image based on selected theme
    const themeImage = imageUrls[theme] || "/theme-bg.jpg"
    setBackgroundImage(themeImage)
  }

  const handleSubThemeSelect = async (subTheme: string) => {
    setSelectedSubTheme(subTheme)
    setIsLoading(true)

    const schema = {
      type: SchemaType.ARRAY,
      items: {
        type: SchemaType.OBJECT,
        properties: {
          startYear: { type: SchemaType.STRING },
          endYear: { type: SchemaType.STRING },
          duration: { type: SchemaType.STRING },
          description: { type: SchemaType.STRING },
          shortSummary: { type: SchemaType.STRING },
          impact: { type: SchemaType.STRING },
          title: { type: SchemaType.STRING },
        },
        required: ["startYear", "endYear", "duration", "description", "shortSummary", "impact", "title"],
      },
    }

    const prompt = `List the timeline events for the theme "${selectedTheme}" and sub-theme "${subTheme}". Provide details for each event.`

    try {
      const events = await fetchFromGenAI(schema, prompt)
      setTimelineEvents(events)
    } catch (error) {
      console.error("Error fetching timeline events:", error)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    const fetchImages = async () => {
      const fetchedImages: { [key: string]: string } = {}
      for (const theme of historicalPeriodsData) {
        try {
          const response = await axios.get(`https://api.unsplash.com/search/photos`, {
            params: {
              query: theme.name,
              client_id: process.env.NEXT_PUBLIC_UNSPLASH_ACCESS_KEY,
              per_page: 1,
            },
          })
          fetchedImages[theme.name] = response.data.results[0]?.urls?.regular || ""
        } catch (error) {
          console.error(`Error fetching image for theme ${theme.name}:`, error)
          fetchedImages[theme.name] = ""
        }
      }
      setImageUrls(fetchedImages)
    }

    fetchImages()
  }, [])

  return (
    <div className="min-h-screen bg-gray-100 overflow-hidden relative"
      style={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundRepeat: backgroundImage !== "/theme-bg.jpg" ? "no-repeat" : "repeat",
        backgroundSize: backgroundImage !== "/theme-bg.jpg" ? "cover" : "auto",
        backgroundPosition: "top",
      }}
      ref={containerRef}
    >      
      <div className="relative z-10 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-7xl font-bold text-center mb-6 ">Thematic History</h1>
          <p className="text-xl text-center mb-12 ">Lets make a time travel to that era of history</p>

          <AnimatePresence>
            {!selectedTheme && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="space-y-12"
              >
                {historicalPeriodsData.map((theme, index) => (
                  <motion.div
                    key={theme.id}
                    className={`flex items-center ${index % 2 === 0 ? "flex-row" : "flex-row-reverse"}`}
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <Card 
                      className="w-1/2 cursor-pointer hover:shadow-lg transition-shadow duration-300"
                      style={{
                        backgroundImage: `url(${vinntage.src})`,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                      }}
                    >
                      <CardHeader className="relative h-48">
                        <Image
                          src={imageUrls[theme.name] || ""}
                          alt={theme.name}
                          layout="fill"
                          objectFit="cover"
                          className="rounded-t-lg"
                        />
                      </CardHeader>
                      <CardContent>
                        <ul className="list-disc list-inside p-5">
                          {theme.subThemes.map((subTheme) => (
                            <li key={subTheme.id}>{subTheme.name}</li>
                          ))}
                        </ul>
                        <Button className="mt-4 w-full" onClick={() => handleThemeSelect(theme.name)}>
                          Select Theme
                        </Button>
                      </CardContent>
                    </Card>
                    <div className={`w-1/2 ${index % 2 === 0 ? "pl-8" : "pr-8"}`}>
                      <h2 className="text-3xl font-semibold mb-4 ">{theme.name}</h2>
                      <p className="text-lg text-gray-500">{theme.description}</p>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            )}

            {selectedTheme && !selectedSubTheme && (
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -50 }}
                className="space-y-6"
              >
                <h2 className="text-3xl font-semibold text-center mb-6">{selectedTheme}</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {historicalPeriodsData
                    .find((theme) => theme.name === selectedTheme)
                    ?.subThemes.map((subTheme) => (
                      <Card 
                        key={subTheme.id} 
                        className="cursor-pointer hover:shadow-lg transition-shadow duration-300"
                        style={{
                          backgroundImage: `url(/vintage2.png)`,
                          backgroundRepeat: "repeat"
                        }}
                      >
                        <CardHeader>
                          <CardTitle>{subTheme.name}</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <Button className="w-full" onClick={() => handleSubThemeSelect(subTheme.name)}>
                            Select Sub-Theme
                          </Button>
                        </CardContent>
                      </Card>
                    ))}
                </div>
              </motion.div>
            )}

            {selectedSubTheme && (
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -50 }}
                className="space-y-6"
              >
                <h2 className="text-3xl font-semibold text-center mb-6">{selectedSubTheme}</h2>
                {isLoading ? (
                  <div className="flex justify-center items-center h-64">
                    <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2"></div>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {/* Horizontal Scrollable Container */}
                    <div className="flex space-x-6 overflow-x-auto py-4">
                      {/* Show the selected event */}
                      {timelineEvents.map((event, index) => (
                        index === selectedEventIndex && (  // Only display the selected event
                          <div key={index} className="flex-shrink-0">
                            <TimelineCard event={event} onViewDetails={setSelectedEvent} />
                          </div>
                        )
                      ))}
                    </div>
                    
                    {/* Navigation Buttons */}
                    <div className="flex justify-center space-x-2 mt-4 pb-5">
                      {timelineEvents.map((_, index) => (
                        <button
                          key={index}
                          className="w-8 h-8 rounded-full bg-gray-300 hover:bg-gray-500 text-white"
                          onClick={() => {
                            // Set the selected event index on button click
                            setSelectedEventIndex(index); 
                          }}
                        >
                          {index + 1}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </motion.div>
            )}

          </AnimatePresence>

          {selectedEvent && <EventDetails event={selectedEvent} onClose={() => setSelectedEvent(null)} />}
        </div>
      </div>
    </div>
  )
}

export default ThematicHistory

