// --- REPLACE THE ENTIRE CONTENTS of src/interfaces/chat.ts ---

import React from 'react';

export interface Message {
  id: string;
  text: string;
  isBot: boolean;
  timestamp: Date;
}

// Remove therapistType and related props
export interface MainChatProps {
  isSidebarOpen: boolean;
  setIsSidebarOpen: (isOpen: boolean) => void;
  messages: Message[];
  isTyping: boolean;
  inputValue: string;
  setInputValue: (value: string) => void;
  handleSubmit: (e: React.FormEvent) => void;
  handleSendMessage: (text: string) => void;
  messagesEndRef: React.RefObject<HTMLDivElement | null>;
}