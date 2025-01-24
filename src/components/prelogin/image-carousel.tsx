"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"

const images = [
  {
    src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/egypt2.jpg-YxNs3pae8fZhVDvzCpht3uhMX5qgGV.jpeg",
    title: "Ancient Egypt",
    description:
      "Home to one of the world's earliest and longest-lasting civilizations, featuring the Great Pyramids and the Sphinx.",
  },
  {
    src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/india1.jpg-QbBO78mKkoFTAlOR6BJE4ec59CVWyU.jpeg",
    title: "Classical India",
    description:
      "Rich in architectural marvels, showcasing intricate designs and cultural heritage spanning millennia.",
  },
  {
    src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/hero.jpg-K7cTiFOgzTenXr8O5bN1KffvbLgzyz.jpeg",
    title: "Renaissance Era",
    description:
      "A period of cultural rebirth and scientific revolution, marked by advances in art, philosophy, and science.",
  },
]

export function ImageCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length)
    }, 5000) // Change slide every 5 seconds

    return () => clearInterval(timer)
  }, [])

  return (
    <div className="relative h-screen w-full overflow-hidden">
      <AnimatePresence initial={false}>
        <motion.div
          key={currentIndex}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1 }}
          className="absolute inset-0"
        >
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url(${images[currentIndex].src})` }}
          >
            <div className="absolute inset-0 bg-black/40" /> {/* Dark overlay */}
          </div>
          <div className="absolute inset-0 flex flex-col items-center justify-center px-4 text-center">
            <div
              className="max-w-4xl w-full p-12 bg-contain bg-center bg-no-repeat"
              style={{
                backgroundImage: `url('https://hebbkx1anhila5yf.public.blob.vercel-storage.com/paper2-0NCmiEOzxUw0thiCbocrNB1sPlt8Wu.png')`,
                backgroundSize: "100% 100%",
              }}
            >
              <motion.h2
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="text-3xl md:text-5xl font-bold mb-4 text-[#2C1810]"
              >
                {images[currentIndex].title}
              </motion.h2>
              <motion.p
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.7 }}
                className="text-lg md:text-xl text-[#8B4513]"
              >
                {images[currentIndex].description}
              </motion.p>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  )
}

