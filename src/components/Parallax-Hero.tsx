"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import egyptImage from "@/assets/egypt1.jpg";

const historicalPeriods = [
  {
    title: "Ancient Egypt",
    description: "Land of Pharaohs and Pyramids",
    image: egyptImage, // Pyramids
    years: "3100 BCE - 30 BCE"
  },
  {
    title: "Ancient Rome",
    description: "The Empire that Shaped the World",
    image: "https://images.unsplash.com/photo-1552832230-c0197dd311b5?q=80&w=2000", // Colosseum
    years: "753 BCE - 476 CE"
  },
  {
    title: "Medieval Europe",
    description: "The Age of Knights and Castles",
    image: "https://images.unsplash.com/photo-1585001134526-8c1c4e4bd161?q=80&w=2000", // Castle
    years: "476 CE - 1453 CE"
  },
  {
    title: "Renaissance",
    description: "The Rebirth of Art and Learning",
    image: "https://images.unsplash.com/photo-1598971861713-54ad16a7e72e?q=80&w=2000", // Florence
    years: "14th - 17th Century"
  }
]

export function ParallaxHero() {
  const [activeIndex, setActiveIndex] = useState(0)
  const [isTransitioning, setIsTransitioning] = useState(false)

  useEffect(() => {
    const interval = setInterval(() => {
      setIsTransitioning(true)
      setTimeout(() => {
        setActiveIndex((current) => (current + 1) % historicalPeriods.length)
        setIsTransitioning(false)
      }, 500)
    }, 5000)

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="relative h-[80vh] overflow-hidden">
      {historicalPeriods.map((period, index) => (
        <div
          key={period.title}
          className={`absolute inset-0 transition-transform duration-1000 ease-in-out ${
            index === activeIndex ? "translate-x-0 opacity-100" : "translate-x-full opacity-0"
          }`}
        >
          <div className="absolute inset-0">
            <Image
              src={period.image}
              alt={period.title}
              fill
              className="object-cover"
              priority={index === 0}
            />
            <div className="absolute inset-0 bg-black/50" />
          </div>
          <div className="relative h-full flex items-center justify-center text-center text-white">
            <div
              className={`transform transition-all duration-1000 ${
                isTransitioning ? "scale-95 opacity-0" : "scale-100 opacity-100"
              }`}
            >
              <h2 className="text-5xl font-serif mb-4">{period.title}</h2>
              {/* <p className="text-xl mb-2">{period.subtitle}</p> */}
              <p className="text-lg text-stone-300">{period.years}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

