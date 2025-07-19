"use client"
import React from "react"
import { useState, useEffect, useCallback } from "react"
import { useRouter, useParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { ArrowLeft, Edit, Trash2, Loader2 } from "lucide-react"
import type { JournalEntry } from "@/interfaces/journal"
import { getJournalEntry, deleteJournalEntry } from "@/app/journal/journal-api" // Updated imports
import { APP_ROUTES } from "@/constants/navigation"
import { ERROR_MESSAGES } from "@/constants/errors"

export default function SingleEntryPage() {
  const [entry, setEntry] = useState<JournalEntry | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [isDeleting, setIsDeleting] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [showDeleteDialog, setShowDeleteDialog] = useState(false)

  const router = useRouter()
  const params = useParams()
  const entryId = params.id as string

  const loadEntry = useCallback(async () => {
    try {
      setIsLoading(true)
      setError(null)
      const fetchedEntry = await getJournalEntry(entryId)
      setEntry(fetchedEntry)
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

  const handleEdit = () => {
    router.push(APP_ROUTES.JOURNAL.ENTRY_EDIT(entryId))
  }

  const handleDelete = async () => {
    try {
      setIsDeleting(true)
      await deleteJournalEntry(entryId)
      setShowDeleteDialog(false)
      router.push(APP_ROUTES.JOURNAL.ENTRIES)
    } catch (err) {
      setError(err instanceof Error ? err.message : ERROR_MESSAGES.JOURNAL.FAILED_TO_DELETE_ENTRY)
      setIsDeleting(false)
      setShowDeleteDialog(false)
    }
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

  if (isLoading) {
    return (
      <div
        className="min-h-screen flex flex-col items-center justify-center bg-white"
      >
        <div className="flex flex-col items-center justify-center py-16">
          <Loader2 className="h-12 w-12 animate-spin mb-4 text-black" />
          <p className="text-lg text-black">Loading entry...</p>
        </div>
      </div>
    )
  }

  if (error || !entry) {
    return (
      <div
        className="min-h-screen flex flex-col items-center justify-center bg-cover bg-center"
        style={{ backgroundImage: 'url("/entry.png")' }}
      >
        <div className="max-w-4xl mx-auto p-8">
          <div className="flex flex-col items-center justify-center py-16">
            <p className="text-lg text-red-400 mb-4">{error || "Entry not found"}</p>
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
      style={{ backgroundImage: 'url("/journal-background.png")' }}
    >

      <div className="w-full max-w-4xl bg-white/10 backdrop-blur-sm shadow-lg rounded-lg p-6 sm:p-8 md:p-10 mt-8 mb-8 border border-blue-400/30">
        {/* Header with navigation and actions */}
        <div className="flex items-center justify-between mb-8">
          <Button
            onClick={() => router.push(APP_ROUTES.JOURNAL.ENTRIES)}
            variant="ghost"
            className="flex items-center gap-2 text-gray-300 hover:text-white"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Entries
          </Button>

          <div className="flex gap-2">
            <Button
              onClick={handleEdit}
              className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white hover:bg-blue-700"
            >
              <Edit className="w-4 h-4" />
              Edit
            </Button>

            <Button
              onClick={() => setShowDeleteDialog(true)}
              className="flex items-center gap-2 px-4 py-2 bg-red-600 text-white hover:bg-red-700"
            >
              <Trash2 className="w-4 h-4" />
              Delete
            </Button>
          </div>
        </div>

        {showDeleteDialog && (
          <div className="fixed inset-0 flex items-center justify-center z-50">
            <div className="absolute inset-0 bg-black bg-opacity-40 backdrop-blur-sm"></div>
            <div className="relative bg-white/90 p-6 rounded-lg shadow-xl max-w-sm w-full border border-blue-400/30">
              <h3 className="text-lg font-semibold mb-4 text-gray-800">Delete Entry</h3>
              <p className="mb-6 text-gray-700">
                Are you sure you want to delete this journal entry? This action cannot be undone.
              </p>
              <div className="flex gap-3 justify-end">
                <Button
                  onClick={() => setShowDeleteDialog(false)}
                  variant="outline"
                  disabled={isDeleting}
                  className="px-4 py-2 bg-gray-600 text-white hover:bg-gray-700"
                >
                  Cancel
                </Button>
                <Button
                  onClick={handleDelete}
                  disabled={isDeleting}
                  className="px-4 py-2 flex items-center gap-2 bg-red-600 text-white hover:bg-red-700"
                >
                  {isDeleting ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      Deleting...
                    </>
                  ) : (
                    <>
                      <Trash2 className="w-4 h-4" />
                      Delete
                    </>
                  )}
                </Button>
              </div>
            </div>
          </div>
        )}

        {/* Entry Content */}
        <div className="bg-white/80 p-8 rounded-lg shadow-lg border border-blue-300/50">
          {/* Date */}
          <div className="text-sm mb-4 text-gray-600">
            {formatDate(entry.createdAt)}
            {entry.updatedAt !== entry.createdAt && (
              <span className="ml-2 italic">(Updated: {formatDate(entry.updatedAt)})</span>
            )}
          </div>

          {/* Title */}
          <h1 className="text-3xl font-bold mb-6 text-gray-800">{entry.title}</h1>

          {/* Content */}
          <div className="text-lg leading-relaxed whitespace-pre-wrap text-gray-700">{entry.content}</div>
        </div>
      </div>
    </main>
  )
}
