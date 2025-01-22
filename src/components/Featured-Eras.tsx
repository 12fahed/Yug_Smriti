"use client"

import { useEffect, useRef } from "react"
import Image from "next/image"
import Link from "next/link"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

gsap.registerPlugin(ScrollTrigger)

const eras = [
  {
    title: "Ancient Civilizations",
    description: "Discover the wonders of early human societies and their lasting impact.",
    image: "/placeholder.svg",
  },
  {
    title: "Medieval Times",
    description: "Explore the age of knights, castles, and feudal systems in Europe.",
    image: "/placeholder.svg",
  },
  {
    title: "Renaissance",
    description: "Witness the rebirth of art, culture, and scientific discovery in Europe.",
    image: "/placeholder.svg",
  },
  {
    title: "Industrial Revolution",
    description: "Experience the rapid technological and societal changes of the 18th and 19th centuries.",
    image: "/placeholder.svg",
  },
  {
    title: "Modern Era",
    description: "Analyze the complex global events and innovations shaping our world today.",
    image: "/placeholder.svg",
  },
]

export function FeaturedEras() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const triggerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const section = sectionRef.current
    const container = containerRef.current
    const trigger = triggerRef.current

    if (!section || !container || !trigger) return

    // Calculate the total scroll distance needed
    const totalWidth = container.scrollWidth
    const windowWidth = window.innerWidth
    const scrollDistance = totalWidth - windowWidth

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: trigger,
        start: "top top",
        end: `+=${scrollDistance + windowWidth}`,
        pin: true,
        anticipatePin: 1,
        scrub: 1,
        invalidateOnRefresh: true,
      },
    })

    tl.to(container, {
      x: -scrollDistance,
      ease: "none",
    })

    return () => {
      tl.kill()
    }
  }, [])

  return (
    <section
      ref={triggerRef}
      className="overflow-hidden relative"
      style={{
        backgroundImage: `url('/paper2.png')`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundAttachment: "fixed",
      }}
    >
      <div className="absolute inset-0 bg-[#2C1810]/10" />
      <div ref={sectionRef} className="h-screen relative">
        <div ref={containerRef} className="absolute top-1/2 -translate-y-1/2 flex gap-8 px-8">
          {eras.map((era, index) => (
            <div key={index} className="w-[600px] flex-shrink-0">
              <div
                className="bg-[#FFF8DC]/90 backdrop-blur-sm p-6 rounded-b-lg border border-[#8B4513] text-[#2C1810] overflow-hidden"
                style={{
                  borderTopLeftRadius: "300px",
                  borderTopRightRadius: "300px",
                }}
              >
                <Image
                  src={era.image || "/placeholder.svg"}
                  alt={era.title}
                  width={600}
                  height={400}
                  className="w-full h-60 object-cover mb-4 rounded-t-[300px]"
                />
                <h4 className="text-2xl font-semibold mb-4 text-center">{era.title}</h4>
                <p className="mb-6 text-lg text-center">{era.description}</p>
                <div className="text-center">
                  <Link
                    href="#"
                    className="text-[#8B4513] hover:text-[#D4AF37] transition-colors inline-flex items-center text-lg"
                  >
                    Learn more →
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

