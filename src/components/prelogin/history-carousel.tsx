"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"

const facts = [
  {
    title: "Ancient Egypt",
    content: "The Great Pyramid of Giza was the tallest man-made structure for over 3,800 years.",
  },
  {
    title: "Medieval Innovation",
    content: "The mechanical clock was invented in medieval Europe, revolutionizing time-keeping.",
  },
  {
    title: "Renaissance Art",
    content: "Leonardo da Vinci spent 12 years painting the Mona Lisa's lips.",
  },
]

export function HistoryCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % facts.length)
    }, 5000)
    return () => clearInterval(timer)
  }, [])

  return (
    <Card className="border-[#D4AF37] bg-[#FFF8DC] overflow-hidden">
      <CardContent className="p-6">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
            className="h-[400px] flex flex-col justify-center"
          >
            <h3 className="text-2xl font-bold text-[#2C1810] mb-4">{facts[currentIndex].title}</h3>
            <p className="text-lg text-[#8B4513]">{facts[currentIndex].content}</p>
          </motion.div>
        </AnimatePresence>
      </CardContent>
    </Card>
  )
}

