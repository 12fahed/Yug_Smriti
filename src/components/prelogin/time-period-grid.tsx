import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"

const timePeriods = [
  {
    id: "ancient",
    title: "Ancient Era",
    description: "Explore civilizations from prehistory to 476 CE",
    image: "/placeholder.svg?height=400&width=600",
  },
  {
    id: "medieval",
    title: "Medieval Era",
    description: "Journey through the Middle Ages (476-1450 CE)",
    image: "/placeholder.svg?height=400&width=600",
  },
  {
    id: "modern",
    title: "Modern Era",
    description: "Discover the modern world (1450 CE-Present)",
    image: "/placeholder.svg?height=400&width=600",
  },
]

export function TimePeriodGrid() {
  return (
    <div className="grid grid-cols-3 gap-6">
      {timePeriods.map((period) => (
        <Link key={period.id} href={`/era/${period.id}`}>
          <Card className="group hover:shadow-xl transition-all duration-300 border-[#D4AF37] bg-[#FFF8DC]">
            <CardContent className="p-6">
              <div className="aspect-video mb-4 overflow-hidden rounded-lg">
                <img
                  src={period.image || "/placeholder.svg"}
                  alt={period.title}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
              </div>
              <h2 className="text-2xl font-bold text-[#2C1810] mb-2">{period.title}</h2>
              <p className="text-[#8B4513]">{period.description}</p>
            </CardContent>
          </Card>
        </Link>
      ))}
    </div>
  )
}

