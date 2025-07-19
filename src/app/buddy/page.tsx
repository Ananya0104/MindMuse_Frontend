'use client';

import Image from 'next/image';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import MinimizedChat from './MinimizedChat';
import { useState, useRef } from 'react';
import { useChatSession } from '../../contexts/ChatSessionContext';

function isTokenExpired(token: string): boolean {
  try {
    const payload = JSON.parse(atob(token.split('.')[1]));
    return payload.exp * 1000 < Date.now(); // exp is in seconds
  } catch (err) {
    console.error("Invalid token:", err);
    return true;
  }
}

export default function BuddyWelcomePage() {
  const router = useRouter();
  const dummyRef = useRef<HTMLDivElement>(null);
  const { messages, isLoading, sendMessage } = useChatSession();
  const [inputValue, setInputValue] = useState("");
  const [showMinimized, setShowMinimized] = useState(true);
  const handleSendMessage = (text: string) => {
    sendMessage(text);
  };
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputValue.trim()) {
      handleSendMessage(inputValue);
      setInputValue("");
    }
  };

  useEffect(() => {
    const token = localStorage.getItem('accessToken');

    if (!token || isTokenExpired(token)) {
      localStorage.removeItem('accessToken');
      localStorage.removeItem('accessTokenExpiry');
      router.push('/login');
    }
  }, [router]);

  return (
    <>
      <section className="relative min-h-screen flex flex-col items-center justify-center p-4 text-center overflow-hidden bg-white">
        <Image 
          src="/aitherap.png" 
          alt="Background" 
          fill
          className="object-cover z-0 opacity-40"
          priority
        />
        <div className="relative z-10 w-full max-w-xl mx-auto flex flex-col items-center justify-center py-16">
          <h1 className="text-4xl md:text-5xl font-bold text-black text-center w-full mb-8 mt-12">AI THERAPISTS</h1>
          <div className="space-y-4 text-black text-xl max-w-xl mx-auto text-center mb-1 ">
            <p>Hey, brain. You good?</p>
            <p>MindMuse is that chill friend who knows when to hype you up — and when to tell you to take a nap.</p>
            <p>It&apos;s here for the spirals, the mood swings, the midnight overthinking, and everything in between.</p>
            <p>No judgement. No pressure.</p>
            <p>Just little nudges, kind words, and the occasional &quot;hey, drink some water.&quot;</p>
            <p>MindMuse: For minds that feel a lot.</p>
          </div>
          <button
            className="bg-[#80BADD] text-black px-8 py-3 rounded-lg font-semibold text-lg shadow-md hover:bg-[#6bb0d6] transition mt-20 mb-4 "
            onClick={() => router.push('/buddy/chat/ai-therapist')}
          >
            Start Chat
          </button>
        </div>
      </section>
      {showMinimized && (
        <MinimizedChat
          messages={messages}
          isTyping={isLoading}
          inputValue={inputValue}
          setInputValue={setInputValue}
          handleSubmit={handleSubmit}
          handleSendMessage={handleSendMessage}
          handleMaximize={() => router.push('/buddy/chat/ai-therapist')}
          onClose={() => setShowMinimized(false)}
          messagesEndRef={dummyRef as React.RefObject<HTMLDivElement>}
        />
      )}
    </>
  );
}