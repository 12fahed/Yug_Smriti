"use client"

import { useState } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

interface ActivityData {
  date: string
  count: number
}

interface HistoricalCalendarProps {
  activityData: ActivityData[]
}

export function HistoricalCalendar({ activityData }: HistoricalCalendarProps) {
  const [currentMonth, setCurrentMonth] = useState(new Date())

  const daysInMonth = new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 0).getDate()
  const firstDayOfMonth = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), 1).getDay()

  const prevMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1))
  }

  const nextMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1))
  }

  const getActivityForDate = (date: Date) => {
    const dateString = date.toISOString().split("T")[0]
    return activityData.find((activity) => activity.date === dateString)
  }

  return (
    <div className="bg-[#FFF8DC]/80 border-2 border-[#8B4513] rounded-lg p-4">
      <div className="flex justify-between items-center mb-4">
        <Button onClick={prevMonth} variant="ghost" size="sm" className="text-[#8B4513]">
          <ChevronLeft className="h-4 w-4" />
        </Button>
        <h2 className="text-lg font-bold text-[#2C1810]">
          {currentMonth.toLocaleString("default", { month: "long", year: "numeric" })}
        </h2>
        <Button onClick={nextMonth} variant="ghost" size="sm" className="text-[#8B4513]">
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>
      <div className="grid grid-cols-7 gap-2 text-center">
        {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
          <div key={day} className="text-xs font-medium text-[#8B4513]">
            {day}
          </div>
        ))}
        {Array.from({ length: firstDayOfMonth }).map((_, index) => (
          <div key={`empty-${index}`} className="h-8" />
        ))}
        {Array.from({ length: daysInMonth }).map((_, index) => {
          const date = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), index + 1)
          const activity = getActivityForDate(date)
          return (
            <div
              key={index}
              className={cn(
                "h-8 flex items-center justify-center rounded-full text-xs font-medium",
                activity ? "bg-[#8B4513] text-[#FFF8DC]" : "bg-[#F5E6D3] text-[#2C1810]",
                "hover:bg-[#D4AF37] hover:text-[#2C1810] transition-colors",
              )}
            >
              {index + 1}
            </div>
          )
        })}
      </div>
    </div>
  )
}

