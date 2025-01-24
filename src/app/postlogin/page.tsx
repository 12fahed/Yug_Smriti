"use client"

import { useState, useEffect } from "react"
import { Search } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { motion, AnimatePresence } from "framer-motion"
import { NavMenu } from "@/components/prelogin/nav-menu"

const timelineData = [
  {
    era: "Ancient",
    period: "3000 BCE - 500 CE",
    description:
      "The ancient period saw the rise of great civilizations like Egypt, Greece, and Rome. This era marked the beginning of organized society, the development of writing systems, and the construction of magnificent structures like the pyramids and the Parthenon.",
    background:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Untitled%20design%20(4).jpg-7zOEs0MNOOFgpjb3Iht9Rk43KumhsP.jpeg",
    backgroundColor: "#ece8e4",
    events: [
      {
        year: "3000 BCE",
        title: "Rise of Egyptian Civilization",
        description: "The unification of Upper and Lower Egypt marks the beginning of the Early Dynastic Period.",
      },
      {
        year: "2700 BCE",
        title: "Great Pyramids Construction",
        description:
          "The construction of the Great Pyramids of Giza begins, showcasing advanced architectural knowledge.",
        image: "/placeholder.svg?height=200&width=200",
      },
      {
        year: "1200 BCE",
        title: "Trojan War",
        description: "The legendary Trojan War occurs, later immortalized in Homer's Iliad and Odyssey.",
        image: "/placeholder.svg?height=200&width=200",
      },
      {
        year: "500 BCE",
        title: "Golden Age of Greece",
        description: "Athens enters its Golden Age, marked by advances in philosophy, art, and democracy.",
        image: "/placeholder.svg?height=200&width=200",
      },
      {
        year: "27 BCE",
        title: "Roman Empire Begins",
        description: "Octavian becomes Augustus, the first Roman Emperor, beginning the Roman Empire.",
        image: "/placeholder.svg?height=200&width=200",
      },
      {
        year: "476 CE",
        title: "Fall of Rome",
        description: "The Western Roman Empire falls, marking the end of ancient classical civilization.",
        image: "/placeholder.svg?height=200&width=200",
      },
    ],
  },
  {
    era: "Medieval",
    period: "500 CE - 1500 CE",
    description:
      "The medieval period, also known as the Middle Ages, was characterized by feudal systems, the rise of Christianity, and the construction of grand cathedrals. This era saw the development of universities, Gothic architecture, and the preservation of knowledge by monasteries.",
    background:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Untitled%20design%20(2).jpg-vGVvz8ixAR1HqnmowRBQeGmQO9XsX6.jpeg",
    backgroundColor: "#694838",
    events: [
      {
        year: "532 CE",
        title: "Hagia Sophia",
        description: "Construction of the Hagia Sophia begins in Constantinople under Justinian I.",
        image: "/placeholder.svg?height=200&width=200",
      },
      {
        year: "800 CE",
        title: "Charlemagne's Empire",
        description: "Charlemagne is crowned Emperor of the Romans, establishing the Holy Roman Empire.",
        image: "/placeholder.svg?height=200&width=200",
      },
      {
        year: "1066 CE",
        title: "Norman Conquest",
        description: "William the Conqueror leads the Norman Conquest of England, changing English society forever.",
        image: "/placeholder.svg?height=200&width=200",
      },
      {
        year: "1215 CE",
        title: "Magna Carta",
        description: "King John signs the Magna Carta, limiting royal power and establishing rule of law.",
        image: "/placeholder.svg?height=200&width=200",
      },
      {
        year: "1347 CE",
        title: "Black Death",
        description: "The Black Death pandemic reaches Europe, causing widespread devastation.",
        image: "/placeholder.svg?height=200&width=200",
      },
      {
        year: "1453 CE",
        title: "Fall of Constantinople",
        description: "The Byzantine Empire falls to the Ottoman Turks, marking the end of the medieval period.",
        image: "/placeholder.svg?height=200&width=200",
      },
    ],
  },
  {
    era: "Modern",
    period: "1500 CE - Present",
    description:
      "The modern era began with the Renaissance and continues to today. This period has seen unprecedented technological advancement, scientific discoveries, and social changes. From the Industrial Revolution to the Digital Age, this era represents humanity's rapid progress.",
    background:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Untitled%20design%20(3).jpg-VFUCeReUs21q4eKBM1AC7Y3hN0zcxL.jpeg",
    backgroundColor: "#fbead8",
    events: [
      {
        year: "1492 CE",
        title: "Age of Exploration",
        description: "Columbus reaches the Americas, beginning the Age of Exploration and global connections.",
        image: "/placeholder.svg?height=200&width=200",
      },
      {
        year: "1760 CE",
        title: "Industrial Revolution",
        description: "The Industrial Revolution begins in Britain, transforming manufacturing and society.",
        image: "/placeholder.svg?height=200&width=200",
      },
      {
        year: "1789 CE",
        title: "French Revolution",
        description: "The French Revolution begins, spreading ideas of liberty, equality, and fraternity.",
        image: "/placeholder.svg?height=200&width=200",
      },
      {
        year: "1914 CE",
        title: "World War I",
        description: "The First World War begins, reshaping global politics and society.",
        image: "/placeholder.svg?height=200&width=200",
      },
      {
        year: "1969 CE",
        title: "Moon Landing",
        description: "NASA's Apollo 11 mission successfully lands humans on the Moon.",
        image: "/placeholder.svg?height=200&width=200",
      },
      {
        year: "2000 CE",
        title: "Digital Revolution",
        description: "The Internet and digital technology revolutionize global communication.",
        image: "/placeholder.svg?height=200&width=200",
      },
    ],
  },
]

export default function Home() {
  const [activeEra, setActiveEra] = useState(0)
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const [showTimeline, setShowTimeline] = useState(false)
  const [hoveredEvent, setHoveredEvent] = useState(null)
  const [isHovering, setIsHovering] = useState(false)
  const [visibleEvents, setVisibleEvents] = useState([])

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisibleEvents((prev) => [...prev, entry.target.dataset.eventIndex])
          }
        })
      },
      { threshold: 0.2 },
    )

    const elements = document.querySelectorAll(".timeline-event")
    elements.forEach((el) => observer.observe(el))

    return () => {
      elements.forEach((el) => observer.unobserve(el))
    }
  }, [showTimeline])

  return (
    <main
      className="min-h-screen bg-cover bg-center bg-no-repeat transition-all duration-1000"
      style={{
        backgroundImage:
          activeEra === 0
            ? `url('${timelineData[activeEra].background}'), url('https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Untitled%20design%20(15).jpg-LcWM0fUl7F3wu6Ua0vB7DL1FqzdyHD.jpeg')`
            : `url('${timelineData[activeEra].background}')`,
        backgroundRepeat: activeEra === 0 ? "no-repeat, repeat" : "no-repeat",
        backgroundSize: activeEra === 0 ? "cover, auto" : "cover",
      }}
    >
      <div className="absolute inset-0 bg-white/10">
        <NavMenu />

        <div className="container mx-auto px-4 py-12">
          <div className="flex justify-center gap-8 mb-12">
            {timelineData.map((item, index) => (
              <button
                key={item.era}
                onClick={() => {
                  setActiveEra(index)
                  setShowTimeline(false)
                  setVisibleEvents([])
                }}
                className={cn(
                  "relative px-6 py-3 text-lg font-medium transition-colors",
                  activeEra === index ? "text-primary" : "text-gray-600 hover:text-primary",
                )}
              >
                {item.era}
                {activeEra === index && <div className="absolute bottom-0 left-0 h-0.5 w-full bg-primary" />}
              </button>
            ))}
          </div>

          <div className="max-w-4xl mx-auto">
            <div
              className="overflow-hidden p-8 transition-all"
              style={{
                backgroundImage: `url('https://hebbkx1anhila5yf.public.blob.vercel-storage.com/paper2-uqGAas1c3JPnkrNLS9GnYDsk0HHCBi.png')`,
                backgroundSize: "100% 100%",
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",
              }}
            >
              <h2 className="text-2xl text-center font-bold mb-2 text-[#2C1810]">{timelineData[activeEra].era} Era</h2>
              <p className="text-sm text-center  text-[#2C1810] mb-4">{timelineData[activeEra].period}</p>
              <p className="text-[#2C1810]  text-center  leading-relaxed mb-4">{timelineData[activeEra].description}</p>
              <Button onClick={() => setShowTimeline(!showTimeline)}>
                {showTimeline ? "Hide Timeline" : "View Timeline"}
              </Button>
            </div>

            <div
              className={cn(
                "mt-32 transition-all duration-500 relative",
                showTimeline ? "opacity-100" : "opacity-0 h-0 overflow-hidden",
              )}
            >
              <h2 className="gap:30px text-3xl font-bold text-center mb-12 text-gray-800">Timeline</h2>
              <div className="relative max-w-5xl mx-auto px-4">
                {/* Central timeline line */}
                <div className="absolute left-1/2 top-0 bottom-0 w-1 bg-gray-800/50 transform -translate-x-1/2" />

                <div className="space-y-24">
                  {timelineData[activeEra].events.map((event, index) => (
                    <motion.div
                      key={event.year}
                      className={cn(
                        "relative flex items-center justify-between gap-8 timeline-event",
                        index % 2 === 0 ? "flex-row" : "flex-row-reverse",
                      )}
                      data-event-index={index}
                      initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                      animate={{
                        opacity: visibleEvents.includes(index.toString()) ? 1 : 0,
                        x: visibleEvents.includes(index.toString()) ? 0 : index % 2 === 0 ? -50 : 50,
                      }}
                      transition={{ duration: 0.5 }}
                      onMouseEnter={() => {
                        setHoveredEvent(event)
                        setIsHovering(true)
                      }}
                      onMouseLeave={() => {
                        setIsHovering(false)
                      }}
                    >
                      {/* Content */}
                      <div className={cn("w-[calc(50%-2rem)]", index % 2 === 0 ? "text-right" : "text-left")}>
                        <div
                          className="inline-block p-6 rounded-lg"
                          style={{
                            backgroundImage: `url('https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Untitled_design__6_-removebg-preview-EGBP4v0VUXBwNsBZLRjA8EHGMSZZ8b.png')`,
                            backgroundSize: "cover",
                            backgroundPosition: "center",
                          }}
                        >
                          <div className="p-4 rounded-lg">
                            <h3 className="text-xl font-bold text-white">{event.year}</h3>
                            <h4 className="text-lg font-medium mb-2 text-white">{event.title}</h4>
                            <p className="text-sm text-white">{event.description}</p>
                          </div>
                        </div>
                      </div>

                      {/* Number */}
                      <div
                        className={cn(
                          "absolute top-1/2 transform -translate-y-1/2 w-20 h-20 bg-primary text-white rounded-full flex items-center justify-center font-bold text-xl z-10",
                          index % 2 === 0 ? "left-[calc(50%+1rem)]" : "right-[calc(50%+1rem)]",
                        )}
                      >
                        {index + 1}
                      </div>

                      {/* Empty space for the other side */}
                      <div className="w-[calc(50%-2rem)]" />
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>

            {hoveredEvent && (
              <div
                className={cn(
                  "fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white p-6 rounded-lg shadow-xl max-w-md w-full transition-opacity duration-300",
                  isHovering ? "opacity-100" : "opacity-0 pointer-events-none",
                )}
              >
                <h3 className="text-2xl font-bold mb-2">{hoveredEvent.title}</h3>
                <p className="text-gray-600 mb-4">{hoveredEvent.year}</p>
                <p className="text-gray-700 mb-4">{hoveredEvent.description}</p>
                <div className="grid grid-cols-2 gap-4">
                  <img
                    src={hoveredEvent.image || "/placeholder.svg"}
                    alt={hoveredEvent.title}
                    className="w-full h-auto rounded"
                  />
                  <img
                    src={`/placeholder.svg?text=Additional+Photo`}
                    alt="Additional information"
                    className="w-full h-auto rounded"
                  />
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  )
}

