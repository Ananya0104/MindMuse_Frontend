"use client"

import React from "react"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "../../../components/ui/button"
import { Input } from "../../../components/ui/input"
import Textarea  from "../../../components/ui/textarea"
import { createJournalEntry } from "../journal-api" // Updated import
import { Trash2, Save, Loader2 } from "lucide-react" // Import icons
import { APP_ROUTES } from "../../../constants/navigation"
import { ERROR_MESSAGES } from "../../../constants/errors"

export default function NewEntryPage() {
  const [title, setTitle] = useState("")
  const [content, setContent] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [showSaveMessage, setShowSaveMessage] = useState(false)
  const [showDiscardDialog, setShowDiscardDialog] = useState(false) // Renamed for clarity
  const [contentCharCount, setContentCharCount] = useState(0)

  const router = useRouter()

  const handleContentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setContentCharCount(e.target.value.length)
    setContent(e.target.value)
  }

  const handleSave = async () => {
    if (!title.trim() || !content.trim()) {
      setError(ERROR_MESSAGES.JOURNAL.FILL_TITLE_CONTENT)
      return
    }

    setIsLoading(true)
    setError(null)

    try {
      const journalData = {
        title: title.trim(),
        content: content.trim(),
      }

      await createJournalEntry(journalData)

      setShowSaveMessage(true)
      setTimeout(() => {
        router.push(APP_ROUTES.JOURNAL.ENTRIES)
      }, 2000)
    } catch (err) {
      setError(err instanceof Error ? err.message : ERROR_MESSAGES.JOURNAL.FAILED_TO_SAVE)
    } finally {
      setIsLoading(false)
    }
  }

  const handleDiscard = () => {
    setShowDiscardDialog(true)
  }

  const confirmDiscard = () => {
    setTitle("")
    setContent("")
    setShowDiscardDialog(false)
    router.push(APP_ROUTES.JOURNAL.ENTRIES)
  }

  return (
    <main
      className="flex min-h-screen flex-col items-center justify-start bg-cover bg-center p-4 sm:p-8 md:p-12"
      style={{ backgroundImage: 'url("/entry.png")' }}
    >
      <div className="w-full max-w-3xl bg-white/10 backdrop-blur-sm shadow-lg rounded-lg p-6 sm:p-8 md:p-10 mt-8 mb-8 border border-blue-400/30">
        <h1 className="text-3xl sm:text-4xl font-bold text-center text-[#87CEEB] mb-8 drop-shadow-md">
          Thought Capsule
        </h1>
        <form className="space-y-6">
          {" "}
          {error && <div className="mb-6 p-4 bg-red-100 border border-red-400 text-red-700 rounded-lg">{error}</div>}
          <div>
            <label htmlFor="title" className="sr-only">
              Enter Title
            </label>
            <Input
              id="title"
              name="title"
              type="text"
              placeholder="Enter Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              disabled={isLoading}
              className="w-full p-3 border border-blue-300/50 rounded-md focus:ring-blue-500 focus:border-blue-500 text-base bg-white/80 text-gray-800 placeholder:text-gray-500"
            />
          </div>
          <div className="relative">
            <label htmlFor="content" className="sr-only">
              Write your thought here....
            </label>
            <Textarea
              id="content"
              name="content"
              placeholder="Write your thought here...."
              rows={15}
              value={content}
              onChange={handleContentChange}
              disabled={isLoading}
              className="w-full p-3 border border-blue-300/50 rounded-md focus:ring-blue-500 focus:border-blue-500 resize-y text-base bg-white/80 text-gray-800 placeholder:text-gray-500"
            />
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
                    <p className="font-semibold text-base mb-2 text-gray-800">
                      Your thoughts are safe, no need to fear
                    </p>
                    <p className="text-sm text-gray-700">They&apos;re locked in tight, crystal clear!</p>
                  </div>
                </div>
              </div>
            )}

            {/* Discard Confirmation Dialog */}
            {showDiscardDialog && (
              <div
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 p-6 border-2 rounded shadow-lg z-10 bg-white/90 transition-all duration-300 w-[90%] max-w-sm"
                style={{ borderColor: "#87CEEB" }}
              >
                <div className="space-y-4 h-full flex flex-col">
                  <div className="flex items-start space-x-3 flex-1">
                    <span className="text-lg">💔🚫</span>
                    <div className="flex-1 flex flex-col justify-center">
                      <h3 className="font-semibold text-base mb-2 text-gray-800">
                        Delete this thought, never to be seen?
                      </h3>
                      <p className="text-sm text-gray-700">Think again — or wipe it clean?</p>
                    </div>
                  </div>

                  <div className="flex space-x-3 justify-end">
                    <Button
                      onClick={() => setShowDiscardDialog(false)}
                      disabled={isLoading}
                      className="px-4 py-2 rounded text-sm font-medium hover:opacity-90 active:scale-95 transition-transform bg-gray-600 text-white"
                    >
                      Nah, Let&apos;s Keep it
                    </Button>
                    <Button
                      onClick={confirmDiscard}
                      disabled={isLoading}
                      className="px-4 py-2 rounded text-sm font-medium hover:opacity-90 active:scale-95 transition-transform bg-red-600 text-white"
                    >
                      Yes, Discard it
                    </Button>
                  </div>
                </div>
              </div>
            )}
          </div>
          <div className="flex flex-col sm:flex-row gap-4 justify-between pt-4">
            <Button
              onClick={handleDiscard}
              disabled={isLoading}
              className="px-6 py-3 text-lg bg-red-600 text-white hover:bg-red-700 shadow-md w-full sm:w-auto flex items-center gap-2"
            >
              <Trash2 className="h-5 w-5" /> Discard
            </Button>
            <Button
              type="button" // Changed to type="button" since we're using onClick
              onClick={handleSave}
              disabled={isLoading || !title.trim() || !content.trim()}
              className="px-6 py-3 text-lg bg-green-600 text-white hover:bg-green-700 shadow-md disabled:opacity-50 disabled:cursor-not-allowed w-full sm:w-auto flex items-center gap-2"
            >
              {isLoading ? (
                <>
                  <Loader2 className="h-5 w-5 animate-spin" /> Saving...
                </>
              ) : (
                <>
                  <Save className="h-5 w-5" /> Save
                </>
              )}
            </Button>
          </div>
        </form>
      </div>
    </main>
  )
}
