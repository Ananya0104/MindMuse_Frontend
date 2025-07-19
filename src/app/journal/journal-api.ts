import { apiCall } from "../../lib/api"
import { getCurrentUserId } from "../../lib/auth"
import { ERROR_MESSAGES } from "../../constants/errors"
import type { JournalEntry, JournalResponse, JournalsResponse, DeleteJournalResponse } from "../../interfaces/journal"
import { API_ENDPOINTS } from "../../constants/api"

// Create a new journal entry
export const createJournalEntry = async (data: { title: string; content: string }): Promise<JournalEntry> => {
  const userId = getCurrentUserId()
  if (!userId) {
    throw new Error(ERROR_MESSAGES.AUTH.USER_ID_UNDETERMINED)
  }
  const response: JournalResponse = await apiCall(`${API_ENDPOINTS.JOURNAL.CREATE}?userId=${userId}`, "POST", data)
  if (response.journal) {
    return response.journal as JournalEntry
  }
  throw new Error(response.message || response.error || ERROR_MESSAGES.JOURNAL.FAILED_TO_CREATE)
}

// Get all journal entries
export const getAllJournalEntries = async (): Promise<JournalEntry[]> => {
  const userId = getCurrentUserId()
  if (!userId) {
    throw new Error(ERROR_MESSAGES.AUTH.USER_ID_UNDETERMINED)
  }
  const response: JournalsResponse = await apiCall(`${API_ENDPOINTS.JOURNAL.GET_ALL}?userId=${userId}`, "GET")
  if (response.journals) {
    return response.journals as JournalEntry[]
  }
  throw new Error(response.message || response.error || ERROR_MESSAGES.JOURNAL.FAILED_TO_FETCH)
}

// Get a single journal entry
export const getJournalEntry = async (journalId: string): Promise<JournalEntry> => {
  const userId = getCurrentUserId()
  if (!userId) {
    throw new Error(ERROR_MESSAGES.AUTH.USER_ID_UNDETERMINED)
  }
  const response: JournalResponse = await apiCall(
    `${API_ENDPOINTS.JOURNAL.GET_BY_ID(journalId)}?userId=${userId}`,
    "GET",
  )
  if (response.journal) {
    return response.journal as JournalEntry
  }
  throw new Error(response.message || response.error || ERROR_MESSAGES.JOURNAL.UNABLE_TO_LOAD)
}

// Update a journal entry
export const updateJournalEntry = async (
  journalId: string,
  data: { title: string; content: string },
): Promise<JournalEntry> => {
  const userId = getCurrentUserId()
  if (!userId) {
    throw new Error(ERROR_MESSAGES.AUTH.USER_ID_UNDETERMINED)
  }
  const response: JournalResponse = await apiCall(
    `${API_ENDPOINTS.JOURNAL.UPDATE(journalId)}?userId=${userId}`,
    "PUT",
    data,
  )
  if (response.journal) {
    return response.journal as JournalEntry
  }
  throw new Error(response.message || response.error || ERROR_MESSAGES.JOURNAL.FAILED_TO_UPDATE)
}

// Delete a journal entry
export const deleteJournalEntry = async (journalId: string): Promise<void> => {
  const userId = getCurrentUserId()
  if (!userId) {
    throw new Error(ERROR_MESSAGES.AUTH.USER_ID_UNDETERMINED)
  }
  const response: DeleteJournalResponse = await apiCall(
    `${API_ENDPOINTS.JOURNAL.DELETE(journalId)}?userId=${userId}`,
    "DELETE",
  )
  if (response.message === "Journal entry deleted successfully") {
    return
  }
  throw new Error(response.message || response.error || ERROR_MESSAGES.JOURNAL.FAILED_TO_DELETE)
}
