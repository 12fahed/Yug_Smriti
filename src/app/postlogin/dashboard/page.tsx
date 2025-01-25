"use client"

import { Calendar, Trophy, Award, Brain, Target } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { NavMenu } from "@/components/prelogin/nav-menu"
import { HistoricalCalendar } from "@/components/historical-calendar"
// import { HistoricalBadges } from "@/components/historical-badges"
import CoinsPage from "@/pages/coins"

// Mock data remains the same
const userData = {
  name: "History Explorer",
  level: 15,
  totalPoints: 2750,
  quizzesTaken: 47,
  accuracy: 78,
  recentActivity: [
    { date: "2024-01-22", quiz: "Ancient Egypt", score: 9, total: 10 },
    { date: "2024-01-21", quiz: "Roman Empire", score: 8, total: 10 },
    { date: "2024-01-19", quiz: "Medieval Knights", score: 7, total: 10 },
  ],
  achievements: [
    { name: "Ancient Master", description: "Complete all Ancient Era quizzes", progress: 80 },
    { name: "Medieval Scholar", description: "Score 90% in Medieval quizzes", progress: 65 },
    { name: "Modern Expert", description: "Win 10 Modern Era challenges", progress: 45 },
  ],
  activityHeatmap: [
    { date: "2024-01-22", count: 3 },
    { date: "2024-01-21", count: 2 },
    { date: "2024-01-19", count: 4 },
    { date: "2024-01-17", count: 1 },
    { date: "2024-01-15", count: 3 },
  ],
}

export default function DashboardPage() {
  return (
    <div
      className="min-h-screen bg-[#D6C08F]"
      style={{
        fontFamily: "Cinzel, serif",
        backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='4' height='4' viewBox='0 0 4 4'%3E%3Cpath fill='%23B39B68' fill-opacity='0.4' d='M1 3h1v1H1V3zm2-2h1v1H3V1z'%3E%3C/path%3E%3C/svg%3E")`,
      }}
    >
      <NavMenu />
      <main className="container mx-auto px-4 pt-24 pb-8 max-w-5xl">
        <h1 className="text-4xl font-bold mb-8 text-[#2C1810] text-center tracking-wide">
          Chronicles of {userData.name}
        </h1>
        <div className="space-y-8">
          {/* Player Stats */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <Card className="bg-[#FFF8DC]/90 backdrop-blur-sm border-2 border-[#8B4513] shadow-lg transform hover:scale-105 transition-transform">
              <CardContent className="p-4 flex flex-col items-center justify-center">
                <Trophy className="h-8 w-8 mb-2 text-[#8B4513]" />
                <p className="text-xs font-medium text-[#2C1810] uppercase tracking-wider">Level</p>
                <p className="text-2xl font-bold text-[#8B4513]">{userData.level}</p>
              </CardContent>
            </Card>
            <Card className="bg-[#FFF8DC]/90 backdrop-blur-sm border-2 border-[#8B4513] shadow-lg transform hover:scale-105 transition-transform">
              <CardContent className="p-4 flex flex-col items-center justify-center">
                <Target className="h-8 w-8 mb-2 text-[#8B4513]" />
                <p className="text-xs font-medium text-[#2C1810] uppercase tracking-wider">Points</p>
                <p className="text-2xl font-bold text-[#8B4513]">{userData.totalPoints}</p>
              </CardContent>
            </Card>
            <Card className="bg-[#FFF8DC]/90 backdrop-blur-sm border-2 border-[#8B4513] shadow-lg transform hover:scale-105 transition-transform">
              <CardContent className="p-4 flex flex-col items-center justify-center">
                <Brain className="h-8 w-8 mb-2 text-[#8B4513]" />
                <p className="text-xs font-medium text-[#2C1810] uppercase tracking-wider">Quizzes</p>
                <p className="text-2xl font-bold text-[#8B4513]">{userData.quizzesTaken}</p>
              </CardContent>
            </Card>
            <Card className="bg-[#FFF8DC]/90 backdrop-blur-sm border-2 border-[#8B4513] shadow-lg transform hover:scale-105 transition-transform">
              <CardContent className="p-4 flex flex-col items-center justify-center">
                <Award className="h-8 w-8 mb-2 text-[#8B4513]" />
                <p className="text-xs font-medium text-[#2C1810] uppercase tracking-wider">Accuracy</p>
                <p className="text-2xl font-bold text-[#8B4513]">{userData.accuracy}%</p>
              </CardContent>
            </Card>
          </div>

          {/* Historical Badges */}
          <Card className="bg-[#FFF8DC]/90 backdrop-blur-sm border-2 border-[#8B4513] shadow-lg">
            <CardHeader>
              <CardTitle className="text-xl text-[#2C1810] text-center uppercase tracking-widest">
                Historical Badges
              </CardTitle>
            </CardHeader>
            <CardContent>
              {/* <HistoricalBadges userPoints={userData.totalPoints} /> */}
              <CoinsPage />

            </CardContent>
          </Card>

          {/* Recent Activity */}
          <Card className="bg-[#FFF8DC]/90 backdrop-blur-sm border-2 border-[#8B4513] shadow-lg">
            <CardHeader>
              <CardTitle className="text-xl text-[#2C1810] text-center uppercase tracking-widest">
                Recent Conquests
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {userData.recentActivity.map((activity, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-3 rounded-lg bg-[#F5E6D3]/70 border border-[#8B4513] hover:bg-[#F5E6D3] transition-colors"
                  >
                    <div>
                      <p className="font-medium text-[#2C1810] text-sm">{activity.quiz}</p>
                      <p className="text-xs text-[#8B4513] font-serif">{activity.date}</p>
                    </div>
                    <div className="text-lg font-bold px-3 py-1 rounded bg-[#8B4513]/10 text-[#8B4513] border border-[#8B4513]">
                      {activity.score}/{activity.total}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Achievements */}
          <Card className="bg-[#FFF8DC]/90 backdrop-blur-sm border-2 border-[#8B4513] shadow-lg">
            <CardHeader>
              <CardTitle className="text-xl text-[#2C1810] text-center uppercase tracking-widest">
                Scrolls of Achievement
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {userData.achievements.map((achievement, index) => (
                <div
                  key={index}
                  className="space-y-2 p-3 border border-[#8B4513]/30 rounded-lg hover:bg-[#F5E6D3]/50 transition-colors"
                >
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="font-medium text-[#2C1810] text-sm">{achievement.name}</p>
                      <p className="text-xs text-[#8B4513] font-serif">{achievement.description}</p>
                    </div>
                    <span className="text-[#8B4513] text-sm font-bold">{achievement.progress}%</span>
                  </div>
                  <Progress
                    value={achievement.progress}
                    className="h-2 bg-[#F5E6D3]"
                    style={{
                      backgroundImage: "linear-gradient(to right, #8B4513, #D4AF37)",
                      backgroundSize: `${achievement.progress}% 100%`,
                      backgroundRepeat: "no-repeat",
                    }}
                  />
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Historical Timeline */}
          <Card className="bg-[#FFF8DC]/90 backdrop-blur-sm border-2 border-[#8B4513] shadow-lg">
            <CardHeader>
              <CardTitle className="text-xl text-[#2C1810] text-center uppercase tracking-widest">
                Historical Timeline
              </CardTitle>
            </CardHeader>
            <CardContent>
              <HistoricalCalendar activityData={userData.activityHeatmap} />
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  )
}

