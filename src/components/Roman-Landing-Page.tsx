"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { Clock, Scroll, Sword, ChurchIcon as Temple } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

export default function RomanLandingPage() {
  const [currentYear, setCurrentYear] = useState(-27)
  const [showTooltip, setShowTooltip] = useState(false)

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentYear((prevYear) => (prevYear + 1) % 477)
    }, 1000)
    return () => clearInterval(interval)
  }, [])

  const getEra = (year: number) => {
    if (year <= 0) return "Late Republic"
    if (year <= 180) return "Pax Romana"
    if (year <= 284) return "Third Century Crisis"
    return "Late Empire"
  }

  return (
    <div className="flex flex-col min-h-screen bg-[url('/placeholder.svg?height=2000&width=3000')] bg-cover bg-center">
      <header className="px-4 lg:px-6 h-14 flex items-center bg-stone-800 text-stone-100">
        <Link className="flex items-center justify-center" href="#">
          <Clock className="h-6 w-6 mr-2" />
          <span className="font-bold font-serif">Tempus Romanum</span>
        </Link>
        <nav className="ml-auto flex gap-4 sm:gap-6">
          <Link className="text-sm font-medium hover:underline underline-offset-4" href="#features">
            Features
          </Link>
          <Link className="text-sm font-medium hover:underline underline-offset-4" href="#explore">
            Explore
          </Link>
          <Link className="text-sm font-medium hover:underline underline-offset-4" href="#artifacts">
            Artifacts
          </Link>
        </nav>
      </header>
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48 text-stone-100">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center space-y-4 text-center">
              <div className="space-y-2">
                <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl/none font-serif">
                  Experience the Glory of Rome
                </h1>
                <p className="mx-auto max-w-[700px] text-stone-200 md:text-xl italic">
                  "Veni, Vidi, Vici" - Julius Caesar
                </p>
              </div>
              <div className="space-y-2">
                <p className="text-2xl font-bold">
                  Current Year: {currentYear > 0 ? `${currentYear} AD` : `${Math.abs(currentYear)} BC`}
                </p>
                <p className="text-xl">Era: {getEra(currentYear)}</p>
              </div>
              <div className="space-x-4">
                <Button variant="outline" className="bg-stone-700 text-stone-100 hover:bg-stone-600">
                  Begin Your Journey
                </Button>
                <Button variant="outline" className="bg-stone-700 text-stone-100 hover:bg-stone-600">
                  Discover More
                </Button>
              </div>
            </div>
          </div>
        </section>
        <section id="features" className="w-full py-12 md:py-24 lg:py-32 bg-stone-100">
          <div className="container px-4 md:px-6">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-center mb-8 font-serif">
              Key Features
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <Card className="bg-stone-200">
                <CardContent className="flex flex-col items-center space-y-2 p-6">
                  <Temple className="w-12 h-12 text-stone-700" />
                  <h3 className="text-xl font-bold font-serif">Virtual Tours</h3>
                  <p className="text-center text-stone-600">
                    Explore ancient Roman cities and monuments in stunning 3D detail.
                  </p>
                </CardContent>
              </Card>
              <Card className="bg-stone-200">
                <CardContent className="flex flex-col items-center space-y-2 p-6">
                  <Scroll className="w-12 h-12 text-stone-700" />
                  <h3 className="text-xl font-bold font-serif">Interactive Timeline</h3>
                  <p className="text-center text-stone-600">
                    Navigate through key events of Roman history with our dynamic timeline.
                  </p>
                </CardContent>
              </Card>
              <Card className="bg-stone-200">
                <CardContent className="flex flex-col items-center space-y-2 p-6">
                  <Sword className="w-12 h-12 text-stone-700" />
                  <h3 className="text-xl font-bold font-serif">Battle Simulations</h3>
                  <p className="text-center text-stone-600">
                    Experience famous Roman battles through interactive simulations.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
        <section id="explore" className="w-full py-12 md:py-24 lg:py-32 bg-stone-800 text-stone-100">
          <div className="container px-4 md:px-6">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-center mb-8 font-serif">
              Explore Roman Life
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button variant="outline" className="w-full h-24 text-lg font-serif">
                      Senate
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Explore the political heart of Rome</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button variant="outline" className="w-full h-24 text-lg font-serif">
                      Colosseum
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Witness gladiatorial combat</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button variant="outline" className="w-full h-24 text-lg font-serif">
                      Forum
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Experience daily life in ancient Rome</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button variant="outline" className="w-full h-24 text-lg font-serif">
                      Baths
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Relax in luxurious Roman baths</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
          </div>
        </section>
        <section id="artifacts" className="w-full py-12 md:py-24 lg:py-32 bg-stone-100">
          <div className="container px-4 md:px-6">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-center mb-8 font-serif">
              Interactive Artifacts
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card className="bg-stone-200">
                <CardContent className="p-6">
                  <Image
                    src="/placeholder.svg?height=300&width=300"
                    alt="Roman Coin"
                    width={300}
                    height={300}
                    className="rounded-lg mb-4"
                  />
                  <h3 className="text-xl font-bold mb-2 font-serif">Roman Coin</h3>
                  <p className="text-stone-600 mb-4">Examine detailed 3D models of Roman coins.</p>
                  <Button variant="outline" className="w-full bg-stone-700 text-stone-100 hover:bg-stone-600">
                    Inspect
                  </Button>
                </CardContent>
              </Card>
              <Card className="bg-stone-200">
                <CardContent className="p-6">
                  <Image
                    src="/placeholder.svg?height=300&width=300"
                    alt="Legionnaire Armor"
                    width={300}
                    height={300}
                    className="rounded-lg mb-4"
                  />
                  <h3 className="text-xl font-bold mb-2 font-serif">Legionnaire Armor</h3>
                  <p className="text-stone-600 mb-4">Explore the equipment of a Roman soldier.</p>
                  <Button variant="outline" className="w-full bg-stone-700 text-stone-100 hover:bg-stone-600">
                    Try On
                  </Button>
                </CardContent>
              </Card>
              <Card className="bg-stone-200">
                <CardContent className="p-6">
                  <Image
                    src="/placeholder.svg?height=300&width=300"
                    alt="Ancient Scroll"
                    width={300}
                    height={300}
                    className="rounded-lg mb-4"
                  />
                  <h3 className="text-xl font-bold mb-2 font-serif">Ancient Scroll</h3>
                  <p className="text-stone-600 mb-4">Decipher and translate Roman texts.</p>
                  <Button variant="outline" className="w-full bg-stone-700 text-stone-100 hover:bg-stone-600">
                    Translate
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
      </main>
      <footer className="flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t bg-stone-800 text-stone-100">
        <p className="text-xs text-stone-400">© 2024 Tempus Romanum. All rights reserved.</p>
        <nav className="sm:ml-auto flex gap-4 sm:gap-6">
          <Link className="text-xs hover:underline underline-offset-4" href="#">
            Terms of Service
          </Link>
          <Link className="text-xs hover:underline underline-offset-4" href="#">
            Privacy
          </Link>
        </nav>
      </footer>
    </div>
  )
}

