"use client"

import { useEffect, useRef, useState } from "react"
import Image from "next/image"

interface HistoricalPeriod {
  title: string
  description: string
  image: string
  years: string
}

interface ParallaxSectionProps {
  period: HistoricalPeriod
}

export function ParallaxSection({ period }: ParallaxSectionProps) {
  const [offset, setOffset] = useState(0)
  const sectionRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleScroll = () => {
      if (sectionRef.current) {
        const { top } = sectionRef.current.getBoundingClientRect()
        const offset = window.pageYOffset
        const elementOffset = top + offset
        const parallaxOffset = (elementOffset - window.pageYOffset) * 0.5
        setOffset(parallaxOffset)
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <div ref={sectionRef} className="relative h-screen overflow-hidden">
      <div
        className="absolute inset-0 w-full h-[120%]"
        style={{
          transform: `translateY(${offset}px)`,
          willChange: "transform",
        }}
      >
        <Image src={period.image || "/placeholder.svg"} alt={period.title} fill className="object-cover" priority />
        <div className="absolute inset-0 bg-black/50" />
      </div>
      <div className="relative h-full flex items-center justify-center">
        <div className="text-center text-white p-8 rounded-lg backdrop-blur-sm max-w-4xl">
          <h2 className="text-4xl md:text-6xl font-serif mb-4">{period.title}</h2>
          <p className="text-xl md:text-2xl mb-4">{period.description}</p>
          <p className="text-lg md:text-xl">{period.years}</p>
        </div>
      </div>
    </div>
  )
}

