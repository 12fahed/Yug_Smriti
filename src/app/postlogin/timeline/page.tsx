"use client"

import { useRef } from "react"
import { NavMenu } from "@/components/prelogin/nav-menu"
import { motion, useScroll } from "framer-motion"

const timelineData = [
  {
    year: "3000 BCE",
    title: "Rise of Egyptian Civilization",
    description: "The unification of Upper and Lower Egypt marks the beginning of the Early Dynastic Period.",
    image: "https://images.pexels.com/photos/30282077/pexels-photo-30282077/free-photo-of-ancient-egyptian-sphinx-statue-close-up-view.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
  },
  {
    year: "2700 BCE",
    title: "Great Pyramids Construction",
    description: "The construction of the Great Pyramids of Giza begins, showcasing advanced architectural knowledge.",
    image: "https://plus.unsplash.com/premium_photo-1694475180783-687c2ffcd17e?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    year: "1200 BCE",
    title: "Trojan War",
    description: "The legendary Trojan War occurs, later immortalized in Homer's Iliad and Odyssey.",
    image: "https://images.pexels.com/photos/12646217/pexels-photo-12646217.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
  },
  {
    year: "500 BCE",
    title: "Golden Age of Greece",
    description: "Athens enters its Golden Age, marked by advances in philosophy, art, and democracy.",
    image: "https://images.pexels.com/photos/164336/pexels-photo-164336.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
  },
  {
    year: "27 BCE",
    title: "Roman Empire Begins",
    description: "Octavian becomes Augustus, the first Roman Emperor, beginning the Roman Empire.",
    image: "https://images.pexels.com/photos/851646/pexels-photo-851646.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
  },
  {
    year: "476 CE",
    title: "Fall of Rome",
    description: "The Western Roman Empire falls, marking the end of ancient classical civilization.",
    image: "https://images.pexels.com/photos/1797161/pexels-photo-1797161.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
  },
]

export default function TimelinePage() {
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  })

  return (
    <div
      className="min-h-screen bg-[#F5E6D3]"
    >
      <NavMenu />
      <div className="container mx-auto px-4 py-20">
        <div className="relative mb-12">
          <div
            className="w-full h-72 bg-contain bg-center bg-no-repeat flex items-center justify-center"
            style={{
              backgroundImage: `url('https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Untitled_design__8_-removebg-preview-q1hHqEx7rrGol2No6FRdfG1t0gRyJu.png')`,
            }}
          >
            <div>
              <h1 className="text-4xl font-bold text-[#2C1810] text-center">Historical Timeline</h1>
              <p className="text-center text-[#8B4513]">Journey through the ages of human civilization</p>
            </div>
          </div>
        </div>

        <div ref={containerRef} className="relative">
          {/* Vertical line with scroll progress */}
          <motion.div
            className="absolute left-1/2 h-full w-[2px] bg-[#D4AF37]"
            style={{
              scaleY: scrollYProgress,
              transformOrigin: "top",
            }}
          />

          <div className="space-y-24">
            {timelineData.map((item, idx) => (
              <div key={item.year} className="relative">
                <motion.div
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  transition={{ duration: 1 }}
                  viewport={{ once: true, margin: "-100px" }}
                  className={`flex items-center justify-between gap-8 ${
                    idx % 2 === 0 ? "flex-row" : "flex-row-reverse"
                  }`}
                >
                  {/* Content */}
                  <div className="w-1/2">
                    <div className="bg-white/80 backdrop-blur-sm p-8 rounded-lg shadow-xl hover:shadow-2xl transition-all duration-300">
                      <div className="text-5xl font-bold text-[#D4AF37] mb-4">{item.year}</div>
                      <h3 className="text-2xl font-semibold text-[#2C1810] mb-2">{item.title}</h3>
                      <p className="text-[#8B4513]">{item.description}</p>
                      <img
                        src={item.image || "/placeholder.svg"}
                        alt={item.title}
                        className="w-full h-48 object-cover rounded-lg mt-4"
                      />
                    </div>
                  </div>

                  {/* Center Point */}
                  <div className="absolute left-1/2 -translate-x-1/2 w-5 h-5">
                    <motion.div
                      initial={{ scale: 0 }}
                      whileInView={{ scale: 1 }}
                      viewport={{ once: true }}
                      className="w-full h-full bg-[#D4AF37] rounded-full"
                    />
                  </div>

                  {/* Empty space for the other side */}
                  <div className="w-1/2" />
                </motion.div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

