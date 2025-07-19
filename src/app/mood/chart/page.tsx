"use client"

import { Button } from "@/components/ui/button"
import { Loader2, TrendingUp, Calendar, BarChart3 } from "lucide-react"
import { useState, useEffect } from "react"
import { type MoodEntry, type MoodStats, getMoodEntries, getMoodStats } from "../../actions/mood"
import Link from "next/link"
import React from "react"

// Helper function to get mood emoji
const getMoodEmoji = (mood: number) => {
  switch (mood) {
    case 1:
      return "😢"
    case 2:
      return "😔"
    case 3:
      return "😐"
    case 4:
      return "😊"
    case 5:
      return "😄"
    default:
      return "⚪"
  }
}

// Helper function to get mood color
const getMoodColor = (mood: number) => {
  switch (mood) {
    case 1:
      return "#F8B6B6" // pastel red/pink
    case 2:
      return "#F9E2AE" // pastel yellow
    case 3:
      return "#B6E2D3" // pastel green
    case 4:
      return "#B6D0F8" // pastel blue
    case 5:
      return "#E2B6F8" // pastel purple
    default:
      return "#E5E7EB" // gray
  }
}

// Helper function to generate calendar days
const generateCalendarDays = (year: number, month: number) => {
  const firstDay = new Date(year, month, 1)
  const lastDay = new Date(year, month + 1, 0)
  const daysInMonth = lastDay.getDate()
  const startingDayOfWeek = firstDay.getDay()

  const days = []

  // Add empty cells for days before the first day of the month
  for (let i = 0; i < startingDayOfWeek; i++) {
    days.push(null)
  }

  // Add all days of the month
  for (let day = 1; day <= daysInMonth; day++) {
    days.push(day)
  }

  return days
}

export default function MoodChartPage() {
  const [moodEntries, setMoodEntries] = useState<MoodEntry[]>([])
  const [moodStats, setMoodStats] = useState<MoodStats | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth())
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear())

  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ]

  // Load mood data
  useEffect(() => {
    async function loadMoodData() {
      try {
        setIsLoading(true)
        setError(null)

        const [entries, stats] = await Promise.all([getMoodEntries(), getMoodStats()])

        setMoodEntries(entries)
        setMoodStats(stats)
      } catch (err) {
        setError("Unable to load mood data")
        console.error(err)
      } finally {
        setIsLoading(false)
      }
    }

    loadMoodData()
  }, [])

  // Get mood entry for a specific date
  const getMoodForDate = (year: number, month: number, day: number) => {
    const dateString = `${year}-${String(month + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`
    return moodEntries.find((entry) => entry.date === dateString)
  }

  // Generate recent months for navigation
  const getRecentMonths = () => {
    const months = []
    const currentDate = new Date()

    for (let i = 5; i >= 0; i--) {
      const date = new Date(currentDate.getFullYear(), currentDate.getMonth() - i, 1)
      months.push({
        month: date.getMonth(),
        year: date.getFullYear(),
        name: monthNames[date.getMonth()],
        shortName: monthNames[date.getMonth()].slice(0, 3),
      })
    }

    return months
  }

  const recentMonths = getRecentMonths()
  const calendarDays = generateCalendarDays(selectedYear, selectedMonth)

  return (
    <div className="min-h-screen relative bg-light-cream">
      {/* Background Image */}
      <div
        className="absolute inset-0 z-0 pointer-events-none"
        style={{
          backgroundImage: "url(/mood.png)",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          opacity: 0.3,
        }}
      />

      {/* Main Content */}
      <main className="relative z-10 px-6 py-12">
        <div className="max-w-6xl mx-auto">
          {/* Title */}
          <h1
            className="text-4xl md:text-5xl font-bold text-center mb-8 text-blue-dark font-dm-sans"
          >
            Your Mood Journey
          </h1>

          {/* Loading State */}
          {isLoading && (
            <div className="flex flex-col items-center justify-center py-16 bg-white">
              <Loader2 className="h-12 w-12 animate-spin mb-4 text-black" />
              <p className="text-lg text-black font-dm-sans">
                Loading your mood data...
              </p>
            </div>
          )}

          {/* Error State */}
          {error && !isLoading && (
            <div className="flex flex-col items-center justify-center py-16">
              <p className="text-lg text-red-600 mb-4 font-dm-sans">
                {error}
              </p>
              <Button
                onClick={() => window.location.reload()}
                className="px-6 py-2 rounded-md bg-blue-dark text-light-cream font-dm-sans"
              >
                Try Again
              </Button>
            </div>
          )}

          {/* Main Content */}
          {!isLoading && !error && (
            <>
              {/* Stats Cards */}
              {moodStats && (
                <div className="grid md:grid-cols-4 gap-6 mb-12">
                  <div className="p-6 rounded-lg text-center bg-overlay border-cream">
                    <div className="flex items-center justify-center mb-2">
                      <TrendingUp className="h-6 w-6 mr-2 text-blue-dark" />
                    </div>
                    <div className="text-2xl font-bold text-blue-dark font-dm-sans">
                      {moodStats.averageMood.toFixed(1)}
                    </div>
                    <div className="text-sm text-blue-dark font-dm-sans">
                      Average Mood
                    </div>
                  </div>

                  <div className="p-6 rounded-lg text-center bg-overlay border-cream">
                    <div className="flex items-center justify-center mb-2">
                      <Calendar className="h-6 w-6 mr-2 text-blue-dark" />
                    </div>
                    <div className="text-2xl font-bold text-blue-dark font-dm-sans">
                      {moodStats.totalEntries}
                    </div>
                    <div className="text-sm text-blue-dark font-dm-sans">
                      Total Entries
                    </div>
                  </div>

                  <div className="p-6 rounded-lg text-center bg-overlay border-cream">
                    <div className="flex items-center justify-center mb-2">
                      <BarChart3 className="h-6 w-6 mr-2 text-blue-dark" />
                    </div>
                    <div className="text-2xl font-bold text-blue-dark font-dm-sans">
                      {moodStats.averageSleep.toFixed(1)}h
                    </div>
                    <div className="text-sm text-blue-dark font-dm-sans">
                      Average Sleep
                    </div>
                  </div>

                  <div className="p-6 rounded-lg text-center bg-overlay border-cream">
                    <div className="flex items-center justify-center mb-2">
                      <span className="text-2xl">🔥</span>
                    </div>
                    <div className="text-2xl font-bold text-blue-dark font-dm-sans">
                      {moodStats.streakDays}
                    </div>
                    <div className="text-sm text-blue-dark font-dm-sans">
                      Day Streak
                    </div>
                  </div>
                </div>
              )}

              {/* Month Navigation */}
              <div className="mb-8">
                <h2 className="text-2xl font-bold mb-4 text-blue-dark font-dm-sans">
                  Recent Months
                </h2>
                <div className="flex flex-wrap gap-2">
                  {recentMonths.map((month) => (
                    <Button
                      key={`${month.year}-${month.month}`}
                      onClick={() => {
                        setSelectedMonth(month.month)
                        setSelectedYear(month.year)
                      }}
                      className={`px-4 py-2 rounded-md transition-all font-dm-sans ${
                        selectedMonth === month.month && selectedYear === month.year
                          ? "shadow-lg scale-105 bg-blue-dark text-light-cream"
                          : "shadow-md hover:shadow-lg bg-dark-cream text-blue-dark"
                      }`}
                    >
                      {month.name} {month.year}
                    </Button>
                  ))}
                </div>
              </div>

              {/* Calendar View */}
              <div className="p-8 rounded-lg mb-8 bg-overlay border-cream">
                <h3 className="text-2xl font-bold mb-6 text-center text-blue-dark font-dm-sans">
                  {monthNames[selectedMonth]} {selectedYear}
                </h3>

                {/* Calendar Header */}
                <div className="grid grid-cols-7 gap-2 mb-4">
                  {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
                    <div
                      key={day}
                      className="text-center font-semibold py-2 text-blue-dark font-dm-sans"
                    >
                      {day}
                    </div>
                  ))}
                </div>

                {/* Calendar Grid */}
                <div className="grid grid-cols-7 gap-2">
                  {calendarDays.map((day, index) => {
                    if (day === null) {
                      return <div key={index} className="h-12"></div>
                    }

                    const moodEntry = getMoodForDate(selectedYear, selectedMonth, day)
                    const mood = moodEntry?.mood

                    return (
                      <div
                        key={day}
                        className={`h-12 w-12 mx-auto rounded-full flex items-center justify-center text-sm font-medium cursor-pointer hover:scale-110 transition-transform font-dm-sans ${mood ? "text-light-cream" : "text-blue-dark"}`}
                        style={{
                          backgroundColor: mood ? getMoodColor(mood) : "#E5E7EB",
                        }}
                        title={
                          moodEntry
                            ? `${day}: ${getMoodEmoji(mood!)} (${mood}/5)${
                                moodEntry.notes ? ` - ${moodEntry.notes}` : ""
                              }`
                            : `${day}: No data`
                        }
                      >
                        {mood ? getMoodEmoji(mood) : day}
                      </div>
                    )
                  })}
                </div>

                {/* Legend */}
                <div className="mt-6 flex justify-center">
                  <div className="flex items-center space-x-6">
                    {[1, 2, 3, 4, 5].map((mood) => (
                      <div key={mood} className="flex items-center space-x-2">
                        <div
                          className={`w-6 h-6 rounded-full flex items-center justify-center text-sm font-dm-sans ${mood >= 3 ? "text-light-cream" : "text-blue-dark"}`}
                          style={{
                            backgroundColor: getMoodColor(mood),
                          }}
                        >
                          {getMoodEmoji(mood)}
                        </div>
                        <span className="text-sm text-blue-dark font-dm-sans">
                          {mood}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Empty State */}
              {moodEntries.length === 0 && (
                <div className="text-center py-16">
                  <div className="text-6xl mb-4">📊</div>
                  <h3 className="text-2xl font-bold mb-4 text-blue-dark font-dm-sans">
                    No mood data yet
                  </h3>
                  <p className="text-lg mb-8 text-blue-dark font-dm-sans">
                    Start tracking your mood to see beautiful visualizations of your emotional journey.
                  </p>
                  <Link href="/mood/check-in">
                    <Button
                      className="px-8 py-3 rounded-md text-lg shadow-md hover:shadow-lg transition-shadow bg-blue-dark text-light-cream font-dm-sans"
                    >
                      Record Your First Mood
                    </Button>
                  </Link>
                </div>
              )}

              {/* Action Button */}
              {moodEntries.length > 0 && (
                <div className="text-center">
                  <Link href="/mood/check-in">
                    <Button
                      className="px-8 py-3 rounded-md text-lg shadow-md hover:shadow-lg transition-shadow bg-blue-dark text-light-cream font-dm-sans"
                    >
                      Add Today&apos;s Mood
                    </Button>
                  </Link>
                </div>
              )}
            </>
          )}
        </div>
      </main>
    </div>
  )
}
