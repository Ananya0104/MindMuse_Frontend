"use client";

import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  useCallback,
  useMemo,
} from "react";
import { v4 as uuidv4 } from "uuid";
import { Message } from "@/interfaces/chat";

interface ChatSessionContextType {
  messages: Message[];
  isLoading: boolean;
  sendMessage: (prompt: string) => Promise<void>;
  startNewSession: () => void;
  sessionId: string;
}

const ChatSessionContext = createContext<ChatSessionContextType | undefined>(
  undefined
);

export const ChatSessionProvider = ({ children }: { children: ReactNode }) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [sessionId, setSessionId] = useState<string>(uuidv4());
  const userId = "test-user-1"; // Replace with real userId from auth

  const sendMessage = useCallback(async (prompt: string) => {
    if (!prompt.trim()) return;
    setIsLoading(true);
    const userMsg: Message = {
      id: Date.now().toString(),
      text: prompt.trim(),
      isBot: false,
      timestamp: new Date(),
    };
    setMessages((prev) => [...prev, userMsg]);
    try {
      const res = await fetch("http://localhost:8080/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId, sessionId, message: prompt.trim() }),
      });
      const data = await res.json();
      if (data.aiResponse) {
        setMessages((prev) => [
          ...prev,
          {
            id: (Date.now() + 1).toString(),
            text: data.aiResponse,
            isBot: true,
            timestamp: new Date(),
          },
        ]);
      }
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          id: (Date.now() + 2).toString(),
          text: "Error: Could not get response.",
          isBot: true,
          timestamp: new Date(),
        },
      ]);
    }
    setIsLoading(false);
  }, [sessionId, userId]);

  const startNewSession = useCallback(() => {
    setSessionId(uuidv4());
    setMessages([]);
  }, []);

  const contextValue = useMemo(
    () => ({
      messages,
      isLoading,
      sendMessage,
      startNewSession,
      sessionId,
    }),
    [messages, isLoading, sendMessage, startNewSession, sessionId]
  );

  return (
    <ChatSessionContext.Provider value={contextValue}>
      {children}
    </ChatSessionContext.Provider>
  );
};

export const useChatSession = () => {
  const context = useContext(ChatSessionContext);
  if (context === undefined) {
    throw new Error("useChatSession must be used within a ChatSessionProvider");
  }
  return context;
};