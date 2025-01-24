"use client"

import { motion } from "framer-motion"
import { useRouter } from "next/navigation"

export default function GameSelection() {
  const router = useRouter()

  return (
    <div
      className="min-h-screen p-8 flex flex-col items-center justify-center"
      style={{
        backgroundImage: `url('https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Untitled%20design-l9dlUJFvJh0w5Yc3f9XOeuPfxYAJw8.png')`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <div className="w-full max-w-6xl">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold font-serif text-[#2C1810] mb-4">Choose Your Adventure</h1>
          <p className="text-xl font-serif text-[#8B4513]">Select a game category to begin your journey</p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          <motion.div
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
            className="cursor-pointer"
            onClick={() => router.push("/rpg-game")}
          >
            <div
              className="relative min-h-[400px] w-[500px] p-6 rounded-lg shadow-lg"
              style={{
                backgroundImage: `url('https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Untitled%20design%20(9).jpg-Vqo2LXOSa4PRa68DRNEAaCQgMIJFnC.jpeg')`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",
              }}
            >
              <div className="absolute inset-0 flex flex-col justify-center px-12 py-6">
                <h2 className="text-4xl font-serif text-[#2C1810] mb-6 text-center">RPG Games</h2>
                <p className="font-serif text-[#2C1810] leading-relaxed text-center text-xl">
                  Embark on epic historical journeys through time. Take on the roles of legendary figures who shaped the
                  course of history. Make crucial decisions that will determine the fate of nations and experience the
                  weight of leadership in these immersive role-playing adventures.
                </p>
              </div>
            </div>
          </motion.div>

          <motion.div
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
            className="cursor-pointer"
            onClick={() => router.push("/other-games")}
          >
            <div
              className="relative min-h-[400px] w-[500px] p-6 rounded-lg shadow-lg"
              style={{
                backgroundImage: `url('https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Untitled%20design%20(9).jpg-Vqo2LXOSa4PRa68DRNEAaCQgMIJFnC.jpeg')`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",
              }}
            >
              <div className="absolute inset-0 flex flex-col justify-center px-12 py-6">
                <h2 className="text-4xl font-serif text-[#2C1810] mb-6 text-center">Other Games</h2>
                <p className="font-serif text-[#2C1810] leading-relaxed text-center text-xl">
                  Discover a diverse collection of historical challenges and puzzles. From strategic battles to
                  diplomatic negotiations, these games offer unique perspectives on historical events.
                </p>
              </div>
            </div>
          </motion.div>
        </div>

        <div className="mt-12 text-center">
          <p className="text-[#2C1810] text-xl font-serif italic">
            "Gaming is not just about entertainment, it's about experiencing history."
          </p>
        </div>
      </div>
    </div>
  )
}

