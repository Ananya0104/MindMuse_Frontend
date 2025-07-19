"use client"
import React from "react"
import { Button } from "@/components/ui/button"
import { Loader2, RefreshCw } from "lucide-react"
import { useState, useEffect } from "react"
import type { JournalEntry } from "@/interfaces/journal"
import { getAllJournalEntries } from "@/app/journal/journal-api" // Updated import
import Link from "next/link"
import { useRouter } from "next/navigation"
import { APP_ROUTES } from "@/constants/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card" // Import Card components

export default function JournalEntriesPage() {
  const [entries, setEntries] = useState<JournalEntry[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const router = useRouter()

  // Fetch entries on page load
  useEffect(() => {
    loadEntries()
  }, [])

  const loadEntries = async () => {
    try {
      setIsLoading(true)
      setError(null)
      const fetchedEntries = await getAllJournalEntries()
      setEntries(fetchedEntries)
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unable to load journal entries")
      console.error(err)
    } finally {
      setIsLoading(false)
    }
  }

  const handleRefresh = async () => {
    await loadEntries()
  }

  const handleEntryClick = (journalId: string) => {
    router.push(APP_ROUTES.JOURNAL.ENTRY_DETAIL(journalId))
  }

  const formatDate = (dateString: string) => {
    try {
      return new Date(dateString).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      })
    } catch {
      return dateString
    }
  }

  return (
    <main
      className="flex min-h-screen flex-col items-center justify-start bg-cover bg-center p-4 sm:p-8 md:p-12"
      style={{ backgroundImage: 'url("/entry.png")' }}
    >
      <div className="w-full max-w-4xl bg-white/10 backdrop-blur-sm shadow-lg rounded-lg p-6 sm:p-8 md:p-10 mt-8 mb-8 border border-blue-400/30">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl sm:text-4xl font-bold text-[#87CEEB] drop-shadow-md">Your Journal Entries</h1>
          <div className="flex gap-4">
            <Button
              onClick={handleRefresh}
              disabled={isLoading}
              className="px-4 py-2 text-base bg-blue-600 text-white hover:bg-blue-700 shadow-md flex items-center gap-2"
            >
              <RefreshCw className={`h-4 w-4 ${isLoading ? "animate-spin" : ""}`} />
              <span>Refresh</span>
            </Button>
            <Button asChild className="px-4 py-2 text-base bg-green-600 text-white hover:bg-green-700 shadow-md">
              <Link href="/journal/new-entry">Write New Entry</Link>
            </Button>
          </div>
        </div>

        {isLoading && (
          <div className="flex flex-col items-center justify-center py-16 bg-white">
            <Loader2 className="h-12 w-12 animate-spin mb-4 text-black" />
            <p className="text-lg text-black">Loading your entries...</p>
          </div>
        )}

        {error && !isLoading && (
          <div className="flex flex-col items-center justify-center py-16">
            <p className="text-lg text-red-400 mb-4">{error}</p>
            <Button onClick={handleRefresh} className="px-6 py-2 rounded-md bg-blue-600 text-white">
              Try Again
            </Button>
          </div>
        )}

        {!isLoading && !error && entries.length === 0 && (
          <div className="flex flex-col items-center justify-center py-16">
            <p className="text-xl mb-6 text-gray-300">No entries yet. Start your journaling journey!</p>
            <Link href={APP_ROUTES.JOURNAL.WRITE}>
              <Button className="px-8 py-3 rounded-lg text-lg bg-blue-600 text-white hover:bg-blue-700 shadow-md">
                Write New Entry
              </Button>
            </Link>
          </div>
        )}

        {!isLoading && !error && entries.length > 0 && (
          <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2">
            {entries.map((entry) => (
              <Card
                key={entry.journalId}
                className="bg-white/80 border border-blue-300/50 shadow-md cursor-pointer hover:scale-[1.02] transition-transform duration-200"
                onClick={() => handleEntryClick(entry.journalId)}
              >
                <CardHeader>
                  <CardTitle className="text-xl font-semibold text-gray-800">{entry.title}</CardTitle>
                  <p className="text-sm text-gray-600">{formatDate(entry.createdAt)}</p>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-700 line-clamp-5">{entry.content}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        <div className="mt-8 text-center">
          <Button
            asChild
            variant="outline"
            className="px-6 py-3 text-lg bg-gray-50 text-gray-700 hover:bg-gray-100 border border-gray-300 shadow-sm"
          >
            <Link href="/journal">Back to Main</Link>
          </Button>
        </div>
      </div>
    </main>
  )
}
