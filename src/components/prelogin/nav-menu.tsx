"use client"

import { Menu, Search, User, Scroll, MessageSquare } from "lucide-react"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Button } from "@/components/ui/button"
import { useState, useEffect } from "react"
import { cn } from "@/lib/utils"
import Link from "next/link"

export function NavMenu() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isSearchOpen, setIsSearchOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-500",
        isScrolled ? "bg-[#2C1810]/95 backdrop-blur-sm border-b border-[#8B4513]" : "bg-transparent",
      )}
    >
      <div className="container mx-auto flex justify-between items-center p-4">
        <Sheet>
          <SheetTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className={cn(
                "relative overflow-hidden transition-all duration-300",
                isScrolled
                  ? "bg-[#8B4513]/20 hover:bg-[#8B4513]/40 text-[#F5E6D3]"
                  : "bg-[#2C1810]/80 hover:bg-[#8B4513] text-[#F5E6D3]",
                "border border-[#8B4513]/50 hover:border-[#D4AF37]",
              )}
            >
              <Menu className="h-6 w-6" />
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="bg-[#FFF8DC]/95 backdrop-blur-md border-r border-[#8B4513] w-80">
            <div className="flex items-center gap-2 mb-8">
              <Scroll className="h-6 w-6 text-[#8B4513]" />
              <h2 className="text-2xl font-cinzel font-bold text-[#2C1810]">Navigation</h2>
            </div>
            <nav className="flex flex-col gap-2">
              {[
                { href: "/", label: "Home" },
                { href: "/postlogin/timeline", label: "Timeline" },
                { href: "/postlogin/map", label: "Naksha" },
                { href: "/postlogin/theme", label: "Thematic Time Travel" },
                { href: "/postlogin/storyTelling", label: "Listen to A Story" },
                { href: "/postlogin/game", label: "Play a Game" },
                { href: "/postlogin/forum", label: "Forum", icon: MessageSquare },
                { href: "/postlogin/dashboard", label: "Dashboard" },
                { href: "#", label: "About" },
                { href: "#", label: "Gallery" },
                { href: "#", label: "Contact" },
              ].map((item) => (
                <Link
                  key={item.label}
                  href={item.href}
                  className={cn(
                    "relative px-4 py-3 text-lg font-cinzel text-[#2C1810]",
                    "hover:bg-[#8B4513]/10 rounded-md transition-all duration-300",
                    "after:absolute after:bottom-0 after:left-4 after:right-4",
                    "after:h-px after:bg-[#8B4513]/30",
                    "hover:after:bg-[#8B4513]",
                    "after:transition-all after:duration-300",
                  )}
                >
                  {item.icon && <item.icon className="inline-block mr-2 h-5 w-5" />}
                  {item.label}
                </Link>
              ))}
            </nav>
          </SheetContent>
        </Sheet>

        <h1
          className={cn(
            "text-3xl font-cinzel font-bold tracking-widest",
            "transition-all duration-500",
            isScrolled ? "text-[#F5E6D3]" : "text-[#2C1810]",
            "before:content-[''] before:absolute before:-bottom-2 before:left-0",
            "before:w-full before:h-px before:bg-current before:scale-x-0",
            "before:transition-transform before:duration-500",
            "hover:before:scale-x-100",
          )}
        >
          YUG SMRITI
        </h1>

        <div className="flex items-center gap-4">
          <div className="relative">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsSearchOpen(!isSearchOpen)}
              className={cn(
                "relative overflow-hidden transition-all duration-300",
                isScrolled
                  ? "bg-[#8B4513]/20 hover:bg-[#8B4513]/40 text-[#F5E6D3]"
                  : "bg-[#2C1810]/80 hover:bg-[#8B4513] text-[#F5E6D3]",
                "border border-[#8B4513]/50 hover:border-[#D4AF37]",
              )}
            >
              <Search className="h-5 w-5" />
            </Button>
            <div
              className={cn(
                "absolute right-0 top-full mt-4 w-72 origin-top-right",
                "transform transition-all duration-300",
                isSearchOpen ? "scale-100 opacity-100" : "scale-95 opacity-0 pointer-events-none",
              )}
            >
              <div className="relative">
                <input
                  type="search"
                  placeholder="Search through time..."
                  className={cn(
                    "w-full rounded-md border border-[#8B4513] px-4 py-3",
                    "bg-[#FFF8DC]/95 backdrop-blur-sm",
                    "text-[#2C1810] placeholder-[#8B4513]/50",
                    "focus:outline-none focus:ring-2 focus:ring-[#D4AF37]",
                    "font-cinzel",
                  )}
                />
                <Search className="absolute right-3 top-1/2 -translate-y-1/2 h-5 w-5 text-[#8B4513]/50" />
              </div>
            </div>
          </div>
          <Link href="/dashboard">
            <Button
              variant="ghost"
              size="icon"
              className={cn(
                "relative overflow-hidden transition-all duration-300",
                isScrolled
                  ? "bg-[#8B4513]/20 hover:bg-[#8B4513]/40 text-[#F5E6D3]"
                  : "bg-[#2C1810]/80 hover:bg-[#8B4513] text-[#F5E6D3]",
                "border border-[#8B4513]/50 hover:border-[#D4AF37]",
              )}
            >
              <User className="h-5 w-5" />
            </Button>
          </Link>
        </div>
      </div>
    </header>
  )
}

