"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { MenuIcon, Clock, Globe, Home, Book, Users, Info } from "lucide-react"
import Link from "next/link"
import { HistoricalFact } from "@/components/Historical-Facts"
import { ParallaxSection } from "@/components/Parallax-Section"

const historicalPeriods = [
  {
    title: "Ancient Egypt",
    description: "Land of Pharaohs and Pyramids",
    image: "https://images.unsplash.com/photo-1552832230-c0197dd311b5?q=80&w=2000", // Pyramids
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

export default function LandingPage() {
  return (
    <div className="flex flex-col min-h-screen bg-[#F9F7F4]">
      <header className="fixed w-full px-4 lg:px-6 h-16 flex items-center justify-between border-b border-stone-200 bg-[#F9F7F4]/80 backdrop-blur-sm z-50">
        <Sheet open={isOpen} onOpenChange={setIsOpen}>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon">
              <MenuIcon className="h-6 w-6 text-stone-600" />
              <span className="sr-only">Toggle menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-[300px] sm:w-[400px] bg-[#F9F7F4]">
            <nav className="flex flex-col space-y-4 mt-6">
              <Link
                href="#"
                className="flex items-center text-lg font-medium text-stone-600 hover:text-stone-900"
                onClick={() => setIsOpen(false)}
              >
                <Home className="mr-2 h-5 w-5" />
                Home
              </Link>
              <Link
                href="#"
                className="flex items-center text-lg font-medium text-stone-600 hover:text-stone-900"
                onClick={() => setIsOpen(false)}
              >
                <Clock className="mr-2 h-5 w-5" />
                Time Periods
              </Link>
              <Link
                href="#"
                className="flex items-center text-lg font-medium text-stone-600 hover:text-stone-900"
                onClick={() => setIsOpen(false)}
              >
                <Book className="mr-2 h-5 w-5" />
                Historical Events
              </Link>
              <Link
                href="#"
                className="flex items-center text-lg font-medium text-stone-600 hover:text-stone-900"
                onClick={() => setIsOpen(false)}
              >
                <Users className="mr-2 h-5 w-5" />
                Historical Figures
              </Link>
              <Link
                href="#"
                className="flex items-center text-lg font-medium text-stone-600 hover:text-stone-900"
                onClick={() => setIsOpen(false)}
              >
                <Info className="mr-2 h-5 w-5" />
                About
              </Link>
            </nav>
          </SheetContent>
        </Sheet>
        <div className="mx-auto">
          <h1 className="text-xl font-serif text-stone-800 tracking-wide">THE VIRTUAL TIME MACHINE</h1>
          <p className="text-xs text-center text-stone-500 tracking-widest">HISTORICAL EXPLORATION</p>
        </div>
        <Button variant="outline" className="bg-amber-700 text-white hover:bg-amber-800">
          Sign Up
        </Button>
      </header>
      <main className="flex-1">
        {historicalPeriods.map((period, index) => (
          <ParallaxSection key={period.title} period={period} />
        ))}
        <section className="bg-stone-100 py-16">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-serif text-center mb-8">Explore the Past Like Never Before</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center">
                <Globe className="h-12 w-12 mx-auto mb-4 text-amber-700" />
                <h3 className="text-xl font-serif mb-2">Interactive Time Travel</h3>
                <p>Experience history firsthand through our revolutionary virtual reality technology.</p>
              </div>
              <div className="text-center">
                <Book className="h-12 w-12 mx-auto mb-4 text-amber-700" />
                <h3 className="text-xl font-serif mb-2">Historical Accuracy</h3>
                <p>Every detail meticulously researched and recreated by expert historians.</p>
              </div>
              <div className="text-center">
                <Users className="h-12 w-12 mx-auto mb-4 text-amber-700" />
                <h3 className="text-xl font-serif mb-2">Immersive Learning</h3>
                <p>Engage with historical figures and participate in pivotal moments of history.</p>
              </div>
            </div>
          </div>
        </section>
      </main>
      <HistoricalFact />
    </div>
  );
};

export default Home;
