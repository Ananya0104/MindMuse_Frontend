"use client"

import  React from "react"
import { useState, useEffect, useCallback } from "react"
import { useRouter, useParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { ArrowLeft, Loader2, Save } from "lucide-react"
import { Input } from "@/components/ui/input"
import Textarea  from "@/components/ui/textarea"
import type { JournalEntry } from "@/interfaces/journal"
import { getJournalEntry, updateJournalEntry } from "@/app/journal/journal-api" // Updated imports
import { APP_ROUTES } from "@/constants/navigation"
import { ERROR_MESSAGES } from "@/constants/errors"

export default function EditEntryPage() {
  const [entry, setEntry] = useState<JournalEntry | null>(null)
  const [title, setTitle] = useState("")
  const [content, setContent] = useState("")
  const [isLoading, setIsLoading] = useState(true)
  const [isSaving, setIsSaving] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [showSaveMessage, setShowSaveMessage] = useState(false)
  const [contentCharCount, setContentCharCount] = useState(0)

  const router = useRouter()
  const params = useParams()
  const entryId = params.id as string

  const loadEntry = useCallback(async () => {
    try {
      setIsLoading(true)
      setError(null)
      const fetchedEntry = await getJournalEntry(entryId)
      setEntry(fetchedEntry)
      setTitle(fetchedEntry.title)
      setContent(fetchedEntry.content)
      setContentCharCount(fetchedEntry.content.length)
    } catch (err) {
      setError(err instanceof Error ? err.message : ERROR_MESSAGES.JOURNAL.UNABLE_TO_LOAD)
      console.error(err)
    } finally {
      setIsLoading(false)
    }
  }, [entryId])

  useEffect(() => {
    if (entryId) {
      loadEntry()
    }
  }, [entryId, loadEntry])

  const handleContentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setContentCharCount(e.target.value.length)
    setContent(e.target.value)
  }

  const handleSave = async () => {
    if (!title.trim() || !content.trim()) {
      setError(ERROR_MESSAGES.JOURNAL.FILL_TITLE_CONTENT)
      return
    }

    setIsSaving(true)
    setError(null)

    try {
      const updateData = {
        title: title.trim(),
        content: content.trim(),
      }

      await updateJournalEntry(entryId, updateData)

      setShowSaveMessage(true)
      setTimeout(() => {
        router.push(APP_ROUTES.JOURNAL.ENTRY_DETAIL(entryId))
      }, 2000)
    } catch (err) {
      setError(err instanceof Error ? err.message : ERROR_MESSAGES.JOURNAL.FAILED_TO_UPDATE)
    } finally {
      setIsSaving(false)
    }
  }

  const handleCancel = () => {
    router.push(APP_ROUTES.JOURNAL.ENTRY_DETAIL(entryId))
  }

  if (isLoading) {
    return (
      <div
        className="min-h-screen flex flex-col items-center justify-center bg-cover bg-center"
        style={{ backgroundImage: 'url("/entry.png")' }}
      >
        <div className="flex flex-col items-center justify-center py-16">
          <Loader2 className="h-12 w-12 animate-spin mb-4 text-[#87CEEB]" />
          <p className="text-lg text-gray-300">Loading entry...</p>
        </div>
      </div>
    )
  }

  if (error && !entry) {
    return (
      <div
        className="min-h-screen flex flex-col items-center justify-center bg-cover bg-center"
        style={{ backgroundImage: 'url("/entry.png")' }}
      >
        <div className="max-w-4xl mx-auto p-8">
          <div className="flex flex-col items-center justify-center py-16">
            <p className="text-lg text-red-400 mb-4">{error}</p>
            <Button
              onClick={() => router.push(APP_ROUTES.JOURNAL.ENTRIES)}
              className="px-6 py-2 rounded-md bg-blue-600 text-white"
            >
              Back to Entries
            </Button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <main
      className="flex min-h-screen flex-col items-center justify-start bg-cover bg-center p-4 sm:p-8 md:p-12"
      style={{ backgroundImage: 'url("/entry.png")' }}
    >

      <div className="w-full max-w-4xl bg-white/10 backdrop-blur-sm shadow-lg rounded-lg p-6 sm:p-8 md:p-10 mt-8 mb-8 border border-blue-400/30">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <Button
            onClick={handleCancel}
            variant="ghost"
            className="flex items-center gap-2 text-gray-300 hover:text-white"
          >
            <ArrowLeft className="w-4 h-4" />
            Cancel
          </Button>
          <h1 className="text-3xl font-bold text-[#87CEEB] drop-shadow-md">Edit Entry</h1>
          <div className="w-20"></div> {/* Spacer for centering */}
        </div>

        {/* Error Message */}
        {error && <div className="mb-6 p-4 bg-red-100 border border-red-400 text-red-700 rounded-lg">{error}</div>}

        {/* Form */}
        <div className="space-y-6 relative">
          {/* Title Input */}
          <div>
            <label className="block text-lg font-medium text-gray-700 mb-2 sr-only">Title</label>
            <Input
              type="text"
              placeholder="Enter Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              disabled={isSaving}
              className="w-full p-3 border border-blue-300/50 rounded-md focus:ring-blue-500 focus:border-blue-500 text-base bg-white/80 text-gray-800 placeholder:text-gray-500"
            />
          </div>

          {/* Content Textarea */}
          <div className="relative">
            <label className="block text-lg font-medium text-gray-700 mb-2 sr-only">Content</label>
            <Textarea
              placeholder="Write your thoughts here..."
              value={content}
              onChange={handleContentChange}
              disabled={isSaving}
              rows={16}
              className="w-full p-3 border border-blue-300/50 rounded-md focus:ring-blue-500 focus:border-blue-500 resize-y text-base bg-white/80 text-gray-800 placeholder:text-gray-500"
            />

            {/* Character Counter */}
            <div className="text-right text-sm text-gray-300 mt-2">Characters: {contentCharCount}</div>

            {/* Save Message */}
            {showSaveMessage && (
              <div
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 p-6 border-2 rounded shadow-lg z-10 bg-white/90 transition-all duration-300 w-[90%] max-w-sm"
                style={{ borderColor: "#87CEEB" }}
              >
                <div className="flex items-start space-x-3 h-full">
                  <span className="text-lg">✅💾</span>
                  <div className="flex-1 flex flex-col justify-center">
                    <p className="font-semibold text-base mb-2 text-gray-800">Entry updated successfully!</p>
                    <p className="text-sm text-gray-700">Redirecting to your entry...</p>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Action Buttons */}
          <div className="flex justify-between pt-4">
            <Button
              onClick={handleCancel}
              disabled={isSaving}
              className="px-8 py-3 rounded-lg font-medium shadow-md flex items-center space-x-2 transition-all hover:opacity-90 active:scale-95 disabled:opacity-50 bg-gray-600 text-white"
            >
              <span>❌</span>
              <span>Cancel</span>
            </Button>

            <Button
              onClick={handleSave}
              disabled={isSaving || !title.trim() || !content.trim()}
              className="px-8 py-3 rounded-lg font-medium flex shadow-md items-center space-x-2 transition-all hover:opacity-90 active:scale-95 disabled:opacity-50 bg-green-600 text-white"
            >
              {isSaving ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Saving...</span>
                </>
              ) : (
                <>
                  <Save className="w-5 h-5" />
                  <span>Save Changes</span>
                </>
              )}
            </Button>
          </div>
        </div>
      </div>
    </main>
  )
}
