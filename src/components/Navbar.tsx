"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Menu } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import Image from "next/image"

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <header
      className={`fixed w-full z-50 transition-colors duration-300 ${isScrolled ? "bg-[#2C1810]" : "bg-transparent"}`}
    >
      <div className="container mx-auto flex justify-between items-center p-4">
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon" className="text-[#F5E6D3]">
              <Menu className="h-6 w-6" />
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="bg-[#2C1810] text-[#F5E6D3] border-[#8B4513]">
            <nav className="flex flex-col space-y-4 mt-8">
              <Link href="#" className="hover:text-[#D4AF37] transition-colors text-lg">
                Home
              </Link>
              <Link href="#" className="hover:text-[#D4AF37] transition-colors text-lg">
                Eras
              </Link>
              <Link href="#" className="hover:text-[#D4AF37] transition-colors text-lg">
                Articles
              </Link>
              <Link href="#" className="hover:text-[#D4AF37] transition-colors text-lg">
                About
              </Link>
            </nav>
          </SheetContent>
        </Sheet>

        <h1 className="text-2xl font-bold text-[#F5E6D3]">Chronos Chronicles</h1>

        <div className="inline-block relative">
          <Image
            src="/paper2.png"
            alt="Button background"
            width={120}
            height={50}
            className="w-auto h-[50px]"
          />
          <button className="absolute inset-0 flex items-center justify-center font-bold text-[#2C1810] hover:text-[#8B4513] transition-colors">
            Sign Up
          </button>
        </div>
      </div>
    </header>
  )
}
