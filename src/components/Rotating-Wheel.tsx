"use client"

import { useEffect, useRef } from "react"
import Image from "next/image"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

gsap.registerPlugin(ScrollTrigger)

export function RotatingWheel() {
  const wheelRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const wheel = wheelRef.current

    if (wheel) {
      gsap.to(wheel, {
        rotation: 360,
        ease: "none",
        scrollTrigger: {
          trigger: "body",
          start: "top top",
          end: "bottom bottom",
          scrub: 0.5,
        },
      })
    }
  }, [])

  return (
    <div ref={wheelRef} className="fixed left-[-150px] bottom-[-150px] w-[400px] h-[400px] z-40 pointer-events-none">
      <Image
        src="/wheel.png"
        alt="Decorative wooden wheel"
        width={400}
        height={400}
        className="w-full h-full"
      />
    </div>
  )
}

