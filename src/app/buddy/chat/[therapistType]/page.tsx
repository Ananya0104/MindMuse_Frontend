"use client";

import React, { useEffect, useState, useRef } from 'react';
import { useChatSession } from '../../../../contexts/ChatSessionContext';
import MainChat from '../../MainChat';
import { Minimize } from 'lucide-react';
import { useRouter } from 'next/navigation';

const ChatPageContent = () => {
  const { messages, isLoading, sendMessage, startNewSession } = useChatSession();
  const [inputValue, setInputValue] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputValue.trim()) {
      sendMessage(inputValue);
      setInputValue("");
    }
  };
  
  if (isLoading) return <div className="flex items-center justify-center h-screen bg-white text-black">Loading Conversation...</div>;

  // Add minimize and new session button to the chat header (right side)
  return (
    <div className="relative h-screen w-full">
      <div className="absolute top-4 right-4 z-50 flex gap-2">
        <button
          className="bg-[#E6FAFC] text-[#254C47] p-2 rounded-full shadow hover:bg-[#A9F0F6]"
          onClick={() => router.push('/buddy')}
          title="Minimize Chat"
        >
          <Minimize size={22} />
        </button>
        <button
          className="bg-[#A9F0F6] text-[#254C47] p-2 rounded-full shadow hover:bg-[#80BADD]"
          onClick={startNewSession}
          title="Start New Session"
        >
          New
        </button>
      </div>
      <MainChat
        messages={messages}
        isTyping={isLoading}
        inputValue={inputValue}
        setInputValue={setInputValue}
        handleSubmit={handleSubmit}
        handleSendMessage={sendMessage}
        messagesEndRef={messagesEndRef}
      />
    </div>
  );
};

export default function ChatPage() {
  return <ChatPageContent />;
}