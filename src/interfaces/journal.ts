// Update your existing journal interfaces
export interface JournalIntroProps {
  handleViewEntries: () => void
  handleWriteNewEntry: () => void
}

export interface InspirationalTextProps {
  displayedText: string
  showCursor: boolean
}

export interface JournalEntry {
  id: string
  journalId: string
  title: string
  content: string
  date: string
  createdAt: string
  updatedAt: string
  userId: string
}

export interface CreateJournalRequest {
  title: string
  content: string
}

export interface UpdateJournalRequest {
  title?: string
  content?: string
}

// API response interfaces for journal API
export interface JournalResponse {
  journal?: JournalEntry;
  message?: string;
  error?: string;
}

export interface JournalsResponse {
  journals?: JournalEntry[];
  message?: string;
  error?: string;
}

export interface DeleteJournalResponse {
  message?: string;
  error?: string;
}
