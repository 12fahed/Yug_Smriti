import Image from "next/image"
import Link from "next/link"
import { Cinzel } from "next/font/google"
import { Navbar } from "@/components/Navbar"
import { FeaturedEras } from "@/components/Featured-Eras"
import { HistoricalFact } from "@/components/Historical-Facts"
import { Button } from "@/components/ui/button"
import { RotatingWheel } from "@/components/Rotating-Wheel"

const cinzel = Cinzel({ subsets: ["latin"], variable: "--font-cinzel" })

export default function LandingPage() {
  return (
    <div className={`${cinzel.variable} font-sans bg-[#F5E6D3] min-h-screen`}>
      <Navbar />

      <main>
        <section className="relative h-[100vh] flex items-center justify-center">
          <Image
            src="/hero.jpg"
            alt="School of Athens"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-black/50 font-cinzel" />
          <div className="relative container mx-auto px-4 text-center text-[#F5E6D3]">
            <h2 className="text-5xl font-bold mb-4 shadow-text">Journey Through Time</h2>
            <p className="text-xl mb-8 shadow-text">Explore the fascinating stories of our past</p>
            <div className="inline-block relative">
              <Image
                src="/paper2.png"
                alt="Button background"
                width={200}
                height={80}
                className="w-auto h-[80px]"
              />
              <button className="absolute inset-0 flex items-center justify-center text-lg font-bold text-[#2C1810] hover:text-[#8B4513] transition-colors">
                Explore
              </button>
            </div>
          </div>
        </section>

        <FeaturedEras />

        <HistoricalFact />
        <RotatingWheel />
      </main>

      <footer className="bg-[#2C1810] text-[#F5E6D3] py-8 mt-16">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-4 md:mb-0">
              <h4 className="text-xl font-semibold mb-2">Chronos Chronicles</h4>
              <p>Illuminating the past, one story at a time.</p>
            </div>
            <nav>
              <ul className="flex space-x-4">
                <li>
                  <Link href="#" className="hover:text-[#D4AF37] transition-colors">
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-[#D4AF37] transition-colors">
                    Terms of Service
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-[#D4AF37] transition-colors">
                    Contact Us
                  </Link>
                </li>
              </ul>
            </nav>
          </div>
          <div className="mt-8 text-center">
            <p>&copy; {new Date().getFullYear()} Chronos Chronicles. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}

