"use server"

export type MoodEntry = {
  id: string
  userId: string
  date: string // YYYY-MM-DD format
  mood: 1 | 2 | 3 | 4 | 5 // 1 = very sad, 2 = sad, 3 = neutral, 4 = happy, 5 = very happy
  sleepHours?: number
  sleepQuality?: 1 | 2 | 3 | 4 | 5
  energy?: 1 | 2 | 3 | 4 | 5
  stress?: 1 | 2 | 3 | 4 | 5
  notes?: string
  createdAt: string
}

export type MoodStats = {
  averageMood: number
  averageSleep: number
  totalEntries: number
  streakDays: number
  moodDistribution: { mood: number; count: number }[]
}

export async function getMoodEntries(startDate?: string, endDate?: string): Promise<MoodEntry[]> {
  // Simulate database delay
  await new Promise((resolve) => setTimeout(resolve, 500))

  // Mock data for demonstration
  const mockData: MoodEntry[] = [
    {
      id: "1",
      userId: "user_123",
      date: "2025-01-15",
      mood: 4,
      sleepHours: 7.5,
      sleepQuality: 4,
      energy: 4,
      stress: 2,
      notes: "Great day overall! Felt productive and energized.",
      createdAt: "2025-01-15T22:00:00Z",
    },
    {
      id: "2",
      userId: "user_123",
      date: "2025-01-14",
      mood: 3,
      sleepHours: 6,
      sleepQuality: 3,
      energy: 3,
      stress: 3,
      notes: "Average day, nothing special but not bad either.",
      createdAt: "2025-01-14T21:30:00Z",
    },
    {
      id: "3",
      userId: "user_123",
      date: "2025-01-13",
      mood: 5,
      sleepHours: 8,
      sleepQuality: 5,
      energy: 5,
      stress: 1,
      notes: "Amazing sleep and mood! Everything felt possible today.",
      createdAt: "2025-01-13T23:15:00Z",
    },
    {
      id: "4",
      userId: "user_123",
      date: "2025-01-12",
      mood: 2,
      sleepHours: 5,
      sleepQuality: 2,
      energy: 2,
      stress: 4,
      notes: "Rough day, didn't sleep well and felt overwhelmed.",
      createdAt: "2025-01-12T20:45:00Z",
    },
    {
      id: "5",
      userId: "user_123",
      date: "2025-01-11",
      mood: 4,
      sleepHours: 7,
      sleepQuality: 4,
      energy: 4,
      stress: 2,
      notes: "Good balance today, felt centered and calm.",
      createdAt: "2025-01-11T22:30:00Z",
    },
    {
      id: "6",
      userId: "user_123",
      date: "2025-01-10",
      mood: 3,
      sleepHours: 6.5,
      sleepQuality: 3,
      energy: 3,
      stress: 3,
      createdAt: "2025-01-10T21:00:00Z",
    },
    {
      id: "7",
      userId: "user_123",
      date: "2025-01-09",
      mood: 4,
      sleepHours: 7.5,
      sleepQuality: 4,
      energy: 4,
      stress: 2,
      notes: "Productive day with good energy levels.",
      createdAt: "2025-01-09T22:15:00Z",
    },
    {
      id: "8",
      userId: "user_123",
      date: "2025-01-08",
      mood: 5,
      sleepHours: 8.5,
      sleepQuality: 5,
      energy: 5,
      stress: 1,
      notes: "Perfect day! Everything went smoothly.",
      createdAt: "2025-01-08T23:00:00Z",
    },
  ]

  // Filter by date range if provided
  let filteredData = mockData
  if (startDate && endDate) {
    filteredData = mockData.filter((entry) => {
      return entry.date >= startDate && entry.date <= endDate
    })
  }

  return filteredData
}

export async function getMoodStats(): Promise<MoodStats> {
  // Simulate database delay
  await new Promise((resolve) => setTimeout(resolve, 300))

  // Get all entries to calculate stats
  const entries = await getMoodEntries()

  if (entries.length === 0) {
    return {
      averageMood: 0,
      averageSleep: 0,
      totalEntries: 0,
      streakDays: 0,
      moodDistribution: [],
    }
  }

  // Calculate statistics
  const totalEntries = entries.length
  const averageMood = entries.reduce((sum, entry) => sum + entry.mood, 0) / totalEntries

  const sleepEntries = entries.filter((entry) => entry.sleepHours)
  const averageSleep =
    sleepEntries.length > 0
      ? sleepEntries.reduce((sum, entry) => sum + (entry.sleepHours || 0), 0) / sleepEntries.length
      : 0

  // Calculate mood distribution
  const moodCounts = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 }
  entries.forEach((entry) => {
    moodCounts[entry.mood as keyof typeof moodCounts]++
  })

  const moodDistribution = Object.entries(moodCounts).map(([mood, count]) => ({
    mood: Number.parseInt(mood),
    count,
  }))

  // Calculate streak (consecutive days with entries)
  const sortedDates = entries
    .map((entry) => entry.date)
    .sort()
    .reverse()

  let streakDays = 0
  let currentDate = new Date()

  for (const dateStr of sortedDates) {
    const entryDate = new Date(dateStr)
    const daysDiff = Math.floor((currentDate.getTime() - entryDate.getTime()) / (1000 * 60 * 60 * 24))

    if (daysDiff === streakDays) {
      streakDays++
      currentDate = entryDate
    } else {
      break
    }
  }

  return {
    averageMood: Math.round(averageMood * 10) / 10,
    averageSleep: Math.round(averageSleep * 10) / 10,
    totalEntries,
    streakDays,
    moodDistribution,
  }
}

export async function createMoodEntry(
  mood: number,
  sleepHours?: number,
  sleepQuality?: number,
  energy?: number,
  stress?: number,
  notes?: string,
): Promise<MoodEntry> {
  // Simulate database delay
  await new Promise((resolve) => setTimeout(resolve, 300))

  const newEntry: MoodEntry = {
    id: Date.now().toString(),
    userId: "user_123",
    date: new Date().toISOString().split("T")[0],
    mood: mood as 1 | 2 | 3 | 4 | 5,
    sleepHours,
    sleepQuality: sleepQuality as 1 | 2 | 3 | 4 | 5,
    energy: energy as 1 | 2 | 3 | 4 | 5,
    stress: stress as 1 | 2 | 3 | 4 | 5,
    notes,
    createdAt: new Date().toISOString(),
  }

  return newEntry
}
