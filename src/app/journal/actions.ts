"use server"

import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"
import {JournalEntry} from "@/interfaces/journal"

// Simple in-memory store for demonstration purposes
// In a real application, this would be a database
const journalEntries: JournalEntry[] = [
  {
    id: "sample-entry-1",
    journalId: "sample-journal-1",
    title: "A Glimmer of Childhood Joy",
    content: "...",
    date: "2023-01-01",
    createdAt: "2023-01-01T00:00:00Z",
    updatedAt: "2023-01-01T00:00:00Z",
    userId: "sample-entry-1", // userId same as id
  },
]

export async function addJournalEntry(formData: FormData) {
  const title = formData.get("title") as string
  const content = formData.get("content") as string
  const date = new Date().toISOString() // Get current date in ISO format

  if (!title || !content) {
    return { success: false, message: "Title and content are required." }
  }

  const newId = crypto.randomUUID();
  const newEntry: JournalEntry = {
    id: newId,
    journalId: "some-journal-id", // Replace as needed
    title,
    content,
    date,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    userId: newId, // userId same as id
  };

  journalEntries.push(newEntry) // Add the new entry to our in-memory store

  console.log("Saving new journal entry:", newEntry)

  revalidatePath("/journal/entries") // Revalidate the entries page to show new entry
  redirect("/journal/entries") // Redirect to the entries page after saving
}

export async function getJournalEntries(): Promise<JournalEntry[]> {
  return journalEntries.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
}
